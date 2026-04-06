import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="container">
      <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.5rem', textDecoration: 'none', color: '#000' }}>
        SHOPSMART
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/drops">Drops</Link>
        <Link to="/creators">Creators</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/add-product">
          <button style={{ marginLeft: '10px' }}>Add Item</button>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
