// src/App.jsx
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import About from './components/About';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';
import './App.css';

const SPLASH_VISIBLE_MS = 1500;
const SPLASH_FADE_MS = 350;

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [isSplashFading, setIsSplashFading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const fadeTimer = setTimeout(
      () => setIsSplashFading(true),
      SPLASH_VISIBLE_MS - SPLASH_FADE_MS
    );
    const removeTimer = setTimeout(() => setInitialLoading(false), SPLASH_VISIBLE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
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
    const measure = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <CartProvider>
      <Router basename="/SoleCraveBD">
        {initialLoading && <LoadingScreen isFading={isSplashFading} />}
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
            <Route path="/product/:id" element={<About />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;