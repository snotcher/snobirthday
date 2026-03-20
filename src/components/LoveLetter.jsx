import React, { useEffect, useRef, useState } from 'react';
import '../styles/LoveLetter.css';

const LoveLetter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const letterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = letterRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section className="love-letter-section" ref={letterRef}>
      <div className={`envelope ${isVisible ? 'open' : ''}`}>
        <div className="envelope-flap"></div>
        <div className="wax-seal">A</div>

        <div className="letter-paper">
          <div className="quill-icon">✒️</div>
          <div className="letter-content">
            <h2 className="letter-greeting">My Dearest Asiya,</h2>
            
            <div className="letter-body">
              {/* // TODO: personalize */}
              <p className="typewriter-line line-1">
                Happy Birthday! I wanted to make something special just for you.
              </p>
              <p className="typewriter-line line-2">
                Every moment with you is like a beautiful dream I never want to wake up from.
              </p>
              <p className="typewriter-line line-3">
                Your smile brightens up my darkest days, and your laughter is my favorite melody.
              </p>
              <p className="typewriter-line line-4">
                Thank you for being the amazing, wonderful person that you are.
              </p>
              <p className="typewriter-line line-5">
                I hope this year brings you as much joy as you bring to my life.
              </p>
            </div>
            
            <div className="decorative-divider"></div>

            <p className="letter-closing">With endless love,</p>
            <p className="letter-signature">Snotcher</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveLetter;
