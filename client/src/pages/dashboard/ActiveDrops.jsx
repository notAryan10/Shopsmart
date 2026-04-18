import { useEffect, useState } from 'react';
import { getProducts } from '../../api';
import DropCard from '../../components/DropCard';
import { Loader2 } from 'lucide-react';

const ActiveDrops = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProducts();
        console.log("ACTIVE DROPS DATA:", res.data);
        // Filtering only "active" ones if dropExpires is in the future
        const now = new Date();
        const activeOnly = res.data.filter(p => new Date(p.dropExpires) > now);
        setProducts(activeOnly);
      } catch (err) {
        console.error("Error fetching active drops:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl lg:text-[32px] font-bold text-white tracking-tight">Active Drops</h1>
        <div className="bg-[#121214] border border-[#1f1f23] px-4 py-2 rounded-lg">
            <span className="text-sm text-zinc-400">Total Active: </span>
            <span className="text-sm font-bold text-white">{products.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-primary-accent" size={32} />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <DropCard key={p.id} {...p} />
          ))}
        </div>
      ) : (
        <div className="bg-[#121214] border border-[#1f1f23] rounded-xl p-12 text-center shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
          <p className="text-zinc-400">No active drops found. Create one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default ActiveDrops;
