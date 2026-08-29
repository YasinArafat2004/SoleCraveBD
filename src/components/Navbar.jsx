import { forwardRef, useState } from 'react';
import { FaSearch, FaShoppingCart, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = forwardRef(({ isVisible, searchTerm, setSearchTerm }, ref) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav 
      ref={ref} 
      className={`navbar ${isVisible ? '' : 'navbar-hidden'}`}
    >
      <div className="logo">SoleCrave</div>

      <div className="nav-right">
        <ul className="nav-links">
          <li><Link to="/"><FaHome /><span>Home</span></Link></li>
          <li><Link to="/cart"><FaShoppingCart /><span>Cart</span></Link></li>
        </ul>
        <button 
          className="search-toggle"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <FaSearch />
        </button>
      </div>

      <div className={`search-container ${isSearchOpen ? 'search-open' : ''}`}>
        <input 
          type="text" 
          placeholder="Search sneakers..." 
          className="navbar-search-input"
          value={searchTerm || ''}
          onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
        />
        <button 
          className="search-close"
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

export default Navbar;