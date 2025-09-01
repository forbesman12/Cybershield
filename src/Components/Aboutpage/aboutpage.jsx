import React, { useState } from 'react';
import './aboutPage.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../Homepage/Navbar/Navbar'

// Images
import Img9 from '../../assets/IMG_0068.png';
import img6 from '../../assets/IMG_0070.png';
import img7 from '../../assets/IMG_0104.png';
import Footer from '../Homepage/Footer/Footer';

const AboutPage = () => {
  const [current, setCurrent] = useState(0);
  const slides = [Img9, img6, img7];

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const mapStyle = {
    width: '100%',
    height: '450px',
    borderRadius: '12px'
  };

  // Coordinates for Okpanam, Asaba, Delta State
  const center = [6.21928, 6.69030];

  return (
    <section className="about">
      <Navbar />
      {/* Hero */}
      <div className="about-hero">
        <div className="hero-overlay">
          <h1>About De-HillTop Apartments</h1>
          {/* <p>Comfortable, Secure & Convenient Living in Okpanam, Asaba</p> */}
        </div>
      </div>

      {/* Story Section */}
      <div className="about-container">
        <div className="about-text">
          <h3>ABOUT THE DE-HILLTOP HOTEL AND APARTMENTS</h3>
          <h2 />Hello and welcome to De-HillTop Apartments, your premier destination for comfortable and secure living in the heart of Okpanam, Asaba.
          <p>At De-HillTop Apartments, we understand the importance of finding a place that not only meets your needs <br /> but also exceeds your expectations. Our apartments are thoughtfully designed to offer <br /> a blend of modern amenities and cozy comforts, ensuring that every stay is both enjoyable and memorable.</p>
        </div>
        <div className="about-image">
          <div className="aboutimage-image"></div>
          <div className="aboutimage-text">
              <h2>The Apartment</h2>
              <h4>9 floors with 23 rooms</h4>
              <p>Our Hotel has 23 floors with 358 rooms and suites, making the <br />
              De-HillTop Hotel and Apartments one of the largest hotels in <br />
              Asaba. Each room is elegantly furnished and equipped with <br />
              modern amenities to ensure a comfortable stay. Whether you're <br />
              here for business or leisure, our rooms provide the perfect <br />
              
              </p>
          </div>

        </div>
      </div>


      {/* OpenStreetMap Section */}
      <div style={{ margin: '40px 0' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Our Location</h3>
        <MapContainer center={center} zoom={17} style={mapStyle} scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          <Marker position={center}>
            <Popup>
              De-HillTop Apartments<br />Okpanam, Asaba, Delta State
            </Popup>
          </Marker>
        </MapContainer>
      </div>



      <Footer />
    </section>
  );
}

export default AboutPage;
