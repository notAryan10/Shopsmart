import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ShieldCheck, Truck, Zap, ShoppingCart, Rocket, Info, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const timer = setInterval(() => {
      const expiration = new Date(product.dropExpires).getTime();
      const now = new Date().getTime();
      const distance = expiration - now;
      if (distance < 0) {
        setTimeLeft('EXPIRED');
        clearInterval(timer);
      } else {
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${h}h ${m}m ${s}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [product]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E0E0E]">
      <div className="font-retro text-orange-500 animate-pulse">INITIATING DATA RETRIEVAL...</div>
    </div>
  );

  if (!product) return <div className="min-h-screen flex items-center justify-center font-retro text-red-500">ERROR: ITEM_NOT_FOUND</div>;

  const rarity = product.price > 100 ? 'LEGENDARY' : product.price > 50 ? 'EPIC' : product.price > 20 ? 'RARE' : 'COMMON';
  const rarityColors = {
    LEGENDARY: { text: '#FFD166', shadow: '0 0 20px #FFD16644' },
    EPIC: { text: '#A855F7', shadow: '0 0 20px #A855F744' },
    RARE: { text: '#3B82F6', shadow: '0 0 20px #3B82F644' },
    COMMON: { text: '#808080', shadow: 'none' }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      <Navbar />
      
      <main className="container pt-32 pb-20">
        <Link to="/" className="inline-flex items-center gap-2 font-retro text-[8px] text-muted hover:text-orange-500 mb-10 transition-arcade">
          <ArrowLeft size={14} /> EXIT TO MARKET
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <motion.div  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="arcade-panel overflow-hidden bg-[#121212] flex items-center justify-center p-4 border-4" style={{ borderColor: rarityColors[rarity].text }} >
            <div className="relative w-full aspect-square group">
               <img src={product.image || `https://api.placeholder.com/800/800?text=${product.name}`} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt={product.name} />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-bottom p-8">
                  <div className="mt-auto">
                     <div className="font-retro text-[10px] tracking-wide mb-2" style={{ color: rarityColors[rarity].text }}>{rarity} GRADE LOOT</div>
                     <div className="h-1 w-24" style={{ backgroundColor: rarityColors[rarity].text }} />
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6" >
            <div className="arcade-panel p-8">
               <div className="flex justify-between items-start mb-6">
                 <div>
                   <span className="font-retro text-[8px] text-muted mb-2 block uppercase">OBJECT_NAME</span>
                   <h1 className="text-5xl font-black text-white leading-none">{product.name}</h1>
                 </div>
                 <div className="text-right">
                   <span className="font-retro text-[8px] text-muted mb-2 block">CREDITS</span>
                   <div className="text-4xl font-black text-orange-500">${product.price}</div>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#121212] p-4 border border-white/5 border-l-orange-500 border-l-4">
                     <span className="font-retro text-[8px] text-muted block mb-1">DATA_STATUS</span>
                     <span className="font-orbitron font-bold text-white text-sm">ENCRYPTED</span>
                  </div>
                  <div className="bg-[#121212] p-4 border border-white/5 border-l-amber-500 border-l-4">
                     <span className="font-retro text-[8px] text-muted block mb-1">ORIGIN_CODE</span>
                     <span className="font-orbitron font-bold text-white text-sm">VDR-#{id.slice(0, 4)}</span>
                  </div>
               </div>

               <p className="font-exo text-[#A0A0A0] text-lg leading-relaxed mb-8">
                 {product.description || "NO_DATA_DESCRIPTION_AVAILABLE_FOR_THIS_DROP"}
               </p>

               <div className="bg-[#1A1A1A] border-2 border-[#2A2A2A] p-6 rounded-sm mb-6 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                     <div className="flex items-center gap-2 text-xs font-retro text-muted uppercase">
                        <Clock size={12} className="text-orange-500" /> TIME_LOCK
                     </div>
                     <div className="text-2xl font-orbitron font-black text-white tracking-widest leading-none mt-2">{timeLeft}</div>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div className="flex flex-col gap-1 text-right">
                     <div className="flex items-center gap-2 justify-end text-xs font-retro text-muted uppercase">
                        STOCK_LIMIT <Zap size={12} className="text-amber-500" />
                     </div>
                     <div className="text-2xl font-orbitron font-black text-white leading-none mt-2">{product.stock} UNITS</div>
                  </div>
               </div>

               <button className="btn-arcade w-full py-5 text-xl justify-center shadow-[0_0_30px_#FF7A0033]">
                  CLAIM LOOT <ChevronRight size={24} className="stroke-[3]" />
               </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FeatureItem icon={<Rocket size={18} />} text="FAST TRANSMISSION" />
              <FeatureItem icon={<ShieldCheck size={18} />} text="SECURE PROTOCOL" />
              <FeatureItem icon={<Info size={18} />} text="AUTHENTIC GEAR" />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

const FeatureItem = ({ icon, text }) => (
  <div className="arcade-panel p-4 flex flex-col items-center gap-2 text-center bg-[#1A1A1A]/50">
     <div className="text-orange-500">{icon}</div>
     <span className="font-retro text-[7px] text-muted font-bold leading-tight">{text}</span>
  </div>
);

export default ProductDetail;
