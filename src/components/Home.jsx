// src/components/Home.jsx
import { useState, useEffect, useMemo } from 'react';
import { products } from '../data';
import Card from './Card';

const SLIDES = [
  {
    id: 1,
    image: 'https://res.cloudinary.com/a94ialuw/image/upload/v1788108023/samples/ecommerce/analog-classic.jpg',
    title: 'New Collection 2026',
    subtitle: 'Step into style',
  },
  {
    id: 2,
    image: 'https://res.cloudinary.com/a94ialuw/image/upload/v1788108028/samples/landscapes/landscape-panorama.jpg',
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

const OfferSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="offer-slider">
      <div className="slider-wrapper">
        <div className="slider-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {SLIDES.map((slide) => (
            <div key={slide.id} className="slide">
              <img src={slide.image} alt={slide.title} loading="lazy" />
              <div className="slide-overlay">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="slider-dots">
        {SLIDES.map((slide, idx) => (
          <span
            key={slide.id}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            role="button"
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const CATEGORIES = ['All', 'Man', 'Woman'];

function Home({ searchTerm, isNavVisible, navbarHeight }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const [randomProducts] = useState(() => {
    const shuffled = [...products];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return randomProducts.filter((product) => {
      const categoryMatch = activeCategory === 'All' || product.category === activeCategory;
      const searchMatch = product.name.toLowerCase().includes(term);
      return categoryMatch && searchMatch;
    });
  }, [randomProducts, activeCategory, searchTerm]);

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
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? 'tab-btn active' : 'tab-btn'}
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {activeCategory === 'All' && <OfferSlider />}

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <Card key={product.id} product={product} />)
        ) : (
          <p className="no-results">No sneakers found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;