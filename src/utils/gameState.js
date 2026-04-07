// Game constants and initial state

export const HEROES = [
  { id: 1, name: 'Knight', icon: '⚔️', baseDps: 10, dpsPerLevel: 1.08, hireCost: 100, upgradeCostBase: 1.15 },
  { id: 2, name: 'Mage', icon: '🔮', baseDps: 15, dpsPerLevel: 1.09, hireCost: 500, upgradeCostBase: 1.15 },
  { id: 3, name: 'Archer', icon: '🏹', baseDps: 12, dpsPerLevel: 1.08, hireCost: 1000, upgradeCostBase: 1.15 },
  { id: 4, name: 'Paladin', icon: '🛡️', baseDps: 20, dpsPerLevel: 1.10, hireCost: 5000, upgradeCostBase: 1.15 },
  { id: 5, name: 'Rogue', icon: '⚫', baseDps: 18, dpsPerLevel: 1.09, hireCost: 3000, upgradeCostBase: 1.15 },
  { id: 6, name: 'Necromancer', icon: '💀', baseDps: 25, dpsPerLevel: 1.11, hireCost: 10000, upgradeCostBase: 1.15 },
  { id: 7, name: 'Dragon Slayer', icon: '🐉', baseDps: 30, dpsPerLevel: 1.12, hireCost: 50000, upgradeCostBase: 1.15 },
  { id: 8, name: 'Sage', icon: '👴', baseDps: 22, dpsPerLevel: 1.10, hireCost: 8000, upgradeCostBase: 1.15 },
  { id: 9, name: 'Berserker', icon: '🗡️', baseDps: 35, dpsPerLevel: 1.13, hireCost: 100000, upgradeCostBase: 1.15 },
  { id: 10, name: 'Shadow Assassin', icon: '🥷', baseDps: 40, dpsPerLevel: 1.14, hireCost: 200000, upgradeCostBase: 1.15 },
];

export const ARTIFACTS = [
  { id: 1, name: 'Blade of Damocles', icon: '⚡', type: 'tap', baseCost: 100, upgradeCost: 1.20 },
  { id: 2, name: "Hero's Grimoire", icon: '📖', type: 'dps', baseCost: 150, upgradeCost: 1.20 },
  { id: 3, name: "Midas' Chalice", icon: '🏆', type: 'gold', baseCost: 200, upgradeCost: 1.20 },
  { id: 4, name: 'The Arcana Cloak', icon: '🧥', type: 'all-damage', baseCost: 250, upgradeCost: 1.20 },
  { id: 5, name: 'Axe of Muerte', icon: '🪓', type: 'crit-chance', baseCost: 300, upgradeCost: 1.20 },
  { id: 6, name: 'Infinity Pendulum', icon: '⏰', type: 'skill-duration', baseCost: 350, upgradeCost: 1.20 },
  { id: 7, name: 'Crown of Kings', icon: '👑', type: 'tap', baseCost: 400, upgradeCost: 1.20 },
  { id: 8, name: 'Emerald Heart', icon: '💚', type: 'dps', baseCost: 450, upgradeCost: 1.20 },
  { id: 9, name: 'Diamond Shield', icon: '💎', type: 'all-damage', baseCost: 500, upgradeCost: 1.20 },
  { id: 10, name: 'Cursed Ring', icon: '💍', type: 'crit-multiplier', baseCost: 600, upgradeCost: 1.20 },
  { id: 11, name: 'Staff of Eternity', icon: '🔱', type: 'skill-cooldown', baseCost: 700, upgradeCost: 1.20 },
  { id: 12, name: 'Cosmic Eye', icon: '👁️', type: 'gold', baseCost: 800, upgradeCost: 1.20 },
];

export const SKILLS = [
  { id: 1, name: 'War Cry', icon: '📢', cooldown: 60, duration: 10, effect: 'tap x10', description: 'Tap damage x10 for 10s' },
  { id: 2, name: 'Blade Storm', icon: '🌪️', cooldown: 45, duration: 8, effect: 'burst-50x', description: '50x tap damage every 0.3s for 8s' },
  { id: 3, name: 'Shadow Clone', icon: '👥', cooldown: 120, duration: 15, effect: 'dps-5x', description: 'Hero DPS x5 for 15s' },
  { id: 4, name: 'Gold Rush', icon: '💛', cooldown: 90, duration: 12, effect: 'gold-5x', description: 'Gold multiplier x5 for 12s' },
  { id: 5, name: 'Mana Surge', icon: '⚡', cooldown: 180, duration: 0, effect: 'reset-cooldowns', description: 'All skills cooldown -20s instantly' },
  { id: 6, name: 'Critical Strike', icon: '🔴', cooldown: 60, duration: 0, effect: 'guarantee-crit-20', description: 'Next 20 taps are guaranteed critical (x50)' },
  { id: 7, name: 'Hand of Midas', icon: '🤚', cooldown: 300, duration: 0, effect: 'instant-gold', description: 'Earn gold equal to 1 hour of DPS' },
  { id: 8, name: 'Lightning Strike', icon: '⚡', cooldown: 90, duration: 0, effect: 'burst-100x-dps', description: 'Deal 100x hero DPS instantly' },
];

export const INITIAL_STATE = {
  gold: 0,
  relics: 0,
  stage: 1,
  maxStage: 1,
  prestigeCount: 0,
  totalTaps: 0,
  
  // Enemy state
  currentEnemyHp: 100,
  maxEnemyHp: 100,
  isBoss: false,
  bossTimeRemaining: 30,
  
  // Heroes
  heroes: HEROES.map(h => ({
    ...h,
    level: 0,
    hired: false,
    totalDps: 0,
  })),
  
  // Artifacts
  artifacts: ARTIFACTS.map(a => ({
    ...a,
    level: 0,
    unlocked: false,
  })),
  
  // Skills
  skills: SKILLS.map(s => ({
    ...s,
    unlocked: s.id === 1,
    cooldownRemaining: 0,
    isActive: false,
    activeTimeRemaining: 0,
  })),
  
  // Passive data
  lastSaveTime: Date.now(),
  lastOfflineCalculation: Date.now(),
  offlineGoldEarned: 0,
};

export const formatNumber = (num) => {
  if (num >= 1e15) return (num / 1e15).toFixed(2) + 'Qa';
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
  return num.toFixed(0);
};

export const BASE_TAP_DAMAGE = 1;
export const BASE_CRIT_CHANCE = 0.05;
export const BASE_CRIT_MULTIPLIER = 10;
export const GOLD_PER_KILL_MULTIPLIER = 10;
export const ENEMY_HP_SCALE = 1.45;
export const BOSS_HP_MULTIPLIER = 8;
export const PRESTIGE_STAGE_THRESHOLD_BASE = 50;
export const PRESTIGE_STAGE_INCREMENT = 25;
