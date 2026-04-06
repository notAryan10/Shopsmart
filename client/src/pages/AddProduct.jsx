import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct, getCreators } from '../api';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    type: 'PHYSICAL',
    dropExpires: '',
    creatorId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const response = await getCreators();
        if (response.data.length > 0) {
          setFormData(prev => ({ ...prev, creatorId: response.data[0].id }));
        }
      } catch (err) {
        console.error('Error fetching creators:', err);
      }
    };
    fetchCreator();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'price' || name === 'stock' ? Number(value) : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createProduct(formData);
      alert('Product created successfully!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: '30px', maxWidth: '600px' }}>
      <h1>Add New Item</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Item Name</label>
          <input 
            type="text" 
            name="name" 
            required 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="e.g. Neon Samurai Sword"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
          <textarea 
            name="description" 
            rows="3" 
            style={{ width: '100%', padding: '8px', border: '1px solid #e0e0e0', borderRadius: '4px' }}
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Describe your item..."
          />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Price ($)</label>
            <input 
              type="number" 
              name="price" 
              required 
              value={formData.price} 
              onChange={handleChange} 
              placeholder="0.00"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Stock</label>
            <input 
              type="number" 
              name="stock" 
              required 
              value={formData.stock} 
              onChange={handleChange} 
              placeholder="Quantity"
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Item Type</label>
          <select 
            name="type" 
            value={formData.type} 
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #e0e0e0', borderRadius: '4px' }}
          >
            <option value="PHYSICAL">Physical</option>
            <option value="DIGITAL">Digital</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Drop Expires</label>
          <input 
            type="datetime-local" 
            name="dropExpires" 
            required 
            value={formData.dropExpires} 
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading} style={{ marginTop: '10px', height: '45px' }}>
          {loading ? 'Processing...' : 'Deploy to Registry'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
