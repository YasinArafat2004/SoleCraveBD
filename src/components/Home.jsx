import { useState, useEffect } from 'react';
import { products } from '../data';
import Card from './Card';
import { FaEllipsisH, FaTimes } from 'react-icons/fa';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const OfferSlider = () => {
  const slides = [
    { id: 1, image: 'https://res.cloudinary.com/a94ialuw/image/upload/v1788600111/IMG_0297.jpg', title: 'New Collection 2025', subtitle: 'Step into style' },
    { id: 2, image: 'https://res.cloudinary.com/a94ialuw/image/upload/v1792333819/IMG_7388.jpg', title: 'Up to 40% Off', subtitle: 'Limited time offer' },
    { id: 3, image: 'https://res.cloudinary.com/a94ialuw/image/upload/v1792494960/IMG_20260926_133016_341.jpg', title: 'Exclusive Sneakers', subtitle: 'Shop now' },
    { id: 4, image: 'https://res.cloudinary.com/a94ialuw/image/upload/v1788600104/IMG_1085.jpg', title: 'Summer Sale', subtitle: 'Get ready for summer' },
    { id: 5, image: 'https://res.cloudinary.com/a94ialuw/image/upload/v1788600105/IMG_0075.jpg', title: 'New Arrivals', subtitle: 'Check out the latest' },
    { id: 6, image: 'https://res.cloudinary.com/a94ialuw/image/upload/v1788600108/IMG_0062.jpg', title: 'Limited Edition', subtitle: 'Exclusive designs' },
  ];

  return (
    <div className="offer-slider-wrapper">
      <Swiper
        modules={[Autoplay, Pagination, EffectCoverflow]}
        className="mySwiper"
        effect="coverflow"
        centeredSlides={true}
        slidesPerView={1.08}
        spaceBetween={12}
        loop={slides.length > 2}
        speed={700}
        grabCursor={true}
        watchSlidesProgress={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}
        keyboard={{
          enabled: true,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1.2,
          slideShadows: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1.04, spaceBetween: 8 },
          480: { slidesPerView: 1.12, spaceBetween: 12 },
          768: { slidesPerView: 1.35, spaceBetween: 20 },
          1024: { slidesPerView: 1.55, spaceBetween: 24 },
          1440: { slidesPerView: 1.7, spaceBetween: 30 },
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide">
              <img src={slide.image} alt={slide.title} loading="lazy" decoding="async" />
              <div className="slide-overlay">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

function Home({ searchTerm, isNavVisible, navbarHeight }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [randomProducts, setRandomProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [showMenu, setShowMenu] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const shuffleArray = (arr) => {
      const shuffled = [...arr];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    setRandomProducts(shuffleArray(products));
  }, []);

  const availableBrands = ['All', ...new Set(products.map(p => p.brand).filter(Boolean))];

  // --- UPDATED FILTER LOGIC ---
  const filteredProducts = randomProducts.filter((product) => {
    const productCategory = product.category ? product.category.toLowerCase() : '';
    const currentCategory = activeCategory.toLowerCase();
    
    // NEW LOGIC: Show if user clicked 'All', OR if the product itself is 'All', OR if they match.
    const categoryMatch = 
      currentCategory === 'all' || 
      productCategory === 'all' || 
      productCategory === currentCategory;

    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const brandMatch = selectedBrand === 'All' || product.brand === selectedBrand;
    
    const price = product.price;
    const min = minPrice === '' ? 0 : Number(minPrice);
    const max = maxPrice === '' ? Infinity : Number(maxPrice);
    const priceMatch = price >= min && price <= max;

    return categoryMatch && searchMatch && brandMatch && priceMatch;
  });

  const tabsStyle = {
    position: 'sticky',
    top: isNavVisible ? `${navbarHeight}px` : '0',
    zIndex: 999,
    backgroundColor: '#f4f4f4',
    padding: '0.5rem 2rem',
  };

  return (
    <div className="home-container">
      <div className="sticky-header-wrapper" style={tabsStyle}>
        <div className="header-top-row">
          <div className="category-tabs">
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

          <div className="filter-menu-container">
            <button className="filter-dots-btn" onClick={() => setShowMenu(!showMenu)}>
              <FaEllipsisH />
            </button>
            {showMenu && (
              <div className="filter-dropdown">
                <button onClick={() => { setActiveModal('price'); setShowMenu(false); }}>Price Range</button>
                <button onClick={() => { setActiveModal('brand'); setShowMenu(false); }}>Brand</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {activeCategory === 'All' && <OfferSlider />}

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))
        ) : (
          <p className="no-results">No sneakers found matching your filters.</p>
        )}
      </div>

      {activeModal && (
        <div className="filter-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="filter-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-icon" onClick={() => setActiveModal(null)}><FaTimes /></button>
            {activeModal === 'price' && (
              <div className="price-filter-modal">
                <h3>Filter by Price</h3>
                <div className="price-inputs">
                  <input type="number" placeholder="Min ৳" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                  <span>to</span>
                  <input type="number" placeholder="Max ৳" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                </div>
                <button className="apply-filter-btn" onClick={() => setActiveModal(null)}>Apply</button>
                <button className="clear-filter-btn" onClick={() => { setMinPrice(''); setMaxPrice(''); setActiveModal(null); }}>Clear</button>
              </div>
            )}
            {activeModal === 'brand' && (
              <div className="brand-filter-modal">
                <h3>Filter by Brand</h3>
                <div className="brand-list">
                  {availableBrands.map(brand => (
                    <button key={brand} className={`brand-option ${selectedBrand === brand ? 'active' : ''}`} onClick={() => { setSelectedBrand(brand); setActiveModal(null); }}>
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;