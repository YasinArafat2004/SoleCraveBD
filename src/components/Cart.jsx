// src/components/Cart.jsx
import { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import OrderModal from './OrderModal';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal, getTotalItems } = useCart();
  const navigate = useNavigate();
  const [showOrderForm, setShowOrderForm] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>
        <p>No items yet. Start shopping!</p>
        <button className="continue-shopping-btn" onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  const buildMessage = ({ name, address, phone }) => {
    const items = cart
      .map(
        (item) =>
          `${item.name} (Size: ${item.size}) x${item.quantity} = $${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join('\n');
    const total = getTotal().toFixed(2);
    return `Order Summary:\n${items}\n\nTotal: $${total}\n\nCustomer Details:\nName: ${name}\nAddress: ${address}\nPhone: ${phone}`;
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={`${item.id}-${item.size}`} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" loading="lazy" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Size: {item.size}</p>

              <div className="quantity-stepper">
                <button
                  type="button"
                  aria-label={`Decrease quantity of ${item.name}`}
                  onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                >
                  −
                </button>
                <span aria-live="polite">{item.quantity}</span>
                <button
                  type="button"
                  aria-label={`Increase quantity of ${item.name}`}
                  onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <p>Price: ${item.price}</p>
              <p className="cart-item-total">Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button className="remove-item-btn" onClick={() => removeFromCart(item.id, item.size)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Total: ${getTotal().toFixed(2)}</h2>
        <p>Items: {getTotalItems()}</p>
        <div className="cart-actions">
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
          <button className="order-cart-btn" onClick={() => setShowOrderForm(true)}>
            Order
          </button>
        </div>
      </div>

      {showOrderForm && (
        <OrderModal
          onClose={() => setShowOrderForm(false)}
          buildMessage={buildMessage}
          summary={
            <>
              <h4>Order Summary</h4>
              {cart.map((item) => (
                <p key={`${item.id}-${item.size}`}>
                  {item.name} (Size: {item.size}) x{item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              ))}
              <p className="total-preview">Total: ${getTotal().toFixed(2)}</p>
            </>
          }
        />
      )}
    </div>
  );
};

export default Cart;