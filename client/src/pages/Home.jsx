import { useState, useEffect } from 'react';
import { getProducts } from '../api';
import DropCard from '../components/DropCard';
import Hero from '../components/Hero';
import LayoutContainer from '../components/LayoutContainer';
import { Search, Loader2 } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-20 pb-20 overflow-hidden">
      <Hero />
      
      <LayoutContainer>
        <div className="flex flex-col gap-12">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8">
            <div className="flex flex-col gap-3">
              <h2 className="heading-display text-4xl text-white tracking-widest">Global Registry</h2>
              <p className="text-text-muted text-[10px] uppercase font-black tracking-[0.4em]">Active drops currently synchronized</p>
            </div>
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Search Registry..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 !bg-white/5 !border-white/10 focus:!border-primary-accent transition-all text-[11px] font-black uppercase tracking-widest"
              />
            </div>
          </header>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="text-primary-accent animate-spin" size={40} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted">Synchronizing Data...</span>
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProducts.map((p) => (
                    <DropCard key={p.id} {...p} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-40 bg-white/5 rounded-sm border border-dashed border-white/10">
                   <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.4em]">No matching records found in the registry.</p>
                </div>
              )}
            </>
          )}
        </div>
      </LayoutContainer>
    </div>
  );
};

export default Home;
