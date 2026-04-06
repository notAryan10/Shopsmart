import { Link } from 'react-router-dom';

const DropCard = ({ id, name, creator, price, stock, dropExpires }) => {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>Creator: {typeof creator === 'object' ? creator?.email : creator}</p>
      <p>Price: ${price}</p>
      <p>Stock: {stock}</p>
      <p>Expires: {new Date(dropExpires).toLocaleString()}</p>
      <Link to={`/product/${id}`}>
        <button style={{ marginTop: '10px' }}>View Detail</button>
      </Link>
    </div>
  );
};

export default DropCard;
