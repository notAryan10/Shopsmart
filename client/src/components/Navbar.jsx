import React from 'react';
import { ShoppingBag, Search, User, Zap, Coins, LayoutGrid, Rocket, Trophy } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Market', path: '/', icon: <LayoutGrid size={18} /> },
    { name: 'Drops', path: '/drops', icon: <Zap size={18} /> },
    { name: 'Creators', path: '/creators', icon: <User size={18} /> },
    { name: 'Loot', path: '/inventory', icon: <Trophy size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0E0E0E] border-b-4 border-[#1A1A1A]">
      <div className="container h-20 flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 transition-arcade hover:scale-105">
          <div className="bg-[#FF7A00] p-1.5 rounded-sm shadow-[0_0_15px_rgba(255,122,0,0.5)]">
            <Zap size={24} color="black" fill="black" />
          </div>
          <span className="font-retro text-xs tracking-tighter" style={{ fontSize: '10px', color: 'var(--arcade-orange)' }}>
            VENDORA<br/><span className="text-white">ARCADE</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10" style={{ display: 'flex', gap: '40px' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              className={`flex items-center gap-2 font-bold uppercase tracking-widest text-sm transition-arcade relative py-2 ${
                location.pathname === link.path ? 'text-white' : 'text-muted hover:text-[#FF7A00]'
              }`}
              style={{ color: location.pathname === link.path ? 'white' : 'var(--text-muted)' }}
            >
              <span className={location.pathname === link.path ? 'text-orange-500' : ''}>{link.icon}</span>
              {link.name}
              {location.pathname === link.path && (
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-500 shadow-[0_0_10px_#FF7A00]" />
              )}
            </Link>
          ))}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6" style={{ display: 'flex', gap: '24px' }}>
          <div className="hidden sm:flex items-center gap-3 bg-[#1A1A1A] px-4 py-2 rounded-sm border border-[#2A2A2A]">
            <Coins size={18} className="text-[#FFD166]" />
            <span className="font-retro text-[10px] text-[#FFD166]">2,450 <span className="text-xs">CC</span></span>
          </div>

          <Link to="/dashboard" className="btn-arcade" style={{ padding: '8px 16px', fontSize: '12px' }}>
            <Rocket size={16} /> LAUNCH
          </Link>

          <button className="text-muted hover:text-white transition-arcade p-2 hover:bg-[#1A1A1A] rounded-sm relative">
            <User size={22} />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0E0E0E]" />
          </button>
        </div>
      </div>
      
      {/* Decorative Console Strip */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent opacity-30" />
    </nav>
  );
};

export default Navbar;
