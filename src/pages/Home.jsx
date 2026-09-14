import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []); 

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <h2>Loading portfolio...</h2>
      </div>
    );
  }

  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1>Hi, I'm <span className="highlight">Mohammad Afrid Basha</span></h1>
        <p>
          I am a Computer Science engineering student at NIT Warangal, specializing in Machine Learning, 
          Deep Learning, and Full-Stack Development. I build intelligent search engines, robust data pipelines, 
          and secure cloud applications.
        </p>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <Link to="/projects">
            <button>View My Work</button>
          </Link>
          <Link to="/contact">
            <button className="btn-outline">Contact Me</button>
          </Link>
        </div>
      </div>
      <div className="hero-image">
        <img src="http://localhost:5000/images/profile.jpg" alt="Mohammad Afrid Basha" />
      </div>
    </div>
  );
}