import React, { useState, useEffect } from 'react';
import '../styles/Countdown.css';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [hasPassed, setHasPassed] = useState(false);
  const [popValues, setPopValues] = useState({});

  useEffect(() => {
    const targetDate = new Date('March 21, 2026 00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setHasPassed(true);
      } else {
        const newTimeLeft = {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };

        // Determine which values changed to trigger pop animation
        setTimeLeft(prev => {
          const changed = {};
          Object.keys(newTimeLeft).forEach(unit => {
            if (prev[unit] !== newTimeLeft[unit]) {
              changed[unit] = true;
            }
          });
          setPopValues(changed);
          
          // Reset pop class quickly
          setTimeout(() => setPopValues({}), 300);
          return newTimeLeft;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdown-section">
      <div className="countdown-container">
        <h2 className="countdown-title">The Big Day</h2>
        
        {hasPassed ? (
          <div className="celebration-message glass-panel">
            <h3>Happy Birthday Asiya! 🎉</h3>
            <p>I hope your day is as beautiful as you are.</p>
          </div>
        ) : (
          <div className="timer-grid">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="timer-card glass-panel">
                <div className={`timer-value ${popValues[unit] ? 'scale-pop' : ''}`}>
                  {value < 10 ? `0${value}` : value}
                </div>
                <div className="timer-unit">{unit}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SVG Wave Divider connecting to Love Letter */}
      <div className="wave-divider-top">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.06,155.22,122.25,250.3,103.22Z" className="shape-fill"></path>
        </svg>
      </div>
    </section>
  );
};

export default Countdown;

