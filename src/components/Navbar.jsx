// src/components/Navbar.jsx
import { forwardRef, useState } from 'react';
import { FaSearch, FaShoppingCart, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const Navbar = forwardRef(({ isVisible, searchTerm, setSearchTerm }, ref) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <nav ref={ref} className={`navbar ${isVisible ? '' : 'navbar-hidden'}`}>
      <Link to="/" className="logo">
        SoleCrave
      </Link>

      <div className="nav-right">
        <ul className="nav-links">
          <li>
            <Link to="/">
              <FaHome />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/cart" className="cart-link">
              <FaShoppingCart />
              <span>Cart</span>
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </Link>
          </li>
        </ul>
        <button
          className="search-toggle"
          aria-label={isSearchOpen ? 'Close search' : 'Open search'}
          aria-expanded={isSearchOpen}
          onClick={() => setIsSearchOpen((prev) => !prev)}
        >
          <FaSearch />
        </button>
      </div>

      <div className={`search-container ${isSearchOpen ? 'search-open' : ''}`}>
        <input
          type="text"
          placeholder="Search sneakers..."
          aria-label="Search sneakers"
          className="navbar-search-input"
          value={searchTerm || ''}
          onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
        />
        <button
          className="search-close"
          aria-label="Clear and close search"
          onClick={() => {
            setIsSearchOpen(false);
            if (setSearchTerm) setSearchTerm('');
          }}
        >
          ✕
        </button>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;