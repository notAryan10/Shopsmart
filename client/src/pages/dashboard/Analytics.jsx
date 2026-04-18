import { useState, useEffect } from 'react';
import { BarChart3, LineChart, PieChart, TrendingUp, Package, Database } from 'lucide-react';
import { getProducts } from '../../api';

const Analytics = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (err) {
        console.error("Analytics fetch error:", err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl lg:text-[32px] font-bold text-white tracking-tight">Analytics</h1>
        <div className="flex items-center gap-3 bg-[#121214] border border-[#1f1f23] px-4 py-2 rounded-lg">
          <Database size={16} className="text-emerald-500" />
          <span className="text-sm font-medium text-zinc-400">Database Sync: <span className="text-white font-bold">{products.length} Records</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#121214] border border-[#1f1f23] rounded-xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Sales Performance</h3>
            <BarChart3 className="text-zinc-500" size={20} />
          </div>
          <div className="h-48 bg-[#0b0b0c] rounded-lg border border-[#1f1f23] flex items-center justify-center relative overflow-hidden">
             {/* Mock Chart Visualization */}
             <div className="absolute inset-0 flex items-end justify-around px-6 pt-12">
               {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                 <div key={i} className="w-8 bg-primary-accent/20 border-t-2 border-primary-accent rounded-t-sm" style={{ height: `${h}%` }} />
               ))}
             </div>
             <p className="text-xs text-zinc-500 relative z-10">Sales growth (7 days)</p>
          </div>
        </div>

        <div className="bg-[#121214] border border-[#1f1f23] rounded-xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Market Share</h3>
            <PieChart className="text-zinc-500" size={20} />
          </div>
          <div className="h-48 bg-[#0b0b0c] rounded-lg border border-[#1f1f23] flex items-center justify-center">
             <div className="w-32 h-32 rounded-full border-8 border-primary-accent/20 border-l-primary-accent border-b-primary-accent relative">
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">64%</span>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-[#121214] border border-[#1f1f23] rounded-xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex items-center justify-between">
         <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-white">Optimization Report</h3>
            <p className="text-sm text-zinc-400">Advanced metrics and AI insights are being generated for your recent drops.</p>
         </div>
         <div className="flex items-center gap-2 text-primary-accent bg-primary-accent/10 px-4 py-2 rounded-lg border border-primary-accent/20 text-sm font-semibold">
           <TrendingUp size={16} />
           <span>+12.4% projected</span>
         </div>
      </div>
    </div>
  );
};

export default Analytics;
