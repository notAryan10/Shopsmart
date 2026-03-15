import React from 'react';
import Navbar from '../components/Navbar';
import { User, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Creators = () => {
  const dummyCreators = [
    { id: 1, name: "NeonWear", level: 42, drops: 128, type: "Legendary" },
    { id: 2, name: "PixelMage", level: 38, drops: 85, type: "Epic" },
    { id: 3, name: "GlitchLord", level: 15, drops: 22, type: "Rare" },
    { id: 4, name: "CyberChef", level: 56, drops: 310, type: "Legendary" },
  ];

  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      <Navbar />
      
      <main className="container pt-32 pb-20">
        <div className="mb-12 border-l-4 border-amber-500 pl-6">
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter">VERIFIED <span className="text-amber-500">CREATORS</span></h1>
          <div className="font-retro text-[8px] text-muted tracking-wide mt-1">S-TIER_CONTENT_BROADCASTERS_ONLY</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyCreators.map((creator, i) => (
            <motion.div key={creator.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="arcade-panel p-6 bg-[#1A1A1A] group cursor-pointer" >
              <div className="flex items-start justify-between mb-6">
                 <div className="w-16 h-16 bg-black border-2 border-amber-500/30 flex items-center justify-center p-1 group-hover:border-amber-500 transition-arcade">
                    <User size={32} className="text-zinc-700 group-hover:text-amber-500" />
                 </div>
                 <div className="text-right">
                    <div className="font-retro text-[7px] text-muted mb-1">XP_LEVEL</div>
                    <div className="text-2xl font-orbitron font-black text-white">{creator.level}</div>
                 </div>
              </div>

              <div className="mb-6">
                 <h2 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors uppercase">{creator.name}</h2>
                 <div className="flex items-center gap-2 mt-2">
                    <ShieldCheck size={14} className="text-amber-500" />
                    <span className="font-retro text-[7px] text-zinc-500 tracking-widest">{creator.type} IDENTIFIED</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                 <div className="flex flex-col gap-1">
                    <span className="font-retro text-[7px] text-muted">TOTAL_DROPS</span>
                    <div className="flex items-center gap-2 font-orbitron font-bold text-white">
                       <Trophy size={12} className="text-gold-500" /> {creator.drops}
                    </div>
                 </div>
                 <div className="flex flex-col gap-1 text-right items-end">
                    <span className="font-retro text-[7px] text-muted">REPUTATION</span>
                    <div className="flex items-center gap-2 font-orbitron font-bold text-amber-500">
                       <Sparkles size={12} /> 99.8%
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Creators;
