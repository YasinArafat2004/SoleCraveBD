// src/components/Card.jsx
function Card({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button className="cta-btn">Add to Cart</button>
    </div>
  );
}

export default Card;