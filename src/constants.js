// src/constants.js
export const WHATSAPP_NUMBER = '8801878339819';

export const SHOE_SIZES = ['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'];

export const CART_STORAGE_KEY = 'solecrave-cart';

export const buildWhatsAppOrderUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;