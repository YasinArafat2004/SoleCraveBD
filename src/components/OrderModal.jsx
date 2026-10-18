// src/components/OrderModal.jsx
import { useState } from 'react';
import { buildWhatsAppOrderUrl } from '../constants';

const OrderModal = ({ summary, buildMessage, onClose }) => {
  const [formData, setFormData] = useState({ name: '', address: '', phone: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, phone } = formData;
    if (!name.trim() || !address.trim() || !phone.trim()) {
      alert('Please fill all fields.');
      return;
    }
    const message = buildMessage(formData);
    window.open(buildWhatsAppOrderUrl(message), '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
      >
        <h2 id="order-modal-title">Complete Your Order</h2>

        <div className="order-summary-preview">{summary}</div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="order-name">Full Name</label>
          <input
            id="order-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />

          <label htmlFor="order-address">Delivery Address</label>
          <textarea
            id="order-address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            autoComplete="street-address"
            required
          />

          <label htmlFor="order-phone">Phone Number</label>
          <input
            id="order-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            required
          />

          <button type="submit" className="order-submit-btn">
            Order via WhatsApp
          </button>
        </form>

        <button className="modal-close-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OrderModal;