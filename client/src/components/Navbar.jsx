import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingBag, User, Menu, X, Rocket } from 'lucide-react';
import LayoutContainer from './LayoutContainer';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Market', path: '/drops' },
    { name: 'Creators', path: '/creators' },
    { name: 'Inventory', path: '/inventory' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0F1115]/80 backdrop-blur-xl border-b border-white/5 h-20">
      <LayoutContainer>
        <div className="flex items-center justify-between h-full relative">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary-accent rounded-sm flex items-center justify-center transform group-hover:rotate-90 transition-transform duration-500 shadow-[0_0_15px_var(--primary-accent)]">
              <Rocket size={22} className="text-white transform rotate-45" />
            </div>
            <span className="heading-display text-2xl tracking-[0.15em] text-white">VENDORA</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-10 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link text-[11px] uppercase tracking-[0.3em] font-black h-full flex items-center ${
                  location.pathname === link.path ? 'active' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden sm:flex items-center gap-2 px-6 h-11 bg-white/5 border border-white/10 hover:border-white/30 text-white text-[10px] font-black uppercase tracking-widest transition-all">
              <User size={14} className="text-primary-accent" />
              Portal Access
            </button>
            <div className="w-[1px] h-6 bg-white/10" />
            <button className="text-text-secondary hover:text-white transition-colors relative group">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </LayoutContainer>
    </nav>
  );
};

export default Navbar;
