// components/RoomsSection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./oom.css";
import { roomsData } from "../../Models/roomsData";

// ✅ Import the model


const RoomsSection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();
  const itemsPerPage = 3;

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + itemsPerPage < roomsData.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const totalRooms = roomsData.length;

  return (
    <div className="rooms-section">
      <div className="rooms-header">
        <h2>Rooms & Suites</h2>
        <div className="rooms-nav">
          <span>{String(startIndex + 1).padStart(2, "0")}</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((startIndex + 1) / totalRooms) * 100}%`,
              }}
            ></div>
          </div>
          <span>{String(totalRooms).padStart(2, "0")}</span>
          <button onClick={handlePrev}>Prev</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>

      <div className="rooms-cards">
        {roomsData.slice(startIndex, startIndex + itemsPerPage).map((room) => (
          <div
            className="room-card"
            key={room.id}
            onClick={() => navigate(`/rooms/${room.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="room-image">
              <img src={room.image} alt={room.name} />
            </div>
            <div className="room-info">
              <h3>{room.name} →</h3>
              <hr />
              <div className="ins">
                <div className="left">
                  <ul>
                    <li>1200m2</li>
                    <li>2 Beds</li>
                    <li>Wifi Available</li>
                  </ul>
                </div>
                <div className="right">
                  <ul>
                    <li>Guests</li>
                    <li>Bathrooms</li>
                    <li>Kitchen</li>
                  </ul>
                </div>
              </div>
              <p className="room-price">{room.price}</p>
              <button className="view-rates-btn">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsSection;
