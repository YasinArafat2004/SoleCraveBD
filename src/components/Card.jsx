// src/components/Card.jsx
import { useNavigate } from 'react-router-dom';

const Card = ({ product }) => {
  const navigate = useNavigate();

  // Navigate to product detail when card is clicked
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Navigate to product detail when "Add to Cart" is clicked
  const handleAddToCart = (e) => {
    e.stopPropagation(); // prevents the card click from firing twice (optional)
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <div className="product-brand">{product.brand || 'SoleCrave'}</div>
      <p>${product.price}</p>
      <button 
        className="cta-btn" 
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Card;