import React from 'react';
import './rooms.css';
import Navbar from '../../Homepage/Navbar/Navbar';
import { roomsData } from '../../Models/roomsData';

const Rooms = () => {
  return (
    <div className="rooms-page">
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
        <h1>Available Rooms</h1>
        <p>Choose from our selection of premium rooms and suites</p>

        <div className="rooms-grid">
          {roomsData.map((room) => (
            <div key={room.id} className="room-card">
              <div className="room-image">
                <img src={room.image} alt={room.name} />
              </div>
              <div className="room-content">
                <p>{room.price}</p> 
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
                <p className="room-price">{roomsData.price}</p> {/* 👈 display price */}
                <button className="view-rates-btn">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Rooms;
