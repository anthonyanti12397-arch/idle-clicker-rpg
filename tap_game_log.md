<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>y</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
{
  "name": "y",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.4",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.4.27",
    "eslint": "^9.39.4",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.4.0",
    "postcss": "^8.5.8",
    "tailwindcss": "^4.2.2",
    "vite": "^8.0.4"
  }
}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply m-0;
}

#root {
  @apply w-full max-w-none min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white;
}

.damage-number {
  @apply absolute pointer-events-none font-bold select-none;
  animation: float 1.5s ease-out forwards;
}

.damage-number.crit {
  @apply text-orange-400 drop-shadow-lg;
  text-shadow: 0 0 8px rgba(255, 152, 0, 0.8);
}

.damage-number.normal {
  @apply text-blue-300;
}

.stage-flash {
  animation: fadeFlash 0.2s ease-out;
}

.cooldown-ring {
  @apply absolute inset-0 rounded-full;
  background: conic-gradient(from 0deg, rgba(139, 92, 246, 0.6), rgba(139, 92, 246, 0.2));
}

.hero-card {
  @apply p-4 bg-gray-800 rounded-lg border border-gray-600 hover:border-purple-500 transition-colors cursor-pointer;
}

.hero-card.locked {
  @apply opacity-50 cursor-not-allowed;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  @apply w-2;
}

::-webkit-scrollbar-track {
  @apply bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-purple-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-purple-500;
}
import React, { useState } from 'react';
import { calculateHeroDps, getPrestigeRequiredStage } from '../utils/gameLogic.js';

