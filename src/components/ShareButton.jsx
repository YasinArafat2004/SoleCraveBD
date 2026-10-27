// src/components/ShareButton.jsx
import { useState } from 'react';
import { createPortal } from 'react-dom'; // <-- IMPORT THIS
import { FaShareAlt, FaWhatsapp, FaFacebookF, FaLink, FaCheck } from 'react-icons/fa';
import { SiMessenger } from 'react-icons/si';

const ShareButton = ({ product }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/SoleCraveBD/product/${product.id}`; 
  const shareText = `Check out the ${product.name} on SoleCrave!`;

  const handleIconClick = (e) => {
    e.stopPropagation(); 
    e.preventDefault();
    setShowPopup(true);
  };

  const handleCopyLink = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowPopup(false);
      }, 2000);
    } catch (err) {
      alert('Failed to copy link.');
    }
  };

  const stopPropagation = (e) => e.stopPropagation();

  // The popup content
  const popupHTML = showPopup ? (
    <div className="share-popup-overlay" onClick={() => setShowPopup(false)}>
      <div className="share-popup-content" onClick={stopPropagation}>
        <h4>Share this sneaker</h4>
        <div className="share-options">
          <a 
            href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`} 
            target="_blank" rel="noreferrer" className="share-option whatsapp"
          >
            <FaWhatsapp /> WhatsApp
          </a>
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} 
            target="_blank" rel="noreferrer" className="share-option facebook"
          >
            <FaFacebookF /> Facebook
          </a>
          <a 
            href={`fb-messenger://share/?link=${encodeURIComponent(shareUrl)}`} 
            className="share-option messenger"
          >
            <SiMessenger /> Messenger
          </a>
          <button className="share-option copy" onClick={handleCopyLink}>
            {copied ? <FaCheck /> : <FaLink />} {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
        <button className="share-close-btn" onClick={() => setShowPopup(false)}>Cancel</button>
      </div>
    </div>
  ) : null;

  return (
    <div className="share-wrapper">
      <button className="share-icon-btn" onClick={handleIconClick} title="Share this product">
        <FaShareAlt />
      </button>

      {/* RENDER POPUP OUTSIDE THE CARD USING PORTAL */}
      {createPortal(popupHTML, document.body)}
    </div>
  );
};

export default ShareButton;