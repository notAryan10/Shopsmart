import { useState, useEffect } from 'react';
import { getProducts } from '../api';
import DropCard from '../components/DropCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <h1>Marketplace</h1>
      <input 
        type="text" 
        placeholder="Search products..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {filteredProducts.map((p) => (
            <DropCard key={p.id} {...p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