export const Header = ({ state, prestige, formatNumber }) => {
  const [prestigeConfirm, setPrestigeConfirm] = useState(false);
  const heroDps = calculateHeroDps(state);
  const prestigeRequired = getPrestigeRequiredStage(state.prestigeCount);
  const canPrestige = state.stage >= prestigeRequired;

  const handlePrestige = () => {
    prestige();
    setPrestigeConfirm(false);
  };

  return (
    <div className="bg-gray-900 border-b border-gray-700 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-yellow-400">
            {formatNumber(state.gold)} 💰
          </h1>
          <div className="text-xs md:text-sm text-gray-400">
            DPS: {formatNumber(heroDps)}/s
          </div>
        </div>

        <div className="text-center">
          <div className="text-sm text-gray-400">Total Prestige Count</div>
          <div className="text-2xl font-bold text-purple-400">{state.prestigeCount}</div>
          <div className="text-xs text-purple-300">Relics: {formatNumber(state.relics)}</div>
        </div>

        <div className="text-right">
          <div className="text-xs text-gray-400">Total Taps</div>
          <div className="text-xl font-bold text-blue-400">{formatNumber(state.totalTaps)}</div>
        </div>

        {/* Prestige Button */}
        {canPrestige && (
          <div className="relative">
            {!prestigeConfirm ? (
              <button
                onClick={() => setPrestigeConfirm(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded transition-colors"
              >
                Prestige (Stage {prestigeRequired}+)
              </button>
            ) : (
              <div className="bg-gray-800 border-2 border-red-500 rounded p-3 min-w-max">
                <div className="text-sm font-bold text-white mb-2">
                  Earn {formatNumber(Math.floor(Math.sqrt(state.maxStage / 10) * (1 + 0.05 * state.prestigeCount)))} Relics?
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrestige}
                    className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setPrestigeConfirm(false)}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-sm font-bold rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { calculateHeroCost, calculateHeroDps } from '../utils/gameLogic.js';

export const HeroPanel = ({ state, upgradeHero, maxUpgradeHero, formatNumber }) => {
  const [sortBy, setSortBy] = useState('order'); // 'order', 'cost', 'dps'

  const sortedHeroes = [...state.heroes].sort((a, b) => {
    if (sortBy === 'cost') {
      const costA = calculateHeroCost(a, a.level);
      const costB = calculateHeroCost(b, b.level);
      return costA - costB;
    } else if (sortBy === 'dps') {
      const baseDpsA = a.baseDps * (a.dpsPerLevel ** a.level);
      const baseDpsB = b.baseDps * (b.dpsPerLevel ** b.level);
      return baseDpsB - baseDpsA;
    }
    return a.id - b.id;
  });

  return (
    <div className="w-full md:w-1/3 bg-gray-800 border-r border-gray-700 flex flex-col overflow-hidden">
      <div className="bg-gray-900 p-4 border-b border-gray-700">
        <h3 className="text-lg font-bold text-blue-300 mb-3">Heroes</h3>
        <div className="flex gap-2 flex-wrap">
          {['order', 'cost', 'dps'].map(type => (
            <button
              key={type}
              onClick={() => setSortBy(type)}
              className={`px-3 py-1 rounded text-sm capitalize transition-colors ${
                sortBy === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sortedHeroes.map(hero => {
          const cost = calculateHeroCost(hero, hero.level);
          const canAfford = state.gold >= cost;
          const hired = hero.hired;
          const heroContribution = hero.hired
            ? hero.baseDps * (hero.dpsPerLevel ** hero.level)
            : 0;

          return (
            <div
              key={hero.id}
              className={`p-4 border-b border-gray-700 transition-colors ${
                !hired ? 'bg-gray-700 opacity-60' : 'hover:bg-gray-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-4xl">{hero.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-sm">{hero.name}</div>
                  {hired && (
                    <>
                      <div className="text-xs text-gray-400">Level: {hero.level}</div>
                      <div className="text-xs text-purple-300">DPS: {formatNumber(heroContribution)}</div>
                    </>
                  )}
                  {!hired && <div className="text-xs text-yellow-400">Not hired</div>}
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => upgradeHero(hero.id)}
                  disabled={!canAfford}
                  className={`flex-1 py-1 px-2 rounded text-xs font-bold transition-colors ${
                    canAfford
                      ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  +1 | {formatNumber(cost)}
                </button>

                {hired && (
                  <button
                    onClick={() => maxUpgradeHero(hero.id)}
                    disabled={!canAfford}
                    className={`flex-1 py-1 px-2 rounded text-xs font-bold transition-colors ${
                      canAfford
                        ? 'bg-purple-600 hover:bg-purple-500 text-white cursor-pointer'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Max
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { calculateArtifactCost } from '../utils/gameLogic.js';

export const ArtifactPanel = ({ state, upgradeArtifact, formatNumber }) => {
  const [selectedType, setSelectedType] = useState('all');

  const filteredArtifacts = state.artifacts.filter(a =>
    selectedType === 'all' || a.type === selectedType
  );

  const artifactTypes = [
    'all',
    'tap',
    'dps',
    'gold',
    'all-damage',
    'crit-chance',
    'crit-multiplier',
    'skill-duration',
    'skill-cooldown',
  ];

  return (
    <div className="w-full md:w-1/3 bg-gray-800 border-r border-gray-700 flex flex-col overflow-hidden">
      <div className="bg-gray-900 p-4 border-b border-gray-700">
        <h3 className="text-lg font-bold text-orange-300 mb-3">Artifacts</h3>
        <div className="text-xs text-gray-400 mb-2">Relics: {formatNumber(state.relics)}</div>
        <div className="flex gap-1 flex-wrap text-xs">
          {artifactTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-2 py-1 rounded capitalize transition-colors ${
                selectedType === type
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredArtifacts.map(artifact => {
          const cost = calculateArtifactCost(artifact, artifact.level);
          const canAfford = state.relics >= cost;
          const isUnlocked = artifact.level > 0;
          const bonusPercent = 10 * artifact.level;

          return (
            <div
              key={artifact.id}
              className={`p-4 border-b border-gray-700 transition-colors ${
                !isUnlocked ? 'bg-gray-700 opacity-50' : 'hover:bg-gray-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{artifact.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-sm">{artifact.name}</div>
                  <div className="text-xs text-gray-400">Type: {artifact.type}</div>
                  {isUnlocked ? (
                    <div className="text-xs text-green-300">Level {artifact.level} | +{bonusPercent}%</div>
                  ) : (
                    <div className="text-xs text-yellow-400">Locked</div>
                  )}
                </div>
              </div>

              <button
                onClick={() => upgradeArtifact(artifact.id)}
                disabled={!canAfford}
                className={`w-full mt-3 py-1 px-2 rounded text-xs font-bold transition-colors ${
                  canAfford
                    ? 'bg-orange-600 hover:bg-orange-500 text-white cursor-pointer'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isUnlocked ? 'Upgrade' : 'Unlock'} | {formatNumber(cost)} ◆
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
import React, { useRef, useState } from 'react';

export const GameBoard = ({ state, tap, damageNumbers, formatNumber }) => {
  const boardRef = useRef(null);
  const [screenFlash, setScreenFlash] = useState(false);

  const handleClick = (e) => {
    const rect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    tap(x, y);
  };

  const handleTouchStart = (e) => {
    const rect = boardRef.current.getBoundingClientRect();
    for (let touch of e.touches) {
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      tap(x, y);
    }
  };

  const enemyHpPercent = (state.currentEnemyHp / state.maxEnemyHp) * 100;

  return (
    <div
      ref={boardRef}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      className="flex-1 relative flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 cursor-pointer overflow-hidden"
    >
      {screenFlash && <div className="absolute inset-0 bg-white opacity-30 pointer-events-none stage-flash" />}

      {/* Enemy */}
      <div className="relative">
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-2xl transform transition-transform hover:scale-105 active:scale-95">
          <div className="text-6xl">👹</div>
        </div>

        {/* Boss indicator */}
        {state.isBoss && (
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full font-bold text-sm">
            BOSS
          </div>
        )}

        {/* Enemy HP bar */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-56 bg-gray-700 rounded-full h-8 border-2 border-gray-600">
          <div
            className="bg-gradient-to-r from-green-500 to-lime-400 h-full rounded-full transition-all"
            style={{ width: `${enemyHpPercent}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
            {formatNumber(state.currentEnemyHp)} / {formatNumber(state.maxEnemyHp)}
          </div>
        </div>
      </div>

      {/* Damage numbers */}
      {damageNumbers.map(dn => (
        <div
          key={dn.id}
          className={`damage-number ${dn.isCrit ? 'crit' : 'normal'}`}
          style={{
            left: dn.x + (Math.random() - 0.5) * 60 + 'px',
            top: dn.y + 'px',
          }}
        >
          {dn.isCrit ? '⚡' : ''} {formatNumber(dn.damage)}
        </div>
      ))}

      {/* Stage info */}
      <div className="absolute top-8 right-8 text-right">
        <div className="text-4xl font-bold text-purple-300">Stage {state.stage}</div>
        <div className="text-lg text-gray-400">Max: {state.maxStage}</div>
      </div>
    </div>
  );
};
import React from 'react';

export const SkillPanel = ({ state, activateSkill, formatNumber }) => {
  return (
    <div className="bg-gray-800 border-t border-gray-700 p-4">
      <h3 className="text-lg font-bold text-purple-300 mb-4">Skills</h3>
      <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
        {state.skills.map(skill => {
          const isOnCooldown = skill.cooldownRemaining > 0;
          const isActive = skill.isActive;
          const cooldownPercent = (skill.cooldownRemaining / (skill.cooldown * 1000)) * 100;
          const isUnlocked = skill.unlocked;

          return (
            <div key={skill.id} className="relative">
              <button
                onClick={() => isUnlocked && !isOnCooldown && activateSkill(skill.id)}
                disabled={!isUnlocked || isOnCooldown || isActive}
                title={`${skill.name}: ${skill.description}`}
                className={`w-full aspect-square rounded-lg flex items-center justify-center text-3xl font-bold transition-all ${
                  !isUnlocked
                    ? 'bg-gray-700 opacity-30 cursor-not-allowed'
                    : isOnCooldown
                    ? 'bg-gray-600 opacity-60'
                    : isActive
                    ? 'bg-green-600 border-2 border-green-400 shadow-lg shadow-green-500'
                    : 'bg-purple-600 hover:bg-purple-500 cursor-pointer border-2 border-purple-400'
                }`}
              >
                {skill.icon}
                
                {/* Cooldown overlay */}
                {isOnCooldown && (
                  <div className="absolute inset-0 rounded-lg bg-black opacity-40 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {(skill.cooldownRemaining / 1000).toFixed(1)}s
                    </span>
                  </div>
                )}
              </button>
              
              {/* Skill name tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 hover:opacity-100 pointer-events-none transition-opacity">
                {skill.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
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
