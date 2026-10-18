// src/components/Card.jsx
import { useNavigate } from 'react-router-dom';

const Card = ({ product }) => {
  const navigate = useNavigate();
  const goToProduct = () => navigate(`/product/${product.id}`);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    goToProduct();
  };

  return (
    <div className="product-card" onClick={goToProduct} style={{ cursor: 'pointer' }}>
      <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
      <h3>{product.name}</h3>
      <p>{product.price} ট</p>
      <button className="cta-btn" onClick={handleButtonClick}>
        Select Size
      </button>
    </div>
  );
};

export default Card;