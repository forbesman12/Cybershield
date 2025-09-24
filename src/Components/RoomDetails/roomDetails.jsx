import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
// Removed unused import: useNavigate
import "./roomDetails.css";
import { roomsData } from "../Models/roomsData";
import Navbar from "../Homepage/Navbar/Navbar";
import Footer from "../Homepage/Footer/Footer";
import BookingForm from "../BookingForm/BookingForm";
import SEOHead from '../SEO/SEOHead';
import { getRoomStructuredData } from '../SEO/structuredData';
import {
  FaSnowflake,
  FaShieldAlt,
  FaParking,
  FaToilet,
  FaUtensils,
  FaDoorOpen,
  FaBed,
  FaUsers,
  FaCouch,
} from "react-icons/fa";
import { FaStairs } from "react-icons/fa6";

const RoomDetail = () => {

  // ✅ Map utilities to icons
  const utilityIcons = {
    AC: <FaSnowflake size={28} color="#000" />,
    Kitchen: <FaUtensils size={28} color="#000" />,
    Dining: <FaUtensils size={28} color="#000" />,
    Toilet: <FaToilet size={28} color="#000" />,
    "3 Toilets": <FaToilet size={28} color="#000" />,
    Bathroom: <FaToilet size={28} color="#000" />,
    "1 Bathroom": <FaToilet size={28} color="#000" />,
    Balcony: <FaDoorOpen size={28} color="#000" />,
    Security: <FaShieldAlt size={28} color="#000" />,
    Parking: <FaParking size={28} color="#000" />,
    "Sitting Room": <FaCouch size={28} color="#000" />,
    "Stairs": <FaStairs size={28} color="#000" />,
    "1 Bed": <FaBed size={28} color="#000" />,
    "2 Bed": <FaBed size={28} color="#000" />,
    "2 Guests": <FaUsers size={28} color="#000" />,
    "550 m²": <FaDoorOpen size={28} color="#000" />, // placeholder
  };

  const { id } = useParams();
  const room = roomsData.find((r) => r.id === parseInt(id));

  const [mainImage, setMainImage] = useState(room?.gallery[0]);

  if (!room) {
    return (
      <div className="not-found">
        <h2>Room not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const handleBookingSuccess = (bookingResult) => {
    console.log('Booking successful:', bookingResult);
    // You can add additional logic here if needed
  };

  // Generate SEO data for this specific room
  const roomStructuredData = getRoomStructuredData(room);
  const seoTitle = `${room.name} - De-Hilltop Hotel | Room Details & Booking`;
  const seoDescription = `Book ${room.name} at De-Hilltop Hotel in Okpanam, Asaba. ${room.description || 'Comfortable accommodation with modern amenities.'} Starting from ${room.price}.`;
  const seoKeywords = `${room.name}, hotel room booking, De-Hilltop rooms, ${room.tags || ''}, Okpanam hotel, Asaba accommodation`;

  return (
    <>
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl={`https://de-hilltop.com/rooms/${room.id}`}
        structuredData={roomStructuredData}
        ogImage={room.image || '/assets/IMG_0104.jpg'}
      />
      <Navbar />
      <div
        className="heroRoomImage"
        style={{
          backgroundImage: `url(${room.image})`,
          height: "55vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="detailSec">
        <div className="leftSec">
          <h1>{room.name}</h1>
          <p style={{ fontSize: "14px", color: "gray" }}>{room.tags}</p>

          <ul>
            {room.utils.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <div className="img">
            <img src={mainImage} alt={room.name} />
          </div>

          <div className="thumbnails">
            {room.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          <div className="description">
            <h2 style={{ fontWeight: "lighter" }}>Description of the Room</h2>
            <p style={{ opacity: "0.7" }}>{room.description}</p>
          </div>

          <div className="amenities">
            <h1>Facilities of the room</h1>
            <div
              className="row"
              style={{ display: "flex", flexWrap: "wrap", gap: "25px" }}
            >
              {room.utils.map((util, index) => (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {utilityIcons[util] && <div className="circle">{utilityIcons[util]}</div>}
                  <span style={{ fontSize: "18px" }}>{util}</span>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* Booking Form */}
        <div className="rightSec">
          <BookingForm 
            room={room} 
            onSuccess={handleBookingSuccess}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoomDetail;
