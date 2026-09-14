import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function SharedLayout({ theme, toggleTheme }) {
  return (
    <div className="layout-wrapper">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Outlet /> 
      </main>
      <footer>
        <p>© 2026 Mohammad Afrid Basha. Built with React.</p>
      </footer>
    </div>
  );
}