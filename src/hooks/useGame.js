import { useState, useCallback, useEffect, useRef } from 'react';
import { INITIAL_STATE, formatNumber } from '../utils/gameState.js';
import {
  calculateTapDamage,
  calculateHeroDps,
  calculateCritChance,
  calculateCritMultiplier,
  calculateGoldMultiplier,
  calculateEnemyHp,
  calculateGoldReward,
  calculateHeroCost,
  calculateArtifactCost,
  calculateOfflineGold,
  calculatePrestigeRelics,
  getPrestigeRequiredStage,
  shouldUnlockSkill,
} from '../utils/gameLogic.js';

const GAME_SAVE_KEY = 'tapGameState';

export const useGame = () => {
  const [state, setState] = useState(() => loadGameState());
  const gameLoopRef = useRef(null);
  const [damageNumbers, setDamageNumbers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Load game state from localStorage
  function loadGameState() {
    const saved = localStorage.getItem(GAME_SAVE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed;
      } catch {
        return INITIAL_STATE;
      }
    }
    return INITIAL_STATE;
  }

  // Save game state to localStorage
  const saveGame = useCallback(() => {
    setState(prevState => {
      const toSave = {
        ...prevState,
        lastSaveTime: Date.now(),
      };
      localStorage.setItem(GAME_SAVE_KEY, JSON.stringify(toSave));
      return toSave;
    });
  }, []);

  // Tap damage
  const tap = useCallback((x, y) => {
    setState(prevState => {
      const damage = calculateTapDamage(prevState);
      const critChance = calculateCritChance(prevState);
      const critMultiplier = calculateCritMultiplier(prevState);
      
      let isCrit = false;
      let finalDamage = damage;
      
      // Check for guaranteed crits from Critical Strike skill
      const critStrike = prevState.skills.find(s => s.id === 6);
      if (critStrike && critStrike.activeTimeRemaining > 0) {
        isCrit = true;
        finalDamage = damage * critMultiplier;
      } else if (Math.random() < critChance) {
        isCrit = true;
        finalDamage = damage * critMultiplier;
      }
      
      // Add damage number
      setDamageNumbers(prev => [...prev, {
        id: Math.random(),
        x,
        y,
        damage: finalDamage,
        isCrit,
      }]);
      
      let newState = {
        ...prevState,
        currentEnemyHp: Math.max(0, prevState.currentEnemyHp - finalDamage),
        totalTaps: prevState.totalTaps + 1,
      };
      
      // Update guaranteed crits counter
      if (critStrike && critStrike.activeTimeRemaining > 0) {
        const critsUsed = (critStrike.activeTimeRemaining === prevState.skills.find(s => s.id === 6).duration * 1000) 
          ? 0 
          : 20 - Math.ceil(critStrike.activeTimeRemaining / 1000);
        
        if (critsUsed >= 19) {
          newState.skills = newState.skills.map(s => 
            s.id === 6 ? { ...s, activeTimeRemaining: 0 } : s
          );
        }
      }
      
      // Enemy defeated
      if (newState.currentEnemyHp <= 0) {
        const goldReward = calculateGoldReward(newState.stage, calculateGoldMultiplier(newState));
        newState.gold += goldReward;
        
        // Check if it's a boss
        if (newState.isBoss) {
          // Advance to next stage
          newState.stage += 1;
          newState.maxStage = Math.max(newState.maxStage, newState.stage);
          newState.isBoss = false;
        } else {
          // Check if next enemy is boss (every 5th stage)
          if ((newState.stage + 1) % 5 === 0) {
            newState.isBoss = true;
            newState.bossTimeRemaining = 30;
          }
          newState.stage += 1;
          newState.maxStage = Math.max(newState.maxStage, newState.stage);
        }
        
        // Spawn next enemy
        newState.maxEnemyHp = calculateEnemyHp(newState.stage, newState.isBoss);
        newState.currentEnemyHp = newState.maxEnemyHp;
        
        // Unlock skill if applicable
        newState.skills = newState.skills.map(s => ({
          ...s,
          unlocked: s.unlocked || shouldUnlockSkill(s.id, newState.stage),
        }));
      }
      
      return newState;
    });
  }, []);

  // Hero hire / upgrade
  const upgradeHero = useCallback((heroId) => {
    setState(prevState => {
      const hero = prevState.heroes.find(h => h.id === heroId);
      if (!hero) return prevState;
      
      const cost = calculateHeroCost(hero, hero.level);
      
      if (prevState.gold < cost) return prevState;
      
      return {
        ...prevState,
        gold: prevState.gold - cost,
        heroes: prevState.heroes.map(h =>
          h.id === heroId
            ? { ...h, level: h.level + 1, hired: true }
            : h
        ),
      };
    });
  }, []);

  // Max upgrade heroes
  const maxUpgradeHero = useCallback((heroId) => {
    setState(prevState => {
      let newState = { ...prevState };
      const hero = newState.heroes.find(h => h.id === heroId);
      if (!hero) return prevState;
      
      let upgraded = false;
      while (true) {
        const cost = calculateHeroCost(hero, hero.level);
        if (newState.gold < cost) break;
        
        newState.gold -= cost;
        hero.level += 1;
        hero.hired = true;
        upgraded = true;
      }
      
      return upgraded ? newState : prevState;
    });
  }, []);

  // Upgrade artifact
  const upgradeArtifact = useCallback((artifactId) => {
    setState(prevState => {
      const artifact = prevState.artifacts.find(a => a.id === artifactId);
      if (!artifact) return prevState;
      
      const cost = calculateArtifactCost(artifact, artifact.level);
      
      if (prevState.relics < cost) return prevState;
      
      return {
        ...prevState,
        relics: prevState.relics - cost,
        artifacts: prevState.artifacts.map(a =>
          a.id === artifactId
            ? { ...a, level: a.level + 1, unlocked: true }
            : a
        ),
      };
    });
  }, []);

  // Activate skill
  const activateSkill = useCallback((skillId) => {
    setState(prevState => {
      const skill = prevState.skills.find(s => s.id === skillId);
      if (!skill || skill.cooldownRemaining > 0 || skill.isActive) return prevState;
      
      let newState = { ...prevState };
      
      const skillDef = prevState.skills.find(s => s.id === skillId);
      
      switch (skillId) {
        case 1: // War Cry
          newState.skills = newState.skills.map(s =>
            s.id === 1
              ? { ...s, isActive: true, activeTimeRemaining: 10000, cooldownRemaining: 60000 }
              : s
          );
          break;
        case 2: // Blade Storm
          // Handled in game loop
          newState.skills = newState.skills.map(s =>
            s.id === 2
              ? { ...s, isActive: true, activeTimeRemaining: 8000, cooldownRemaining: 45000 }
              : s
          );
          break;
        case 3: // Shadow Clone
          newState.skills = newState.skills.map(s =>
            s.id === 3
              ? { ...s, isActive: true, activeTimeRemaining: 15000, cooldownRemaining: 120000 }
              : s
          );
          break;
        case 4: // Gold Rush
          newState.skills = newState.skills.map(s =>
            s.id === 4
              ? { ...s, isActive: true, activeTimeRemaining: 12000, cooldownRemaining: 90000 }
              : s
          );
          break;
        case 5: // Mana Surge - reset all cooldowns
          newState.skills = newState.skills.map(s =>
            s.id === 5
              ? { ...s, cooldownRemaining: 180000 }
              : { ...s, cooldownRemaining: Math.max(0, s.cooldownRemaining - 20000) }
          );
          break;
        case 6: // Critical Strike
          newState.skills = newState.skills.map(s =>
            s.id === 6
              ? { ...s, isActive: true, activeTimeRemaining: 5000, cooldownRemaining: 60000 }
              : s
          );
          break;
        case 7: // Hand of Midas
          const hourlyDps = calculateHeroDps(prevState) * 3600;
          newState.gold += hourlyDps;
          newState.skills = newState.skills.map(s =>
            s.id === 7
              ? { ...s, cooldownRemaining: 300000 }
              : s
          );
          break;
        case 8: // Lightning Strike
          const burstDamage = calculateHeroDps(prevState) * 100;
          newState.currentEnemyHp = Math.max(0, newState.currentEnemyHp - burstDamage);
          newState.skills = newState.skills.map(s =>
            s.id === 8
              ? { ...s, cooldownRemaining: 90000 }
              : s
          );
          
          // Check if enemy defeated
          if (newState.currentEnemyHp <= 0) {
            const goldReward = calculateGoldReward(newState.stage, calculateGoldMultiplier(newState));
            newState.gold += goldReward;
            newState.stage += 1;
            newState.maxStage = Math.max(newState.maxStage, newState.stage);
            newState.isBoss = newState.stage % 5 === 0;
            newState.maxEnemyHp = calculateEnemyHp(newState.stage, newState.isBoss);
            newState.currentEnemyHp = newState.maxEnemyHp;
          }
          break;
        default:
          break;
      }
      
      return newState;
    });
  }, []);

  // Prestige
  const prestige = useCallback(() => {
    setState(prevState => {
      if (prevState.stage < getPrestigeRequiredStage(prevState.prestigeCount)) {
        return prevState;
      }
      
      const relicsEarned = calculatePrestigeRelics(prevState.maxStage, prevState.prestigeCount);
      
      return {
        ...INITIAL_STATE,
        relics: prevState.relics + relicsEarned,
        maxStage: prevState.maxStage,
        prestigeCount: prevState.prestigeCount + 1,
        totalTaps: prevState.totalTaps,
        artifacts: prevState.artifacts, // Keep artifacts
        skills: prevState.skills.map(s => ({ ...s, unlocked: s.id === 1 })), // Keep skill unlocks but reset cooldowns
      };
    });
  }, []);

  // Game loop (passive DPS, skill cooldowns, offline progress)
  useEffect(() => {
    gameLoopRef.current = setInterval(() => {
      setState(prevState => {
        let newState = { ...prevState };
        
        // Skill cooldowns
        newState.skills = newState.skills.map(s => ({
          ...s,
          cooldownRemaining: Math.max(0, s.cooldownRemaining - 100),
          activeTimeRemaining: Math.max(0, s.activeTimeRemaining - 100),
          isActive: s.activeTimeRemaining > 100,
        }));
        
        // Passive DPS
        const heroDps = calculateHeroDps(prevState);
        const goldMultiplier = calculateGoldMultiplier(prevState);
        const damagePerSecond = heroDps * 0.1; // 100ms tick
        
        newState.currentEnemyHp -= damagePerSecond;
        
        if (newState.currentEnemyHp <= 0) {
          const goldReward = calculateGoldReward(newState.stage, goldMultiplier);
          newState.gold += goldReward;
          
          newState.stage += 1;
          newState.maxStage = Math.max(newState.maxStage, newState.stage);
          newState.isBoss = newState.stage % 5 === 0 && newState.stage !== 1;
          newState.maxEnemyHp = calculateEnemyHp(newState.stage, newState.isBoss);
          newState.currentEnemyHp = newState.maxEnemyHp;
          
          // Unlock skills
          newState.skills = newState.skills.map(s => ({
            ...s,
            unlocked: s.unlocked || shouldUnlockSkill(s.id, newState.stage),
          }));
        }
        
        return newState;
      });
    }, 100);
    
    return () => clearInterval(gameLoopRef.current);
  }, []);

  // Auto-save every 10 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(saveGame, 10000);
    return () => clearInterval(autoSaveInterval);
  }, [saveGame]);

  // Clean up old damage numbers
  useEffect(() => {
    const timer = setTimeout(() => {
      setDamageNumbers(prev => prev.filter(d => d.id));
    }, 1500);
    return () => clearTimeout(timer);
  }, [damageNumbers]);

  return {
    state,
    tap,
    upgradeHero,
    maxUpgradeHero,
    upgradeArtifact,
    activateSkill,
    prestige,
    saveGame,
    damageNumbers,
    formatNumber,
  };
};
