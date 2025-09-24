import React, { useEffect, useRef } from 'react';
import './detail.css';
import { useNavigate } from 'react-router-dom';
import { FaCalendarCheck, FaWifi, FaTags, FaBed } from "react-icons/fa";
import Img8 from '../../../assets/IMG_0107.jpg';

const Detail = () => {
  const whyChooseUsRef = useRef(null);
  const aboutSectionRef = useRef(null);
 const navigate = useNavigate();

  useEffect(() => {
    // Observer for #why-choose-us
    const whyChooseUs = whyChooseUsRef.current;
    const tags = whyChooseUs?.querySelectorAll('.tag');

    const whyChooseUsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          whyChooseUs.classList.add('visible');
          tags.forEach(tag => tag.classList.add('visible'));
        } else {
          whyChooseUs.classList.remove('visible');
          tags.forEach(tag => tag.classList.remove('visible'));
        }
      },
      { threshold: 0.2 }
    );

    if (whyChooseUs) whyChooseUsObserver.observe(whyChooseUs);

    // Observer for about-section
    const aboutSection = aboutSectionRef.current;
    const aboutContent = aboutSection?.querySelector('.about-content');
    const hilltop = aboutSection?.querySelector('.hilltop');

    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          aboutSection.classList.add('visible');
          aboutContent.classList.add('visible');
          hilltop.classList.add('visible');
        } else {
          aboutSection.classList.remove('visible');
          aboutContent.classList.remove('visible');
          hilltop.classList.remove('visible');
        }
      },
      { threshold: 0.2 }
    );

    if (aboutSection) aboutObserver.observe(aboutSection);

    return () => {
      if (whyChooseUs) whyChooseUsObserver.disconnect();
      if (aboutSection) aboutObserver.disconnect();
    };
  }, []);

  return (
    <>
      <section id='why-choose-us' className="tags" ref={whyChooseUsRef}>
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
            Experience premium comfort at<br />a price that fits your budget.
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

      <section className="about-section" ref={aboutSectionRef}>
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
          <button className="bttn" onClick={() => { navigate('/about'); setMenuOpen(false); }}>Learn More</button>
        </div>
        <div className="hilltop" style={{ backgroundImage: `url(${Img8})` }} aria-hidden="true" />
      </section>
    </>
  );
};

export default Detail;