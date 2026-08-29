import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';     // or './pages/Home' – adjust to your path
import Cart from './components/Cart';     // adjust path if needed
import './App.css';

function App() {
  // --- Search state ---
  const [searchTerm, setSearchTerm] = useState('');

  // --- Navbar visibility ---
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef(null);
  const lastScrollY = useRef(0);

  // Scroll listener for navbar hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Measure navbar height after render
  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar
          ref={navbarRef}
          isVisible={isNavVisible}
          searchTerm={searchTerm}          // <-- added
          setSearchTerm={setSearchTerm}    // <-- added
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isNavVisible={isNavVisible}
                navbarHeight={navbarHeight}
                searchTerm={searchTerm}    // <-- added
              />
            }
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;