import React, { useState } from 'react';
import { calculateHeroCost } from '../utils/gameLogic.js';

export const HeroPanel = ({ state, upgradeHero, maxUpgradeHero, formatNumber }) => {
  const [sortBy, setSortBy] = useState('order'); // 'order', 'cost', 'dps'

  const sortedHeroes = [...state.heroes].sort((a, b) => {
    if (sortBy === 'cost') {
      return calculateHeroCost(a, a.level) - calculateHeroCost(b, b.level);
    } else if (sortBy === 'dps') {
      const dpsA = a.hired ? a.baseDps * (a.dpsPerLevel ** a.level) : 0;
      const dpsB = b.hired ? b.baseDps * (b.dpsPerLevel ** b.level) : 0;
      return dpsB - dpsA;
    }
    return a.id - b.id;
  });

  return (
    <div className="h-full flex flex-col bg-gray-900/20">
      {/* Sort Bar */}
      <div className="p-3 flex items-center justify-between border-b border-white/5 bg-black/20">
        <span className="text-[10px] font-black text-gray-500 tracking-tighter uppercase">Sort By</span>
        <div className="flex gap-1">
          {['order', 'cost', 'dps'].map(type => (
            <button
              key={type}
              onClick={() => setSortBy(type)}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase transition-all ${
                sortBy === type ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-500 hover:text-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {sortedHeroes.map(hero => {
          const cost = calculateHeroCost(hero, hero.level);
          const canAfford = state.gold >= cost;
          const hired = hero.hired;
          const dps = hired ? hero.baseDps * (hero.dpsPerLevel ** hero.level) : hero.baseDps;

          return (
            <div
              key={hero.id}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 p-3
                ${hired 
                  ? 'bg-gray-800/40 border-white/5 hover:border-blue-500/30' 
                  : 'bg-black/40 border-white/5 opacity-60'}`}
            >
              <div className="flex items-center gap-3 relative z-10">
                {/* Hero Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner
                  ${hired ? 'bg-blue-500/20' : 'bg-gray-800'}`}>
                  {hero.icon}
                </div>
                
                {/* Hero Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-black text-white truncate uppercase tracking-tight">{hero.name}</h4>
                    {hired && (
                      <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-1.5 rounded">
                        LV.{hero.level}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                    <span className="text-purple-400">⚡</span> {formatNumber(dps)} DPS
                  </div>
                </div>
              </div>

              {/* Upgrade Buttons */}
              <div className="flex gap-2 mt-3 relative z-10">
                <button
                  onClick={() => upgradeHero(hero.id)}
                  disabled={!canAfford}
                  className={`flex-[2] py-2 rounded-xl text-[10px] font-black uppercase transition-all
                    ${canAfford 
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20' 
                      : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`}
                >
                  UPGRADE <span className="ml-1 opacity-60">({formatNumber(cost)})</span>
                </button>
                
                {hired && (
                  <button
                    onClick={() => maxUpgradeHero(hero.id)}
                    disabled={!canAfford}
                    className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl text-[10px] font-black uppercase transition-all"
                  >
                    MAX
                  </button>
                )}
              </div>
              
              {/* Progress indicator or something subtle */}
              {hired && (
                <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500/20" style={{ width: '100%' }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
