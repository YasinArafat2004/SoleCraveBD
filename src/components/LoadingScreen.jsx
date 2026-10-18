// src/components/LoadingScreen.jsx
const LoadingScreen = ({ isFading }) => {
  return (
    <div className={`loading-screen ${isFading ? 'is-fading' : ''}`}>
      <div className="loading-content">
        <h1 className="loading-brand">SoleCrave</h1>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;