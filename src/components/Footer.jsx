// src/components/Footer.jsx
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>SoleCrave</h2>
          <p>Step into style.</p>
        </div>

        <div className="footer-socials">
          <a
            href="https://www.facebook.com/SoleCrave.bd/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="social-icon facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/solecrave.bd"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="social-icon instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/8801407394153"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="social-icon whatsapp"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SoleCrave. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;