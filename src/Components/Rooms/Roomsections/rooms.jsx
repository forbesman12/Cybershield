import React, { useEffect, useRef } from 'react';
import './rooms.css';
import Navbar from '../../Homepage/Navbar/Navbar';
import { roomsData } from '../../Models/roomsData';
import { useNavigate } from "react-router-dom";
import Footer from '../../Homepage/Footer/Footer';
import Img1 from '../../../assets/R3II.jpg';
import SEOHead from '../../SEO/SEOHead';
import { getLocalBusinessStructuredData } from '../../SEO/structuredData';

const Rooms = () => {
  const navigate = useNavigate();
  const roomsGridRef = useRef(null);

  useEffect(() => {
    const roomsGrid = roomsGridRef.current;
    const cards = roomsGrid?.querySelectorAll('.room-card');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          roomsGrid.classList.add('visible');
          cards.forEach(card => card.classList.add('visible'));
        } else {
          roomsGrid.classList.remove('visible');
          cards.forEach(card => card.classList.remove('visible'));
        }
      },
      { threshold: 0.2 }
    );

    if (roomsGrid) observer.observe(roomsGrid);

    return () => {
      if (roomsGrid) observer.disconnect();
    };
  }, []);

  const roomsStructuredData = getLocalBusinessStructuredData();

  return (
    <div className="rooms-page">
      <SEOHead 
        title="Hotel Rooms - De-Hilltop Hotel | Luxury Accommodations"
        description="Browse our selection of luxury hotel rooms at De-Hilltop Hotel. From cozy standard rooms to spacious suites, find the perfect accommodation for your stay."
        keywords="hotel rooms, accommodations, luxury rooms, suites, De-Hilltop rooms, booking, mountain view rooms"
        canonicalUrl="https://de-hilltop.com/rooms"
        structuredData={roomsStructuredData}
      />
      <Navbar />


      
      {/* Hero Section with Background Image */}
      <section className="rooms-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Our Rooms</h1>
            <p>Experience luxury and comfort in our beautifully designed rooms</p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="rooms-container">

        <div className="rooms-grid" ref={roomsGridRef}>
          {roomsData.map((room) => (
            <div
              key={room.id}
              className="room-card"
              onClick={() => navigate(`/rooms/${room.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="room-image">
                <img src={room.image} alt={`${room.name} at De-Hilltop Hotel - comfortable accommodation with modern amenities`} />
              </div>
              <div className="room-content">
                <p>{room.name}</p>
                <hr />
                <div className="ins">
                  <div className="left">
                    <ul>
                      <li>1200m2</li>
                      <li>2 Bedrooms</li>
                      <li>Wifi Available</li>
                      <li>Sitting Room</li>
                    </ul>
                  </div>
                  <div className="right">
                    <ul>
                      <li>Guests</li>
                      <li>Bathrooms</li>
                      <li>Kitchen</li>
                      <li>Balcony</li>
                    </ul>
                  </div>
                </div>
                <p className="room-price">{room.price}</p>
                <button className="view-rates-btn">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Rooms;