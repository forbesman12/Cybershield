import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ simple }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // close menu after clicking link
    }
  };

  return (
    <nav className={`navbar container ${scrolled ? 'scrolled' : ''}`}>
      <img
        src={logo}
        alt="Logo"
        className='logo'
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      />

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`${menuOpen ? 'open' : ''}`}>

        {simple ? (
          <li>
            <button className="btn" onClick={() => navigate('/')}>Home</button>
          </li>
        ) : (
          <>
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/about')}>About Us</li>
            <li onClick={() => navigate('/contact')}>Contact</li>
            <li onClick={() => navigate('/rooms')}>Rooms</li>
            <li onClick={() => navigate('/gallery')}>Gallery</li>
            <li>
              <button className="btn" onClick={() => navigate('/contact')}>Book Now</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
