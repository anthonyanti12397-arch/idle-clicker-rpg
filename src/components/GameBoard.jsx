import React, { useRef, useState, useEffect } from 'react';

const ENEMIES = ['👹', '🐲', '🧟', '🧛', '骸', '👾', '🐍', '🐺', '🦂', '🦁'];

export const GameBoard = ({ state, tap, damageNumbers, formatNumber }) => {
  const boardRef = useRef(null);
  const [shake, setShake] = useState(false);
  const [lastHp, setLastHp] = useState(state.currentEnemyHp);

  // Trigger shake when HP drops
  useEffect(() => {
    if (state.currentEnemyHp < lastHp) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 150)
      setLastHp(state.currentEnemyHp);
      return () => clearTimeout(timer);
    }
    setLastHp(state.currentEnemyHp);
  }, [state.currentEnemyHp, lastHp]);

  const handleClick = (e) => {
    const rect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    tap(x, y);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const rect = boardRef.current.getBoundingClientRect();
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      tap(x, y);
    }
  };

  const enemyHpPercent = (state.currentEnemyHp / state.maxEnemyHp) * 100;
  const enemyIcon = ENEMIES[state.stage % ENEMIES.length];

  return (
    <div
      ref={boardRef}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      className="flex-1 relative flex items-center justify-center bg-gray-950 cursor-crosshair overflow-hidden touch-none"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Enemy Section */}
      <div className={`relative transition-transform duration-75 ${shake ? 'enemy-shake scale-95' : 'scale-100'}`}>
        {/* Glow behind enemy */}
        <div className={`absolute inset-0 blur-2xl rounded-full transition-colors duration-500 ${state.isBoss ? 'bg-red-500/30' : 'bg-purple-500/20'}`} />
        
        {/* Enemy Circle */}
        <div className={`w-56 h-56 md:w-72 md:h-72 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 transition-colors duration-500
          ${state.isBoss 
            ? 'bg-gradient-to-br from-red-600 to-gray-900 border-red-500/50' 
            : 'bg-gradient-to-br from-indigo-600 to-gray-900 border-indigo-500/30'}`}
        >
          <div className={`text-8xl md:text-9xl select-none drop-shadow-2xl transition-transform ${shake ? 'scale-110' : 'scale-100'}`}>
            {enemyIcon}
          </div>
        </div>

        {/* Boss indicator */}
        {state.isBoss && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <span className="text-red-500 font-black tracking-widest text-xl drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">BOSS</span>
            <div className="w-24 h-1 bg-red-500 mt-1 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          </div>
        )}

        {/* Enemy HP bar Container */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-64 md:w-80">
          <div className="flex justify-between items-end mb-1 px-1">
             <span className="text-xs font-bold text-gray-400">LV.{state.stage} ENEMY</span>
             <span className="text-xs font-mono text-gray-300">{formatNumber(state.currentEnemyHp)} HP</span>
          </div>
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-full h-4 border border-white/10 p-0.5 overflow-hidden shadow-xl">
            <div
              className={`h-full rounded-full transition-all duration-300 relative ${
                state.isBoss ? 'bg-gradient-to-r from-red-600 to-orange-400' : 'bg-gradient-to-r from-emerald-500 to-cyan-400'
              }`}
              style={{ width: `${enemyHpPercent}%` }}
            >
              {/* HP Bar highlight */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Damage numbers */}
      {damageNumbers.map(dn => (
        <div
          key={dn.id}
          className={`damage-number ${dn.isCrit ? 'crit' : 'normal'}`}
          style={{
            left: dn.x + 'px',
            top: (dn.y - 40) + 'px',
          }}
        >
          <span className="relative">
            {dn.isCrit && <span className="absolute -left-6 top-0 animate-pulse">🔥</span>}
            {formatNumber(dn.damage)}
          </span>
        </div>
      ))}

      {/* Stage info floating */}
      <div className="absolute top-10 left-10 hidden md:block">
        <div className="text-gray-500 text-xs font-bold tracking-widest mb-1">CURRENT SECTOR</div>
        <div className="text-4xl font-black text-white/20 italic tracking-tighter">STAGE {state.stage}</div>
      </div>
    </div>
  );
};
