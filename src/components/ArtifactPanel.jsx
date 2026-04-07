import React, { useState } from 'react';
import { calculateArtifactCost } from '../utils/gameLogic.js';

export const ArtifactPanel = ({ state, upgradeArtifact, formatNumber }) => {
  const [selectedType, setSelectedType] = useState('all');

  const filteredArtifacts = state.artifacts.filter(a =>
    selectedType === 'all' || a.type === selectedType
  );

  const artifactTypes = ['all', 'tap', 'dps', 'gold', 'all-damage', 'crit-chance', 'skill-cooldown'];

  return (
    <div className="h-full flex flex-col bg-gray-900/20">
      {/* Category Filter */}
      <div className="p-3 border-b border-white/5 bg-black/20 overflow-x-auto whitespace-nowrap scrollbar-none">
        <div className="flex gap-1">
          {artifactTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-all
                ${selectedType === type 
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-900/20' 
                  : 'bg-gray-800 text-gray-500 hover:text-gray-300'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {filteredArtifacts.map(artifact => {
          const cost = calculateArtifactCost(artifact, artifact.level);
          const canAfford = state.relics >= cost;
          const isUnlocked = artifact.level > 0;
          const bonus = 10 * artifact.level;

          return (
            <div
              key={artifact.id}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 p-4
                ${isUnlocked 
                  ? 'bg-gray-800/40 border-white/5 hover:border-orange-500/30' 
                  : 'bg-black/40 border-white/5 opacity-60'}`}
            >
              {/* Decorative background element */}
              {isUnlocked && (
                <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
              )}

              <div className="flex items-center gap-4 relative z-10">
                {/* Artifact Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner
                  ${isUnlocked ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-800 text-gray-700'}`}>
                  {artifact.icon}
                </div>
                
                {/* Artifact Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">{artifact.name}</h4>
                    {isUnlocked && (
                      <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 px-1.5 rounded">
                        LV.{artifact.level}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-[10px] font-bold">
                    {isUnlocked ? (
                       <span className="text-green-400">+{bonus}% {artifact.type.replace('-', ' ')}</span>
                    ) : (
                       <span className="text-gray-500 italic">Undiscovered Artifact</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => upgradeArtifact(artifact.id)}
                disabled={!canAfford}
                className={`w-full mt-4 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all
                  ${canAfford 
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-xl shadow-orange-900/30 active:scale-[0.98]' 
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`}
              >
                {isUnlocked ? 'UPGRADE' : 'RESTORE'} <span className="ml-1 opacity-60">◆ {formatNumber(cost)}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
