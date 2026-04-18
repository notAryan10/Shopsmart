import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Inventory from './pages/Inventory';
import Drops from './pages/Drops';
import Creators from './pages/Creators';
import AddProduct from './pages/AddProduct';

// Dashboard nested routes
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import CreateDrop from './pages/dashboard/CreateDrop';
import ActiveDrops from './pages/dashboard/ActiveDrops';
import Analytics from './pages/dashboard/Analytics';
import Settings from './pages/dashboard/Settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages — Navbar + Footer wrapper */}
        <Route path="/" element={<><Navbar /><main><Home /></main><Footer /></>} />
        <Route path="/product/:id" element={<><Navbar /><main><ProductDetail /></main><Footer /></>} />
        <Route path="/inventory" element={<><Navbar /><main><Inventory /></main><Footer /></>} />
        <Route path="/drops" element={<><Navbar /><main><Drops /></main><Footer /></>} />
        <Route path="/creators" element={<><Navbar /><main><Creators /></main><Footer /></>} />
        <Route path="/add-product" element={<><Navbar /><main><AddProduct /></main><Footer /></>} />

        {/* Dashboard — own layout, no global Navbar/Footer */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="create" element={<CreateDrop />} />
          <Route path="drops" element={<ActiveDrops />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
