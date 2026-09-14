import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SharedLayout from './components/SharedLayout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail'; 
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  // 1. Initialize state. Check localStorage first; if nothing is there, default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  // 2. useEffect: Run this block of code EVERY time the 'theme' variable changes
  useEffect(() => {
    // Save the new preference to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply a CSS class directly to the HTML body to trigger the visual change
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]); // This array tells React: "Only run this effect when 'theme' changes"

  // 3. A helper function to flip the switch
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Pass the theme and the toggle function down as props */}
        <Route path="/" element={<SharedLayout theme={theme} toggleTheme={toggleTheme} />}>
          
          <Route index element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="about" element={<About />} />
          
          {/* 2. Added the dynamic route directly beneath the main projects route */}
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />
          
          <Route path="contact" element={<Contact />} />
          
          <Route path="*" element={<NotFound />} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;