import { head } from 'framer-motion/client';
import React, { useState, useEffect } from 'react';

const useResponsiveStyles = (currentIndex) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isTablet = windowWidth <= 768;
  const isMobile = windowWidth <= 480;

  return {
    container: {
      height: "50vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: isTablet ? "10px" : "20px",
      backgroundColor: "#fff",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      position: "relative",
    },
    subtitle: {
      color: "#666",
      fontSize: isTablet ? "12px" : "14px",
      marginBottom: "10px",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    title: {
      fontSize: isMobile ? "0.5rem" : isTablet ? "0.9rem" : "2.5rem",
      marginBottom: "20px",
      fontWeight: "bold",
      color: "#333",
    },
    slider: {
      maxWidth: "600px",
      overflow: "hidden",
      position: "relative",
    },
    slide: {
      transition: "transform 0.5s ease-in-out",
      transform: `translateX(-${currentIndex * 100}%)`,
      display: "flex",
      width: "100%",
    },
    testimony: {
      flex: "0 0 100%",
      padding: "0 20px",
      boxSizing: "border-box",
    },
    stars: {
      marginBottom: "20px",
      color: "#8bc34a",
      fontSize: isTablet ? "1.2rem" : "1.5rem",
    },
    text: {
      color: "#666",
      fontSize: isTablet ? "1rem" : "1.1rem",
      lineHeight: "1.6",
      marginBottom: "10px",
    },
    author: {
      color: "#666",
      fontSize: isTablet ? "0.8rem" : "0.9rem",
      fontStyle: "italic",
    },
    dots: {
      display: "flex",
      gap: "10px",
      marginTop: "20px",
    },
    dot: (active) => ({
      width: "10px",
      height: "10px",
      backgroundColor: active ? "#8bc34a" : "#ccc",
      borderRadius: "50%",
      cursor: "pointer",
    }),
  };
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: "I give them a five star because am just appreciating the work of the builder from start to finish",
      author: "Noris - Public Review",
      rating: 5,
    },
    {
      text: "Excellent service and beautiful rooms! Highly recommend for a comfortable stay.",
      author: "Daniel - Guest Review",
      rating: 4,
    },
    {
      text: "The apartments are spacious and well-maintained. Great space",
      author: "Joy - Renter Review",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Slide every 5 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const styles = useResponsiveStyles(currentIndex);

  return (
    <div style={styles.container}>
      <h3 style={styles.subtitle}>Testimonials</h3>
      <h1 style={styles.title}>What they say ?</h1>
      <div style={styles.slider}>
        <div style={styles.slide}>
          {testimonials.map((testimonial, index) => (
            <div key={index} style={styles.testimony}>
              <div style={styles.stars}>
                {"★".repeat(testimonial.rating) +
                  "☆".repeat(5 - testimonial.rating)}
              </div>
              <p style={styles.text}>{testimonial.text}</p>
              <p style={styles.author}>{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.dots}>
        {testimonials.map((_, index) => (
          <div
            key={index}
            style={styles.dot(currentIndex === index)}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
