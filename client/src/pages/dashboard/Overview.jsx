import { useEffect, useState } from 'react';
import { TrendingUp, Package, Activity, DollarSign } from 'lucide-react';
import { getProducts } from '../../api';

const StatCard = ({ icon: Icon, label, value, accent }) => (
  <div className="bg-[#121214] border border-[#1f1f23] rounded-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-zinc-400">{label}</span>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${accent}`}>
        <Icon size={18} />
      </div>
    </div>
    <h2 className="text-2xl font-bold text-white tracking-tight">{value}</h2>
  </div>
);

const Overview = () => {
  const [stats, setStats] = useState({ total: 0, active: 0, revenue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getProducts();
        const products = res.data;
        const now = new Date();
        const active = products.filter(p => new Date(p.dropExpires) > now);
        const revenue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
        setStats({ total: products.length, active: active.length, revenue });
      } catch {
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl lg:text-[32px] font-bold text-white tracking-tight">Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Package} label="Total Drops" value={stats.total} accent="bg-blue-500/10 text-blue-400" />
        <StatCard icon={Activity} label="Active Drops" value={stats.active} accent="bg-emerald-500/10 text-emerald-400" />
        <StatCard icon={DollarSign} label="Revenue" value={`$${stats.revenue.toLocaleString()}`} accent="bg-amber-500/10 text-amber-400" />
        <StatCard icon={TrendingUp} label="Conversion" value="—" accent="bg-violet-500/10 text-violet-400" />
      </div>

      <div className="bg-[#121214] border border-[#1f1f23] rounded-xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
        <h2 className="text-lg font-semibold tracking-tight text-white mb-2">Welcome back, Neon</h2>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
          Your dashboard gives you a quick overview of all your drops, revenue, and performance metrics. Use the sidebar to create new drops, manage active listings, or dive into analytics.
        </p>
      </div>
    </div>
  );
};

export default Overview;
