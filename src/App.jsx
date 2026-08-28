import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './components/Home';

import About from './components/About';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
           
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;