import React from 'react';
import './detail.css';
import { FaCalendarCheck, FaWifi, FaTags, FaBed } from "react-icons/fa";
import Img8 from '../../../assets/IMG_0107.png';
import Img9 from '../../../assets/IMG_0068.png';
import img6 from '../../../assets/IMG_0104.png';
import img7 from '../../../assets/IMG_0068.png';

const Detail = () => {
  return (
    <>

      <section id='why-choose-us' className="tags">
        <div className="easyBooking tag">
          <div className="icons">
            <FaCalendarCheck size={30} />
          </div>
          <div className="text">
            Booking your stay has never been <br />easier reserve in just a few taps.
          </div>
        </div>

        <div className="wifi tag">
          <div className="icons">
            <FaWifi size={30} />
          </div>
          <div className="text">
            Enjoy fast and reliable Wi-Fi<br />throughout your entire stay.
          </div>
        </div>

        <div className="affordable tag">
          <div className="icons">
            <FaTags size={30} />
          </div>
          <div className="text">
            Experience premium comfort at<br />a price  that fits your budget.
          </div>
        </div>

        <div className="room tag">
          <div className="icons">
            <FaBed size={30} />
          </div>
          <div className="text">
            Relax in our spacious, <br />well-furnished, and cozy <br />rooms.
          </div>
        </div>

      </section>
      <section className="about-section">
        <div className="about-content">
          <h4 className="section-subtitle">ABOUT DE-HILLTOP APARTMENTS & HOTEL</h4>
          <h1 className="section-title">The Hilltop Experience</h1>
          <p>
            Welcome to De-Hilltop Apartments and Hotel, where elegance meets comfort.
            This is more than just a hotel — it’s a promise of exceptional stays,
            inspiring surroundings, and warm hospitality that feels like home.
            Every detail is crafted to surprise, delight, and inspire you.
          </p>
          <p>
            We are committed to providing luxurious yet homely accommodations,
            exquisite dining options, and serene event spaces — all in a
            safe, clean, and welcoming environment. Your comfort and well-being
            are always our top priority.
          </p>
          <button className="learn-more-btn">LEARN MORE</button>
        </div>
        <div className="hilltop" style={{ backgroundImage: `url(${Img8})` }}
          aria-hidden="true"
        />
      </section>

      {/* 
      <section className='about-container'>
        <h1>Welcome to De-Hilltop Apartments and Hotel</h1>
        <p>"Nestled in the heart of Okpanam Asaba, De-Hilltop Apartments and Hotel offers a seamless blend<br />of modern elegance, world-class comfort, and unmatched hospitality. From our tastefully<br /> designed rooms to our exclusive amenities, every detail is crafted to give you an unforgettable stay." <a href="">...read more</a></p>
      </section> */}

    </>

  );
};

export default Detail;
