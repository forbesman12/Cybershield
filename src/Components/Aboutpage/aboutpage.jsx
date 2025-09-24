import React, { useEffect, useRef } from 'react';
import './aboutPage.css';
import GoogleMaps from '../GoogleMaps/GoogleMaps';
import Navbar from '../Homepage/Navbar/Navbar';
import Footer from '../Homepage/Footer/Footer';
import Img4 from '../../assets/IMG_0104.jpg';
import SEOHead from '../SEO/SEOHead';
import { getLocalBusinessStructuredData } from '../SEO/structuredData';

const AboutPage = () => {
  const aboutImageRef = useRef(null);

  useEffect(() => {
    const aboutImage = aboutImageRef.current;
    const image = aboutImage?.querySelector('.aboutimage-image');
    const text = aboutImage?.querySelector('.aboutimage-text');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          aboutImage.classList.add('visible');
          image.classList.add('visible');
          text.classList.add('visible');
        } else {
          aboutImage.classList.remove('visible');
          image.classList.remove('visible');
          text.classList.remove('visible');
        }
      },
      { threshold: 0.2 }
    );

    if (aboutImage) observer.observe(aboutImage);

    return () => {
      if (aboutImage) observer.disconnect();
    };
  }, []);

  // Coordinates for Okpanam, Asaba, Delta State (Google Maps format)
  const center = { lat: 6.21928, lng: 6.69030 };

  const aboutStructuredData = getLocalBusinessStructuredData();

  return (
    <section className="about">
      <SEOHead 
        title="About Us - De-Hilltop Hotel & Apartments | Our Story"
        description="Learn about De-Hilltop Hotel & Apartments in Okpanam, Asaba. Discover our story, facilities, and commitment to providing comfortable, secure, and convenient accommodation."
        keywords="about De-Hilltop Hotel, hotel story, Okpanam hotel, Asaba accommodation, Delta State hotel, hotel facilities, about us"
        canonicalUrl="https://de-hilltop.com/about"
        structuredData={aboutStructuredData}
      />
      <Navbar />
      {/* Hero */}
      <div className="about-hero">
        <div className="hero-overlay">
          <h1>About De-HillTop Apartments</h1>
          <p>Comfortable, Secure & Convenient Living in Okpanam, Asaba</p>
        </div>
      </div>

      {/* Story Section */}
      <div className="about-container">
        <div className="about-text">
          <h3>ABOUT THE DE-HILLTOP HOTEL AND APARTMENTS</h3>
          <h2>Welcome to De-HillTop Apartments</h2>
          <p>
            At De-HillTop Apartments, we understand the importance of finding a place that not only meets your needs <br />
            but also exceeds your expectations. Our apartments are thoughtfully designed to offer <br />
            a blend of modern amenities and cozy comforts, ensuring that every stay is both enjoyable and memorable.
          </p>
        </div>
        <div className="about-image" ref={aboutImageRef}>
          <div className="aboutimage-image">
            <img src={Img4} alt="De-Hilltop Hotel and Apartments exterior view showcasing modern architecture in Okpanam, Asaba" />
          </div>
          <div className="aboutimage-text">
            <h2>The Duplex Suites</h2>
            <h4>5 luxury duplex suites</h4>
            <p>
              Our Hotel features 5 spacious duplex suites, each thoughtfully <br />
              designed with 2 bedrooms, a comfortable parlour, dining area, <br />
              fully equipped kitchen, and private balcony. Each suite spans <br />
              two floors offering ample space and privacy. Whether you're <br />
              here for business or leisure, our suites provide the perfect <br />
              blend of luxury, comfort, and home-like convenience.
            </p>
          </div>
        </div>
      </div>

      {/* Google Maps Section */}
      <GoogleMaps 
        center={center}
        zoom={17}
        title="De-HillTop Hotel and Apartments"
        address="Okpanam, Asaba, Delta State, Nigeria"
      />

      <Footer />
    </section>
  );
};

export default AboutPage;