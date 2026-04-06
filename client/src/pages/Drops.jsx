import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, ChevronDown, Rocket, Zap, Clock } from 'lucide-react';
import DropCard from '../components/DropCard';
import LayoutContainer from '../components/LayoutContainer';
import { getProducts } from '../api';

const Drops = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [allDrops, setAllDrops] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Legendary', 'Verified', 'Coming Soon', 'Secondary'];

  useEffect(() => {
    const fetchDrops = async () => {
      try {
        const response = await getProducts();
        const products = response.data.map(product => ({
          ...product,
          creator: product.creator?.email?.split('@')[0] || 'Unknown',
          category: product.stock > 20 ? 'Verified' : product.stock > 5 ? 'Legendary' : 'Coming Soon',
          timer: formatTimer(new Date(product.dropExpires))
        }));
        setAllDrops(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrops();
  }, []);

  const formatTimer = (expireDate) => {
    const now = new Date();
    const diff = expireDate - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="bg-bg-deep min-h-screen pt-12 pb-32">
      <LayoutContainer>
        {/* Header */}
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Rocket size={20} className="text-primary-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-accent">Global Registry</span>
              </div>
              <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-4">Marketplace</h1>
              <p className="text-text-secondary text-sm font-medium max-w-md">Browse and acquire authenticated assets from verified creators across the global grid.</p>
            </div>

            {/* Search */}
            <div className="relative group w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-primary-accent transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search Registry..."
                className="w-full h-14 bg-white/5 border border-white/10 rounded-sm pl-12 pr-6 text-sm text-white focus:outline-none focus:border-primary-accent transition-all uppercase font-bold tracking-widest placeholder:text-text-muted/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-6 p-2 bg-white/5 border border-white/5 rounded-sm backdrop-blur-md">
            <div className="flex p-1 bg-black/40 rounded-sm">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                    ? 'bg-primary-accent text-white shadow-[0_0_15px_var(--primary-accent)]' 
                    : 'text-text-muted hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 px-4">
              <button className="flex items-center gap-2 text-text-muted hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                <Filter size={14} />
                Filters
              </button>
              <div className="w-[1px] h-4 bg-white/10" />
              <button className="flex items-center gap-2 text-text-muted hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                Latest
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full text-center text-text-muted">Loading drops...</div>
          ) : (
            allDrops.map((drop, index) => (
              <DropCard key={drop.id} {...drop} index={index} />
            ))
          )}
        </div>
      </LayoutContainer>
    </div>
  );
};

export default Drops;
