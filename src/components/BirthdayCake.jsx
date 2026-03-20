import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import '../styles/BirthdayCake.css';

const BirthdayCake = () => {
  const [extinguished, setExtinguished] = useState([]);
  const [showWish, setShowWish] = useState(false);
  const [showRelight, setShowRelight] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalCandles = 5;

  const handleBlowOut = () => {
    // Stagger extinguishing
    for (let i = 0; i < totalCandles; i++) {
        setTimeout(() => {
            setExtinguished(prev => [...prev, i]);
        }, i * 200); // Stagger 200ms apart (more obvious than 50ms)
    }
  };

  useEffect(() => {
      // Check if all candles are extinguished
      if (extinguished.length === totalCandles) {
          const timer = setTimeout(() => {
              setShowWish(true);
              setShowRelight(true);
          }, 800); // Show messages shortly after last candle goes out
          return () => clearTimeout(timer);
      } else {
          setShowWish(false);
          setShowRelight(false);
      }
  }, [extinguished]);

  const handleRelight = () => {
      setExtinguished([]);
      setShowWish(false);
      setShowRelight(false);
  };

  return (
    <section className="cake-section">
      {showWish && (
        <Confetti 
          width={windowDimensions.width} 
          height={windowDimensions.height} 
          recycle={false} 
          numberOfPieces={500} 
          colors={['#c2185b', '#fce4ec', '#f5d78e', '#fffaf0', '#bae1ff']}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}
        />
      )}
      <div className="cake-container">
        <h2 className="cake-greeting">Happy Birthday Asiya!</h2>

        <div className="cake-wrapper">
          {/* Top Tier */}
          <div className="tier tier-top">
             <div className="drip-container">
              {[...Array(6)].map((_, i) => <div key={i} className="drip"></div>)}
            </div>
            <div className="ribbon"></div>

            {/* Candles positioned exactly on Top Tier */}
            <div className="candles-container">
                {[...Array(totalCandles)].map((_, i) => (
                    <div key={i} className="candle-wrapper">
                        <div className={`candle candle-${i+1}`}></div>
                        <div className={`flame ${extinguished.includes(i) ? 'extinguished' : ''}`}></div>
                        {extinguished.includes(i) && <div className="smoke"></div>}
                    </div>
                ))}
            </div>
          </div>

          {/* Middle Tier */}
          <div className="tier tier-middle">
             <div className="drip-container">
              {[...Array(8)].map((_, i) => <div key={i} className="drip"></div>)}
            </div>
            <div className="ribbon"></div>
          </div>

          {/* Bottom Tier */}
          <div className="tier tier-bottom">
            <div className="drip-container">
              {[...Array(10)].map((_, i) => <div key={i} className="drip"></div>)}
            </div>
            <div className="ribbon"></div>
          </div>

          {/* Base Plate */}
          <div className="cake-plate"></div>
        </div>

        <div className="cake-actions">
          {extinguished.length < totalCandles ? (
            <button className="cake-btn blow-btn" onClick={handleBlowOut}>
              Blow out the candles 🎂
            </button>
          ) : (
             <div className={`wish-message ${showWish ? 'visible' : ''}`}>
               Make a wish, Asiya ✨
             </div>
          )}

          {showRelight && (
              <button className="cake-btn relight-btn visible" onClick={handleRelight}>
                  Relight 🔥
              </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default BirthdayCake;
