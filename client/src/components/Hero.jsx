import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Trophy, Sparkles, ChevronRight, Zap, User } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-48 pb-24 overflow-hidden bg-[#0E0E0E]">
      
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(#FF7A00 1px, transparent 1px), linear-gradient(90deg, #FF7A00 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        perspective: '1000px',
        transform: 'rotateX(60deg) translateY(-200px)',
        maskImage: 'linear-gradient(to bottom, black, transparent)'
      }} />

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-orange-500/20 rounded-full blur-xl"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100,
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50
            }}
            animate={{ 
              y: -200,
              x: (Math.random() - 0.5) * 200 + (Math.random() * window.innerWidth)
            }}
            transition={{ 
              duration: Math.random() * 10 + 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} >
          <div className="flex justify-center mb-8">
            <motion.div animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} className="bg-white/5 border border-orange-500/30 px-6 py-2 rounded-sm inline-flex items-center gap-3 font-retro text-[10px] tracking-tight text-glow">
              <Sparkles size={14} className="text-orange-400" />
              NEW DROP DETECTED IN SECTOR 7
            </motion.div>
          </div>

          <h1 className="text-8xl md:text-9xl font-black mb-4 leading-none select-none">
            <span className="block text-4xl font-retro text-orange-500 mb-2 drop-shadow-[0_0_10px_rgba(255,122,0,0.5)]">VENDORA</span>
            <span className="gradient-text-arcade block">THE ARCADE</span>
          </h1>
          
          <p className="font-exo text-2xl text-muted max-w-2xl mx-auto mb-12 tracking-wide font-medium" style={{ color: 'var(--text-muted)' }}>
            LIMITED DROPS. EXCLUSIVE LOOT.<br/>
            <span className="text-white/80">Claim your gear before the timer hits zero.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="btn-arcade text-xl py-5 px-10 group">
              ENTER MARKET <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-arcade-outline text-xl py-5 px-10 font-orbitron font-bold">
              BROWSE DROPS
            </button>
          </div>
        </motion.div>
      </div>

      <div className="container mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
          <StatPanel label="Active Drops" value="24" icon={<Zap className="text-orange-400" />} />
          <StatPanel label="Verified Creators" value="1,248" icon={<User className="text-amber-400" />} />
          <StatPanel label="Items Claimed" value="45.2K" icon={<Trophy className="text-gold-400" />} />
        </div>
      </div>
    </section>
  );
};

const StatPanel = ({ label, value, icon }) => (
  <motion.div whileHover={{ y: -5 }} className="arcade-panel p-6 flex items-center gap-6" >
    <div className="bg-orange-500/10 p-4 rounded-sm border border-orange-500/20 shadow-inner">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div className="text-left">
      <div className="text-[#A0A0A0] text-xs font-retro uppercase tracking-tighter mb-1" style={{ fontSize: '8px' }}>{label}</div>
      <div className="text-3xl font-orbitron font-black text-white">{value}</div>
    </div>
  </motion.div>
);

export default Hero;
