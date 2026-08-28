import { Link } from 'react-router-dom'; // Import Link for navigation

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">SoleCrave</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}
export default Navbar;