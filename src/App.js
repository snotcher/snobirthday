import React from 'react';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import BirthdayCake from './components/BirthdayCake';
import DistanceTracker from './components/DistanceTracker';
import LoveLetter from './components/LoveLetter';
import ReasonsILoveYou from './components/ReasonsILoveYou';
import './App.css';

function App() {
  return (
    <div className="app">
      <Hero />
      <Countdown />
      <BirthdayCake />
      <DistanceTracker />
      <LoveLetter />
      <ReasonsILoveYou />
      <footer className="footer">
        Made with 💖 for Asiya
      </footer>
    </div>
  );
}

export default App;
