// src/components/Home.jsx
import { useState, useEffect } from 'react';
import { products } from '../data';
import Card from './Card';

// --- Slider component (unchanged – uses products from data?) 
// Actually the slider currently uses hardcoded slides. 
// We'll keep it as is (or you can later modify to use products).
// But it's fine.

const OfferSlider = () => {
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1605348532760-1633f8f2b4b2?w=600&auto=format&fit=crop',
      title: 'New Collection 2025',
      subtitle: 'Step into style',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop',
      title: 'Up to 40% Off',
      subtitle: 'Limited time offer',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop',
      title: 'Exclusive Sneakers',
      subtitle: 'Shop now',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <div className="offer-slider">
      <div className="slider-wrapper">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="slide">
              <img src={slide.image} alt={slide.title} />
              <div className="slide-overlay">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="slider-dots">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
};

// --- Main Home component ---
function Home({ searchTerm, isNavVisible, navbarHeight }) {
  const [activeCategory, setActiveCategory] = useState('All');
  // Randomize the products order once per component mount
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    // Shuffle function (Fisher–Yates)
    const shuffleArray = (arr) => {
      const shuffled = [...arr];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    setRandomProducts(shuffleArray(products));
  }, []); // runs once on mount

  // Filter based on category and search (use randomProducts for filtering)
  const filteredProducts = randomProducts.filter((product) => {
    const categoryMatch = activeCategory === 'All' || product.category === activeCategory;
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const tabsStyle = {
    position: 'sticky',
    top: isNavVisible ? `${navbarHeight}px` : '0',
    zIndex: 999,
    backgroundColor: '#f4f4f4',
    padding: '0.5rem 2rem',
    justifyContent: 'flex-start',
  };

  return (
    <div className="home-container">
      <div className="category-tabs" style={tabsStyle}>
        {['All', 'Man', 'Woman'].map((category) => (
          <button
            key={category}
            className={activeCategory === category ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {activeCategory === 'All' && <OfferSlider />}

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))
        ) : (
          <p className="no-results">No sneakers found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;