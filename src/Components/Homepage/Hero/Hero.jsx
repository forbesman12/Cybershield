import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
// Import optimized images from assets
import img1 from '../../../assets/H5.jpg';
import img2 from '../../../assets/IMG_0075.jpg';
import img3 from '../../../assets/IMG_0079.jpg';
import img4 from '../../../assets/H2.jpg';
import img5 from '../../../assets/IMG_0104.jpg';
import img6 from '../../../assets/IMG_0107.jpg';
import img7 from '../../../assets/H3.jpg';

const Hero = () => {
  const navigate = useNavigate();

  // Array of background images
  const images = [img5, img1, img7, img2, img3, img4, img6];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="hero" style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8)40%, rgba(0, 0, 0, 0) 70%), url(${images[currentIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 1s ease-in-out' }}>
      <div className="herotexts">
        <h1 className="hero-titles" >De-Hilltop Hotel <br />Apartments and Suites</h1>
        <p style={{ color: "white", lineHeight: "1.8" }}>Experience unparalleled comfort and elegance in our private luxury suites,<br />
          designed for the discerning traveler. Our rooms <br />are designed to cater to your every need.</p>
        <button className="bttnn" onClick={() => { navigate('/rooms'); setMenuOpen(false); }}>Book Now</button>
      </div>

    </div>
  );
};

export default Hero;

// style={{ fontSize: "2.8rem", fontWeight: "lighter" }}