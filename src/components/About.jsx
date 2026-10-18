// src/components/About.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data';
import { useState } from 'react';
import { useCart } from './CartContext';
import OrderModal from './OrderModal';
import { SHOE_SIZES } from '../constants';

const About = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === parseInt(id, 10));

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [showOrderForm, setShowOrderForm] = useState(false);

  if (!product) {
    return (
      <div className="product-not-found">
        <p>Product not found.</p>
        <button className="continue-shopping-btn" onClick={() => navigate('/')}>
          Back to Shop
        </button>
      </div>
    );
  }

  // Only show a thumbnail row when there's actually more than one distinct photo.
  const uniqueImages = Array.from(
    new Set([product.image, ...(product.images || [])].filter(Boolean))
  );

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size first.');
      return;
    }
    addToCart(product, selectedSize);
    alert(`Added ${product.name} (Size: ${selectedSize}) to cart!`);
  };

  const handleOrderNow = () => {
    if (!selectedSize) {
      alert('Please select a size first.');
      return;
    }
    setShowOrderForm(true);
  };

  const buildMessage = ({ name, address, phone }) => `Order Details:
Product: ${product.name}
Size: ${selectedSize}
Price: $${product.price}
Name: ${name}
Address: ${address}
Phone: ${phone}`;

  return (
    <div className="about-container">
      <button className="back-arrow" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product-detail">
        <div className="product-image-section">
          <img src={selectedImage} alt={product.name} className="detail-image" />
          {uniqueImages.length > 1 && (
            <div className="thumbnail-row">
              {uniqueImages.map((img, idx) => (
                <img
                  key={img}
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  loading="lazy"
                  className={`thumbnail ${selectedImage === img ? 'active-thumbnail' : ''}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info-section">
          <h1>{product.name}</h1>
          <p className="product-price">{product.price} ট</p>
          <p className="product-category">Category: {product.category}</p>

          <div className="size-selector">
            <label htmlFor="size-select">Select Size:</label>
            <select
              id="size-select"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Choose size</option>
              {SHOE_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart-detail" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="order-now-btn" onClick={handleOrderNow}>
              Order Now
            </button>
          </div>
        </div>
      </div>

      {showOrderForm && (
        <OrderModal
          onClose={() => setShowOrderForm(false)}
          buildMessage={buildMessage}
          summary={
            <>
              <h4>Order Summary</h4>
              <p>
                <strong>Product:</strong> {product.name}
              </p>
              <p>
                <strong>Size:</strong> {selectedSize}
              </p>
              <p className="total-preview">Total: ${product.price}</p>
            </>
          }
        />
      )}
    </div>
  );
};

export default About;