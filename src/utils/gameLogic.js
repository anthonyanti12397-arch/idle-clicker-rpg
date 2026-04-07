import {
  BASE_TAP_DAMAGE,
  BASE_CRIT_CHANCE,
  BASE_CRIT_MULTIPLIER,
  GOLD_PER_KILL_MULTIPLIER,
  ENEMY_HP_SCALE,
  BOSS_HP_MULTIPLIER,
  PRESTIGE_STAGE_THRESHOLD_BASE,
  PRESTIGE_STAGE_INCREMENT,
} from './gameState.js';

export const calculateTapDamage = (state) => {
  const artifacts = state.artifacts;
  let damage = BASE_TAP_DAMAGE;
  
  // Get hero tap % bonuses (from hero milestones)
  let heroTapBonus = 1;
  state.heroes.forEach(hero => {
    if (hero.level >= 25) heroTapBonus *= 1.1;
    if (hero.level >= 50) heroTapBonus *= 1.15;
    if (hero.level >= 100) heroTapBonus *= 1.2;
    if (hero.level >= 200) heroTapBonus *= 1.25;
  });
  
  damage *= heroTapBonus;
  
  // Artifact tap multiplier
  const tapArtifacts = artifacts.filter(a => a.type === 'tap' && a.level > 0);
  tapArtifacts.forEach(a => {
    damage *= (1 + 0.1 * a.level);
  });
  
  // All damage multiplier
  const allDamageArtifacts = artifacts.filter(a => a.type === 'all-damage' && a.level > 0);
  allDamageArtifacts.forEach(a => {
    damage *= (1 + 0.15 * a.level);
  });
  
  // Check for active War Cry skill
  const warCry = state.skills.find(s => s.id === 1);
  if (warCry && warCry.isActive) {
    damage *= 10;
  }
  
  // Check for Critical Strike skill (guarantee crits)
  const critStrike = state.skills.find(s => s.id === 6);
  if (critStrike && critStrike.isActive && critStrike.activeTimeRemaining > 0) {
    // This is tracked separately
  }
  
  return damage;
};

export const calculateHeroDps = (state) => {
  let totalDps = 0;
  
  state.heroes.forEach(hero => {
    if (!hero.hired) return;
    
    const baseDps = hero.baseDps * (hero.dpsPerLevel ** hero.level);
    let heroDps = baseDps;
    
    // Hero milestones
    if (hero.level >= 25) heroDps *= 1.1;
    if (hero.level >= 50) heroDps *= 1.15;
    if (hero.level >= 100) heroDps *= 1.2;
    if (hero.level >= 200) heroDps *= 1.25;
    if (hero.level >= 500) heroDps *= 1.5;
    if (hero.level >= 1000) heroDps *= 2;
    
    totalDps += heroDps;
  });
  
  // Artifact DPS multiplier
  const dpsArtifacts = state.artifacts.filter(a => a.type === 'dps' && a.level > 0);
  dpsArtifacts.forEach(a => {
    totalDps *= (1 + 0.12 * a.level);
  });
  
  // All damage multiplier
  const allDamageArtifacts = state.artifacts.filter(a => a.type === 'all-damage' && a.level > 0);
  allDamageArtifacts.forEach(a => {
    totalDps *= (1 + 0.15 * a.level);
  });
  
  // Check for active Shadow Clone skill
  const shadowClone = state.skills.find(s => s.id === 3);
  if (shadowClone && shadowClone.isActive) {
    totalDps *= 5;
  }
  
  return totalDps;
};

export const calculateCritChance = (state) => {
  let chance = BASE_CRIT_CHANCE;
  
  const critChanceArtifacts = state.artifacts.filter(a => a.type === 'crit-chance' && a.level > 0);
  critChanceArtifacts.forEach(a => {
    chance += 0.02 * a.level;
  });
  
  return Math.min(chance, 1);
};

export const calculateCritMultiplier = (state) => {
  let multiplier = BASE_CRIT_MULTIPLIER;
  
  const critMultiplierArtifacts = state.artifacts.filter(a => a.type === 'crit-multiplier' && a.level > 0);
  critMultiplierArtifacts.forEach(a => {
    multiplier *= (1 + 0.1 * a.level);
  });
  
  return multiplier;
};

export const calculateGoldMultiplier = (state) => {
  let multiplier = 1;
  
  const goldArtifacts = state.artifacts.filter(a => a.type === 'gold' && a.level > 0);
  goldArtifacts.forEach(a => {
    multiplier *= (1 + 0.15 * a.level);
  });
  
  // Check for active Gold Rush skill
  const goldRush = state.skills.find(s => s.id === 4);
  if (goldRush && goldRush.isActive) {
    multiplier *= 5;
  }
  
  return multiplier;
};

export const calculateEnemyHp = (stage, isBoss = false) => {
  let hp = 100 * (ENEMY_HP_SCALE ** (stage - 1));
  if (isBoss) {
    hp *= BOSS_HP_MULTIPLIER;
  }
  return hp;
};

export const calculateGoldReward = (stage, goldMultiplier) => {
  return stage * GOLD_PER_KILL_MULTIPLIER * goldMultiplier;
};

export const calculateHeroCost = (hero, nextLevel) => {
  return hero.hireCost * (hero.upgradeCostBase ** nextLevel);
};

export const calculateArtifactCost = (artifact, nextLevel) => {
  return artifact.baseCost * (artifact.upgradeCost ** nextLevel);
};

export const calculateOfflineGold = (state, elapsedSeconds) => {
  const heroDps = calculateHeroDps(state);
  const goldMultiplier = calculateGoldMultiplier(state);
  const offlineDps = heroDps * 0.5; // 50% of online DPS
  
  return offlineDps * elapsedSeconds * goldMultiplier;
};

export const calculatePrestigeRelics = (maxStage, prestigeCount) => {
  return Math.floor(Math.sqrt(maxStage / 10)) * (1 + 0.05 * prestigeCount);
};

export const getPrestigeRequiredStage = (prestigeCount) => {
  if (prestigeCount === 0) return PRESTIGE_STAGE_THRESHOLD_BASE;
  return PRESTIGE_STAGE_THRESHOLD_BASE + prestigeCount * PRESTIGE_STAGE_INCREMENT;
};

export const shouldUnlockSkill = (skillId, stage) => {
  // Skills unlock progressively
  const skillUnlockStages = {
    1: 1, // War Cry
    2: 5,
    3: 15,
    4: 20,
    5: 40,
    6: 30,
    7: 50,
    8: 35,
  };
  return stage >= (skillUnlockStages[skillId] || 999);
};
