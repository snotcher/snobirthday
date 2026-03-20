import React, { useEffect, useState } from 'react';
import '../styles/Hero.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const name = "Asiya";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero">
      <div className="petals-container">
        {/* Render 15 floating particles/stars */}
        {[...Array(15)].map((_, i) => (
          <span key={i} className={`particle particle-${i + 1}`}></span>
        ))}
      </div>
      
      <div className={`hero-content ${isVisible ? 'fade-in' : ''}`}>
        <h1 className="hero-title">
          {name.split('').map((char, index) => (
            <span 
              key={index} 
              className="name-letter"
              style={{ animationDelay: `${0.5 + index * 0.2}s` }}
            >
              {char}
            </span>
          ))}
        </h1>
        <p className="hero-subtitle">Today is all about you ✨</p>
      </div>

      <div className="scroll-indicator">
        <svg fill="currentColor" viewBox="0 0 24 24" className="bounce-arrow">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </div>
      
      {/* SVG Wave Divider */}
      <div className="wave-divider">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.06,155.22,122.25,250.3,103.22Z" className="shape-fill"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
