import React from 'react';

export const SkillPanel = ({ state }) => {
  return (
    <div className="flex justify-between items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {state.skills.map(skill => {
        const isOnCooldown = skill.cooldownRemaining > 0;
        const isActive = skill.isActive;
        const isUnlocked = skill.unlocked;
        const cooldownPercent = (skill.cooldownRemaining / (skill.cooldown * 1000)) * 100;

        return (
          <div key={skill.id} className="relative group shrink-0">
            <div 
              className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-2xl md:text-3xl transition-all duration-300 relative overflow-hidden
                ${!isUnlocked 
                  ? 'bg-gray-800/50 grayscale opacity-40' 
                  : isActive
                  ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)] scale-110'
                  : isOnCooldown
                  ? 'bg-gray-800 opacity-80'
                  : 'bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 cursor-pointer hover:scale-105 active:scale-95 shadow-xl border border-white/10'
                }`}
              title={isUnlocked ? `${skill.name}: ${skill.description}` : 'Stage Locked'}
            >
              {/* Skill Icon */}
              <span className={`z-10 select-none ${isActive ? 'animate-pulse' : ''}`}>{skill.icon}</span>
              
              {/* Cooldown Overlay (Vertical Fill) */}
              {isOnCooldown && (
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-black/60 transition-all duration-100 ease-linear"
                  style={{ height: `${cooldownPercent}%` }}
                />
              )}
              
              {/* Cooldown Timer */}
              {isOnCooldown && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <span className="text-[10px] md:text-xs font-black text-white drop-shadow-md">
                    {Math.ceil(skill.cooldownRemaining / 1000)}s
                  </span>
                </div>
              )}

              {/* Active Glow Overlay */}
              {isActive && (
                <div className="absolute inset-0 bg-white/20 animate-pulse z-10" />
              )}
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-gray-900 border border-white/10 p-2 rounded-xl text-center opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 whitespace-nowrap shadow-2xl translate-y-2 group-hover:translate-y-0">
               <div className="text-xs font-bold text-white">{skill.name}</div>
               <div className="text-[10px] text-gray-400 mt-0.5">{skill.description}</div>
               <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45 border-r border-b border-white/10" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
