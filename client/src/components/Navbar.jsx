import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Drops', path: '/drops' },
    { name: 'Creators', path: '/creators' },
    { name: 'Inventory', path: '/inventory' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0b0b0c]/80 border-b border-[#1f1f23] backdrop-blur-xl">

      <div className="container h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline group">
          <div className="w-8 h-8 bg-gradient-to-tr from-[#ff4655] to-[#ff5a67] shadow-[0_0_15px_rgba(255,70,85,0.3)] flex items-center justify-center rounded-md transform group-hover:scale-105 transition-transform duration-300">
             <span className="text-white font-bold text-lg leading-none">S</span>
          </div>
          <span className="font-outfit font-bold text-lg text-white">ShopSmart</span>
        </Link>

        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-6 list-none">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className={`text-sm font-medium transition-colors relative py-2 ${
                      isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="nav-underline"
                        className="absolute bottom-[-18px] left-0 right-0 h-[2px] bg-[#ff4655] shadow-[0_0_10px_rgba(255,70,85,0.5)]"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link to="/dashboard" className="no-underline">
            <button className="px-5 py-2 bg-[#121214] border border-[#1f1f23] text-zinc-300 text-sm font-semibold rounded-md hover:bg-[#1f1f23] hover:text-white hover:scale-[1.02] transition-all shadow-sm">
              Dashboard
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

