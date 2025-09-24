import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./oom.css";
import { roomsData } from "../../Models/roomsData";

const RoomsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const roomsPerPage = 3;
  const roomsCardsRef = useRef(null);
  
  // Calculate pagination values
  const totalPages = Math.ceil(roomsData.length / roomsPerPage);
  const startIndex = currentPage * roomsPerPage;
  const endIndex = Math.min(startIndex + roomsPerPage, roomsData.length);
  const currentRooms = roomsData.slice(startIndex, endIndex);
  
  // Animation effect for cards
  useEffect(() => {
    const roomsCards = roomsCardsRef.current;
    const cards = roomsCards?.querySelectorAll('.room-card');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          roomsCards?.classList.add('visible');
          cards?.forEach(card => card.classList.add('visible'));
        } else {
          roomsCards?.classList.remove('visible');
          cards?.forEach(card => card.classList.remove('visible'));
        }
      },
      { threshold: 0.2 }
    );

    if (roomsCards) observer.observe(roomsCards);

    return () => {
      if (roomsCards) observer.disconnect();
    };
  }, [currentPage]); // Re-run when page changes

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const isPrevDisabled = currentPage === 0;
  const isNextDisabled = currentPage === totalPages - 1;

  return (
    <div className="rooms-section">
      <div className="rooms-header">
        <h2>Rooms & Suites</h2>
        <div className="rooms-nav">
          <span>{String(currentPage + 1).padStart(2, "0")}</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((currentPage + 1) / totalPages) * 100}%`,
              }}
            ></div>
          </div>
          <span>{String(totalPages).padStart(2, "0")}</span>
          <button 
            onClick={handlePrevious} 
            disabled={isPrevDisabled}
            style={{ opacity: isPrevDisabled ? 0.5 : 1 }}
          >
            Prev
          </button>
          <button 
            onClick={handleNext} 
            disabled={isNextDisabled}
            style={{ opacity: isNextDisabled ? 0.5 : 1 }}
          >
            Next
          </button>
        </div>
      </div>

      <div className="rooms-cards" ref={roomsCardsRef}>
        {currentRooms.map((room) => (
          <div
            className="room-card"
            key={room.id}
            onClick={() => navigate(`/rooms/${room.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="room-image">
              <img 
                src={room.image} 
                alt={room.name}
                onError={(e) => {
                  console.error(`Failed to load image for room: ${room.name}`, room.image);
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="room-info">
              <h3>{room.name}</h3>
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
