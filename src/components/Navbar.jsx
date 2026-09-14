import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ theme, toggleTheme }) {
  // We use this to highlight the active page
  const location = useLocation();

  return (
    <nav>
      <div className="nav-links">
        <Link to="/Home" className={location.pathname === '/Home' || location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
        <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>Projects</Link>
        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
      </div>

      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </nav>
  );
}