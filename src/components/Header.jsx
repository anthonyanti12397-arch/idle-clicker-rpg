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
    <header className="glass-panel z-50 p-3 md:p-4 shadow-xl border-b-white/10 shrink-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 md:gap-4 flex-nowrap">
        {/* Resource: Gold */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-3xl lg:text-4xl font-black text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">
              {formatNumber(state.gold)}
            </span>
            <span className="text-lg md:text-2xl bounce-anim select-none">💰</span>
          </div>
          <div className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
             +{formatNumber(heroDps)} <span className="opacity-60">/SEC</span>
          </div>
        </div>

        {/* Resource: Relics */}
        <div className="flex flex-col items-center px-4 md:px-8 border-x border-white/5">
          <div className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-0.5">Relics</div>
          <div className="flex items-center gap-1.5">
            <span className="text-orange-400 font-black text-sm md:text-xl">{formatNumber(state.relics)}</span>
            <span className="text-xs scale-110">◆</span>
          </div>
        </div>

        {/* Actions / Info */}
        <div className="flex-1 flex justify-end gap-3 items-center">
          <div className="hidden sm:block text-right">
             <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total Taps</div>
             <div className="text-sm font-mono text-cyan-400">{formatNumber(state.totalTaps)}</div>
          </div>

          {/* New Prestige Dialog */}
          {canPrestige && (
            <div className="relative">
              {!prestigeConfirm ? (
                <button
                  onClick={() => setPrestigeConfirm(true)}
                  className="group relative px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-black text-xs md:text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] active:scale-95"
                >
                  <span className="flex items-center gap-2">
                    REBIRTH
                    <span className="opacity-50 text-[10px] hidden lg:inline">(STAGE {prestigeRequired}+)</span>
                  </span>
                </button>
              ) : (
                <div className="absolute top-12 right-0 bg-gray-900 border border-white/10 rounded-2xl p-4 min-w-[240px] shadow-2xl animate-fade-in z-[100] backdrop-blur-xl">
                  <div className="text-center">
                    <div className="text-sm font-black text-white mb-1 uppercase tracking-wider">Ascend Dimension?</div>
                    <div className="text-xs text-gray-400 mb-4 px-2">Ready to sacrifice progress for <span className="text-orange-400 font-bold">Relics</span>?</div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={handlePrestige}
                        className="w-full py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white text-xs font-black rounded-lg transition-all shadow-lg"
                      >
                        YES, ASCEND (+{formatNumber(Math.floor(Math.sqrt(state.maxStage / 10) * (1 + 0.05 * state.prestigeCount)))})
                      </button>
                      <button
                        onClick={() => setPrestigeConfirm(false)}
                        className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 text-xs font-bold rounded-lg"
                      >
                        NOT YET
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
