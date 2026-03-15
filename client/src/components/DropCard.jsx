import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ExternalLink, Trophy, Zap, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const DropCard = ({ product }) => {
  const [timeLeft, setTimeLeft] = useState({ percent: 100, text: '' });
  
  const rarity = product.price > 100 ? 'LEGENDARY' : product.price > 50 ? 'EPIC' : product.price > 20 ? 'RARE' : 'COMMON';
  const rarityConfig = {
    LEGENDARY: { color: '#FFD166', bg: 'rgba(255, 209, 102, 0.1)' },
    EPIC: { color: '#A855F7', bg: 'rgba(168, 85, 247, 0.1)' },
    RARE: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
    COMMON: { color: '#808080', bg: 'rgba(128, 128, 128, 0.1)' }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const expiration = new Date(product.dropExpires).getTime();
      const start = new Date(product.createdAt || Date.now() - 86400000).getTime();
      const now = new Date().getTime();
      
      const total = expiration - start;
      const current = expiration - now;
      
      if (current < 0) {
        setTimeLeft({ percent: 0, text: 'EXPIRED' });
        clearInterval(timer);
      } else {
        const percent = Math.max(0, (current / total) * 100);
        const h = Math.floor((current % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((current % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((current % (1000 * 60)) / 1000);
        setTimeLeft({ percent, text: `${h}h ${m}m ${s}s` });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [product.dropExpires, product.createdAt]);

  const isNearingEnd = timeLeft.percent < 20;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`arcade-panel overflow-hidden group border-2 ${rarity === 'LEGENDARY' ? 'animate-pulse' : ''}`} style={{ borderColor: rarity === 'LEGENDARY' ? 'var(--arcade-gold)' : '#2A2A2A' }} >
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="aspect-[4/5] bg-[#121212] overflow-hidden relative">
          <img src={product.image || `https://api.placeholder.com/600/800?text=${product.name}`}  alt={product.name} className="w-full h-full object-cover grayscale-[0.2] transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0" />
          <div className="absolute top-4 left-4 font-retro text-[8px] px-2 py-1.5 border" style={{ color: rarityConfig[rarity].color, borderColor: rarityConfig[rarity].color, backgroundColor: rarityConfig[rarity].bg, boxShadow: `0 0 10px ${rarityConfig[rarity].color}44` }}>
            {rarity}
          </div>
          <div className="absolute bottom-4 right-4 bg-black/80 flex items-center gap-2 px-3 py-1.5 rounded-sm border border-white/10">
             <Zap size={12} className="text-orange-500" />
             <span className="text-[10px] font-orbitron font-bold text-white uppercase">{product.type}</span>
          </div>
        </div>
        <div className="h-2 bg-[#1A1A1A] w-full mt-[-8px] relative z-20">
          <motion.div className={`h-full ${isNearingEnd ? 'bg-red-500' : 'bg-orange-500'}`} initial={{ width: '100%' }} animate={{ width: `${timeLeft.percent}%` }} style={{ boxShadow: isNearingEnd ? '0 0 10px #ef4444' : '0 0 10px #FF7A00' }} />
        </div>
      </Link>
      <div className="p-6 bg-[#1A1A1A]">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-orbitron font-black text-white mb-1 group-hover:text-orange-400 transition-colors uppercase">{product.name}</h3>
            <div className="flex items-center gap-2 text-[#A0A0A0] text-xs font-exo font-bold">
              <span className="text-orange-500">@</span>{product.creator?.email.split('@')[0]}
            </div>
          </div>
          <div className="text-right">
             <div className="text-xs text-[#A0A0A0] font-retro mb-1" style={{ fontSize: '8px' }}>PRICE</div>
             <div className="text-xl font-orbitron font-black text-orange-500">${product.price}</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <Clock size={14} className={isNearingEnd ? 'text-red-500 animate-flicker' : 'text-orange-400'} />
            <span className={`text-[10px] font-retro ${isNearingEnd ? 'text-red-500' : 'text-muted'}`}>{timeLeft.text}</span>
          </div>
          <button className="flex items-center gap-2 font-retro text-[8px] text-white hover:text-orange-500 transition-colors">
            CLAIM <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ChevronRight = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="square" className={className}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default DropCard;
