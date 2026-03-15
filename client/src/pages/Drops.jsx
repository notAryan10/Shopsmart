import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import DropCard from '../components/DropCard';
import { Zap, Filter, Search } from 'lucide-react';

const Drops = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching drops:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      <Navbar />
      
      <main className="container pt-32 pb-20">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 mb-12 border-b-2 border-[#1A1A1A] pb-8">
            <div>
              <h1 className="text-5xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
                <Zap className="text-orange-500" size={40} /> ALL <span className="text-orange-500">DROPS</span>
              </h1>
              <div className="font-retro text-[10px] text-muted tracking-tight mt-2">REAL-TIME_LOOT_BROADCAST_FEED</div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="arcade-panel flex items-center gap-3 px-4 py-2 bg-black/40">
                <Search size={16} className="text-zinc-600" />
                <input className="bg-transparent border-none outline-none font-orbitron text-xs text-white placeholder:text-zinc-800" placeholder="SEARCH_ITEMS..." />
              </div>
              <button className="arcade-panel p-2 text-orange-500 hover:bg-orange-500/10">
                <Filter size={20} />
              </button>
            </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
            <div className="w-16 h-1 bg-[#1A1A1A] overflow-hidden">
               <div className="h-full bg-orange-500 animate-[p-bar_2s_infinite]" style={{ width: '40%' }} />
            </div>
            <div className="font-retro text-[8px] text-orange-500 animate-pulse">CONNECTING_TO_FEED...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <DropCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-40 text-center arcade-panel border-dashed border-[#2A2A2A] bg-transparent">
                <p className="font-retro text-xs text-muted">NO_ACTIVE_DROPS_DETECTED_IN_SECTOR</p>
                <div className="mt-4 font-exo text-[10px] text-zinc-600">CHECK_BACK_SHORTLY_FOR_NEW_LOOT</div>
              </div>
            )}
          </div>
        )}
      </main>

      <style>{`
        @keyframes p-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default Drops;
