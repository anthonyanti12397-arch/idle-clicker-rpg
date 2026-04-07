import React, { useState } from 'react';
import { useGame } from './hooks/useGame.js';
import { Header } from './components/Header.jsx';
import { HeroPanel } from './components/HeroPanel.jsx';
import { GameBoard } from './components/GameBoard.jsx';
import { SkillPanel } from './components/SkillPanel.jsx';
import { ArtifactPanel } from './components/ArtifactPanel.jsx';

export default function App() {
  const game = useGame();
  const [activeTab, setActiveTab] = useState('heroes'); // 'heroes', 'artifacts'

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-950 text-white font-sans selection:bg-purple-500/30">
      {/* Top Navigation / Stats */}
      <Header 
        state={game.state} 
        prestige={game.prestige} 
        formatNumber={game.formatNumber} 
      />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Sidebar Left: Upgrades (Desktop) / Tabs (Mobile) */}
        <aside className="hidden md:flex flex-col w-80 lg:w-96 glass-panel z-20 shadow-2xl">
          <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 overflow-hidden">
            {activeTab === 'heroes' ? (
              <HeroPanel 
                state={game.state} 
                upgradeHero={game.upgradeHero} 
                maxUpgradeHero={game.maxUpgradeHero} 
                formatNumber={game.formatNumber} 
              />
            ) : (
              <ArtifactPanel 
                state={game.state} 
                upgradeArtifact={game.upgradeArtifact} 
                formatNumber={game.formatNumber} 
              />
            )}
          </div>
        </aside>

        {/* Center: Action Area */}
        <main className="flex-1 flex flex-col relative z-10">
          <GameBoard 
            state={game.state} 
            tap={game.tap} 
            damageNumbers={game.damageNumbers} 
            formatNumber={game.formatNumber} 
          />
          
          {/* Skills Bar - Floating at bottom of game area */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl px-4 py-3 glass-panel rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-30">
            <SkillPanel 
              state={game.state} 
              activateSkill={game.activateSkill} 
              formatNumber={game.formatNumber} 
            />
          </div>
        </main>

        {/* Mobile Tab Control Overlay */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-2/5 glass-panel z-40 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
          <div className="h-1.5 w-12 bg-white/20 rounded-full mx-auto my-3 shrink-0" />
          <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 overflow-hidden">
             {activeTab === 'heroes' ? (
              <HeroPanel 
                state={game.state} 
                upgradeHero={game.upgradeHero} 
                maxUpgradeHero={game.maxUpgradeHero} 
                formatNumber={game.formatNumber} 
              />
            ) : (
              <ArtifactPanel 
                state={game.state} 
                upgradeArtifact={game.upgradeArtifact} 
                formatNumber={game.formatNumber} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabHeader({ activeTab, setActiveTab }) {
  return (
    <div className="flex p-1 bg-black/20 rounded-xl mx-4 mb-2 shrink-0">
      <button 
        onClick={() => setActiveTab('heroes')}
        className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${activeTab === 'heroes' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
      >
        HEROES
      </button>
      <button 
        onClick={() => setActiveTab('artifacts')}
        className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${activeTab === 'artifacts' ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
      >
        ARTIFACTS
      </button>
    </div>
  );
}
