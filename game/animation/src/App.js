import React, { useState, useEffect } from 'react';
import './App.css';

// Define paths for background and sprite images
const backgroundImage = '/background.jpg';
const spriteImages = ['/sprite1.png', '/sprite2.png', '/sprite3.png']; // Add more sprite images for animation

function App() {
  const [spriteIndex, setSpriteIndex] = useState(0);

  useEffect(() => {
    // Function to update sprite index at regular intervals
    const interval = setInterval(() => {
      setSpriteIndex((prevIndex) => (prevIndex + 1) % spriteImages.length);
    }, 500); // Adjust the interval for animation speed

    return () => clearInterval(interval); // Cleanup function to clear interval
  }, []);

  return (
    <div className="App">
      <div className="background-container">
        <img src={backgroundImage} alt="Background" className="background-image" />
        <img src={spriteImages[spriteIndex]} alt="Sprite" className="sprite-image" />
      </div>
    </div>
  );
}

export default App;
