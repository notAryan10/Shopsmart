import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import DropCard from '../components/DropCard';

const Home = () => {
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
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <main className="container pb-32">
        <div className="flex items-center justify-between mb-12 border-l-4 border-orange-500 pl-6">
          <div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">HOT <span className="text-orange-500">DROPS</span></h2>
            <div className="font-retro text-[8px] text-muted tracking-wide mt-1">AVAILABLE_IN_THIS_SESSION</div>
          </div>
          <div className="flex gap-4">
             {['ALL', 'PHYSICAL', 'DIGITAL'].map(cat => (
               <button key={cat} className="font-retro text-[8px] px-4 py-2 bg-[#1A1A1A] border-2 border-transparent hover:border-orange-500 transition-arcade text-muted hover:text-white">
                 {cat}
               </button>
             ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {products.length > 0 ? (
              products.map((product) => (
                <DropCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center glass-card">
                <p className="text-xl text-muted font-medium">No active drops found. Check back later!</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
