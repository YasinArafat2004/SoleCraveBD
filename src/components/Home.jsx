import { useState } from 'react';
import { products } from '../data';
import Card from './Card';

function Home({ searchTerm, isNavVisible, navbarHeight }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = products.filter((product) => {
    const categoryMatch = activeCategory === 'All' || product.category === activeCategory;
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // Dynamic top offset for sticky tabs
  const tabsStyle = {
    position: 'sticky',
    top: isNavVisible ? `${navbarHeight}px` : '0',
    zIndex: 999,
    backgroundColor: '#f4f4f4',
    padding: '0.5rem 0',
    // align left on all screens
    justifyContent: 'flex-start',
    paddingLeft: '2rem',
  };

  return (
    <div className="home-container">
      {/* Category Tabs with sticky and left align */}
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
