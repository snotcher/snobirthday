import React, { useEffect, useState, useRef, useMemo } from 'react';
import '../styles/DistanceTracker.css';

const CITY_ONE = {
  name: "Tan-Tan",
  lat: 28.4378,
  lng: -11.1031,
  label: "Me 💙",
  color: "#4dabf7" // Blue
};

const CITY_TWO = {
  name: "Belfaa",
  lat: 29.3667,
  lng: -9.9833,
  label: "Asiya 💖",
  color: "#e64980" // Rose
};

// Full Morocco continuous outline including the Moroccan Sahara
const moroccoOutline = [
  // North Coast (Mediterranean)
  { lat: 35.8, lng: -5.8 },  
  { lat: 35.9, lng: -5.3 },  
  { lat: 35.2, lng: -2.9 },  
  { lat: 35.1, lng: -2.2 },  
  
  // Eastern Border
  { lat: 34.5, lng: -1.9 },  
  { lat: 32.1, lng: -1.2 },  
  { lat: 29.8, lng: -5.7 },  
  
  // Sahara Eastern/Southern Border
  { lat: 27.6, lng: -8.6 },  
  { lat: 26.0, lng: -8.6 },  
  { lat: 26.0, lng: -12.0 }, 
  { lat: 21.3, lng: -12.0 }, 
  { lat: 21.3, lng: -13.0 }, 
  { lat: 20.8, lng: -17.0 }, 
  
  // Western Coast (Atlantic)
  { lat: 20.8, lng: -17.1 }, 
  { lat: 23.7, lng: -15.9 }, 
  { lat: 26.1, lng: -14.5 }, 
  { lat: 27.1, lng: -13.2 }, 
  { lat: 27.9, lng: -12.9 }, 
  { lat: 28.5, lng: -11.0 }, 
  { lat: 29.4, lng: -10.2 }, 
  { lat: 30.4, lng: -9.6 },  
  { lat: 31.5, lng: -9.8 },  
  { lat: 32.3, lng: -9.2 },  
  { lat: 33.2, lng: -8.5 },  
  { lat: 33.6, lng: -7.6 },  
  { lat: 34.0, lng: -6.8 },  
  { lat: 35.2, lng: -6.1 },  
  { lat: 35.8, lng: -5.8 }   
];

// Linear Mapping based on full Morocco geographic bounds
const MIN_LAT = 20;
const MAX_LAT = 37;
const MIN_LNG = -18;
const MAX_LNG = -1;

const mapX = (lng) => ((lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * 300;
const mapY = (lat) => ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * 350;

function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth Radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c);
}

const DistanceTracker = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const distance = useMemo(() => calculateHaversineDistance(
      CITY_ONE.lat, CITY_ONE.lng, 
      CITY_TWO.lat, CITY_TWO.lng
  ), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const polygonPoints = moroccoOutline.map(p => `${mapX(p.lng)},${mapY(p.lat)}`).join(' ');

  const x1 = mapX(CITY_ONE.lng);
  const y1 = mapY(CITY_ONE.lat);
  const x2 = mapX(CITY_TWO.lng);
  const y2 = mapY(CITY_TWO.lat);

  return (
    <section className="distance-section" ref={sectionRef}>
      <div className="distance-container">
        
        <div className={`map-wrapper ${isVisible ? 'visible' : ''}`}>
          <svg viewBox="0 0 300 350" className="morocco-map" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={CITY_ONE.color} />
                <stop offset="100%" stopColor={CITY_TWO.color} />
              </linearGradient>
            </defs>
            
            {/* Outline of Morocco */}
            <polygon points={polygonPoints} className="morocco-outline" />

            {/* Connecting Animated Line */}
            <line 
                x1={x1} y1={y1} 
                x2={x2} y2={y2} 
                className="connecting-line"
                stroke="url(#lineGrad)"
            />

            {/* City Pulses & Labels */}
            <circle cx={x1} cy={y1} r="4" className="city-dot" fill={CITY_ONE.color} />
            <circle cx={x1} cy={y1} r="12" className="city-pulse" stroke={CITY_ONE.color} fill="none" />
            <text x={x1 - 10} y={y1 + 15} className="city-label" fill={CITY_ONE.color} textAnchor="end">{CITY_ONE.name}</text>

            <circle cx={x2} cy={y2} r="4" className="city-dot" fill={CITY_TWO.color} />
            <circle cx={x2} cy={y2} r="12" className="city-pulse" stroke={CITY_TWO.color} fill="none" />
            <text x={x2 + 10} y={y2 - 10} className="city-label" fill={CITY_TWO.color} textAnchor="start">{CITY_TWO.name}</text>
          </svg>
        </div>

        <div className={`distance-info ${isVisible ? 'visible' : ''}`}>
           <div className="distance-card glass-panel">
               <span className="distance-number">{distance}</span>
               <span className="distance-unit">km</span>
           </div>
           
           <p className="distance-tagline">
             {distance} km apart but always close at heart 💖
           </p>

           <div className="city-badges">
              <div className="city-badge" style={{ backgroundColor: CITY_ONE.color }}>
                {CITY_ONE.label} - {CITY_ONE.name}
              </div>
              <div className="city-badge" style={{ backgroundColor: CITY_TWO.color }}>
                {CITY_TWO.name} - {CITY_TWO.label}
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default DistanceTracker;
