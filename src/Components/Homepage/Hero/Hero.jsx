import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import './Hero.css';
import { useNavigate } from 'react-router-dom';
// Import images from assets
import img1 from '../../../assets/IMG_0070.png';
import img2 from '../../../assets/IMG_0075.png';
import img3 from '../../../assets/IMG_0079.png';
import img4 from '../../../assets/IMG_0094.png';
import img5 from '../../../assets/IMG_0104.png';
import img6 from '../../../assets/IMG_0107.png';
import img7 from '../../../assets/IMG_0068.png';
import { fadeInRight, fadeInUp, staggerContainer, hoverScale, buttonTap } from '../../../animations/variants';

const Hero = () => {
  const navigate = useNavigate();

  // Array of background images
  const images = [img5, img1, img7, img2, img3, img4, img6];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.div
      className="hero container"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={images[currentIndex]}
          className="hero-background"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
          }}
        />
      </AnimatePresence>

      <motion.div
        className="hero-content"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div className="hero-text" variants={fadeInUp}>
          <motion.h1 variants={fadeInUp}>
            Welcome to De-Hilltop Apartments and Hotels
          </motion.h1>
          <motion.p variants={fadeInUp}>
            {/* Wake up in a sunlit bedroom with crisp, fresh sheets. <br />
            Step into a stylish living room designed for relaxation and connection.<br />
            Prepare your meals in a fully-equipped modern kitchen.<br />
            Unwind on the balcony with breathtaking views of the city skyline.<br /> */}
          </motion.p>
          <motion.button
            className="btn"
            onClick={() => navigate('/contact')}
            variants={fadeInUp}
            whileHover={hoverScale}
            whileTap={buttonTap}
          >
            Explore Rooms
          </motion.button>
        </motion.div>

        
      </motion.div>
    </motion.div>
  );
};

export default Hero;
