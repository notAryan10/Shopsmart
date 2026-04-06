import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CreatorDashboard from './pages/CreatorDashboard';
import Inventory from './pages/Inventory';
import Drops from './pages/Drops';
import Creators from './pages/Creators';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/dashboard" element={<CreatorDashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/drops" element={<Drops />} />
            <Route path="/creators" element={<Creators />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
