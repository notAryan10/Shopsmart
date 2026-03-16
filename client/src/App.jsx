import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CreatorDashboard from './pages/CreatorDashboard';
import Inventory from './pages/Inventory';
import Drops from './pages/Drops';
import Creators from './pages/Creators';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-bg-deep text-white">
        {/* Global Lighting Layer */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary-accent/10 blur-[200px]" />
          <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-secondary-accent/10 blur-[200px]" />
        </div>
        
        <Navbar />
        <main className="flex-1 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/dashboard" element={<CreatorDashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/drops" element={<Drops />} />
            <Route path="/creators" element={<Creators />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


