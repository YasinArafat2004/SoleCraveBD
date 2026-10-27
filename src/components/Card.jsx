// src/components/Card.jsx
import { useNavigate } from 'react-router-dom';
import ShareButton from './ShareButton';

const Card = ({ product }) => {
  const navigate = useNavigate();
  const goToProduct = () => navigate(`/product/${product.id}`);

  return (
    // Notice the class name changed to 'product-card-wrapper' (make sure CSS matches)
    <div className="product-card-wrapper">
      <div className="card-share-container">
        <ShareButton product={product} />
      </div>

      <div className="product-card-content" onClick={goToProduct}>
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <h3>{product.name}</h3>
        <p>{product.price} ৳</p>
        <button 
          className="cta-btn" 
          onClick={(e) => {
            e.stopPropagation();
            goToProduct();
          }}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Card;