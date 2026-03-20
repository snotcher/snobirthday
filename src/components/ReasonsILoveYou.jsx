import React, { useEffect, useRef, useState } from 'react';
import '../styles/ReasonsILoveYou.css';

const reasons = [
  { id: 1, title: 'Your Smile', description: 'The way your smile instantly lights up any room you walk into.' },
  { id: 2, title: 'Your Kindness', description: 'How you always find a way to care for everyone around you.' },
  { id: 3, title: 'Your Laughter', description: 'The beautiful sound of your laugh that always makes my day better.' },
  { id: 4, title: 'Your Passion', description: 'How deeply you care about the things you love.' },
  { id: 5, title: 'Your Hair', description: 'the shiny curls that make you look like a princess' },
  { id: 6, title: 'Your Eyes', description: 'The way I can get completely lost in them every single time.' },
  { id: 7, title: 'Your Intelligence', description: 'Your brilliant mind and how you see the world so uniquely.' },
  { id: 8, title: 'Just You', description: 'Because you are you, and that is more than enough.' }
];

const ReasonsILoveYou = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section className="reasons-section" ref={sectionRef}>
      <div className="reasons-container">
        <h2 className="reasons-header">8 Reasons Why I Love You</h2>
        
        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <div 
              key={reason.id} 
              className={`reason-card glass-panel ${isVisible ? 'animate-card' : ''}`}
            >
              <div className="reason-watermark">{reason.id}</div>
              <div className="reason-content-wrapper">
                <h3 className="reason-title">{reason.title}</h3>
                <p className="reason-desc">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReasonsILoveYou;
