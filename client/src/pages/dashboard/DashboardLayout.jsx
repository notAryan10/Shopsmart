import { NavLink, Outlet, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusSquare, 
  Activity, 
  Settings, 
  BarChart3,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

const DashboardLayout = () => {
  const sidebarLinks = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={18} />, exact: true },
    { name: 'Create Drop', path: '/dashboard/create', icon: <PlusSquare size={18} /> },
    { name: 'Active Drops', path: '/dashboard/drops', icon: <Activity size={18} /> },
    { name: 'Analytics', path: '/dashboard/analytics', icon: <BarChart3 size={18} /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white font-inter flex">
      {/* Sidebar */}
      <aside className="w-[240px] bg-[#0b0b0c] border-r border-[#1f1f23] hidden lg:flex flex-col shrink-0">
        <div className="p-4 border-b border-[#1f1f23]">
          <Link to="/" className="flex items-center gap-2 px-2 py-2 text-zinc-400 hover:text-white transition-colors text-xs font-medium no-underline group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Site
          </Link>
        </div>
        
        <div className="h-20 flex items-center px-6">
           <h2 className="text-xl font-bold tracking-tight text-white">ShopSmart</h2>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.exact}
              className={({ isActive }) => `w-full flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md relative outline-none no-underline ${
                isActive 
                  ? 'text-white bg-[#1f1f23] border-l-2 border-[#ff4655]' 
                  : 'text-zinc-400 hover:text-white hover:bg-[#121214]'
              }`}
            >
              {({ isActive }) => (
                <>
                  <div className={`${isActive ? 'text-white' : 'text-zinc-500'}`}>
                    {link.icon}
                  </div>
                  {link.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile Badge */}
        <div className="p-4 border-t border-[#1f1f23]">
           <button className="w-full flex items-center justify-between p-2 rounded-md hover:bg-[#121214] transition-colors">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-orange-500 flex items-center justify-center text-sm font-bold text-white shadow-inner">
                   N
                 </div>
                 <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-white leading-none">Neon</span>
                    <span className="text-xs text-zinc-500 mt-1">Creator</span>
                 </div>
              </div>
              <ChevronRight size={16} className="text-zinc-600" />
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
