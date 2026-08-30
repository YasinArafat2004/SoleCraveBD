// src/components/About.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data';
import { useState } from 'react';


const About = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  const [selectedSize, setSelectedSize] = useState('');

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  // Define available sizes (example)
  const sizes = ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }
    alert(`Added ${product.name} (Size: ${selectedSize}) to cart!`);
    // Here you would implement actual cart logic
  };

  return (
    <div className="about-container">
      {/* Back arrow */}
      <button className="back-arrow" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product-detail">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="detail-image" />
          {/* Optionally show thumbnails if product.images exist */}
          {product.images && product.images.length > 0 && (
            <div className="thumbnail-row">
              {product.images.map((img, idx) => (
                <img key={idx} src={img} alt={`${product.name} view ${idx+1}`} className="thumbnail" />
              ))}
            </div>
          )}
        </div>

        <div className="product-info-section">
          <h1>{product.name}</h1>
          <p className="product-price">${product.price}</p>
          <p className="product-category">Category: {product.category}</p>

          <div className="size-selector">
            <label>Select Size:</label>
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
              <option value="">Choose size</option>
              {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <button className="add-to-cart-detail" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;