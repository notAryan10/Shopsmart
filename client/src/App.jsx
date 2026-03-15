import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CreatorDashboard from './pages/CreatorDashboard';
import Inventory from './pages/Inventory';
import Drops from './pages/Drops';
import Creators from './pages/Creators';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/dashboard" element={<CreatorDashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/drops" element={<Drops />} />
        <Route path="/creators" element={<Creators />} />
      </Routes>
    </Router>
  );
}

export default App;
