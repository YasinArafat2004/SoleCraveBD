// src/App.jsx
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import About from './components/About';        // <-- new import
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  return (
    <Router>
      {initialLoading && <LoadingScreen />}
      <div className="app">
        <Navbar
          ref={navbarRef}
          isVisible={isNavVisible}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isNavVisible={isNavVisible}
                navbarHeight={navbarHeight}
                searchTerm={searchTerm}
              />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<About />} />   {/* new route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;