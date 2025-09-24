import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ simple }) => {
  const navigate = useNavigate();

  // State to track if mobile menu (sidebar) is open
  const [menuOpen, setMenuOpen] = useState(false);

  // State to track if user has scrolled (used for navbar background change)
  const [scrolled, setScrolled] = useState(false);

  // Add/remove scroll listener to update "scrolled" state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function for smooth scroll to section (optional, if IDs exist on page)
  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // close menu after clicking link
    }
  };

  return (
    <>
      {/* Dark overlay behind sidebar (clicking it closes the menu) */}
      <div
        className={`sidebar-overlay ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Main Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        
        {/* Logo + Text */}
        <div className="imlogo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={logo}
            alt="Logo"
            className='logo'
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
          <p>De-Hilltop Hotel and Apartments</p>
        </div>

        {/* Hamburger / Close icon (mobile & tablet only) */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Nav Links */}
        <ul className={`${menuOpen ? 'open' : ''}`}>
          {simple ? (
            <li>
              <button
                className="btn"
                onClick={() => {
                  navigate('/');
                  setMenuOpen(false); // close after navigation
                }}
              >
                Home
              </button>
            </li>
          ) : (
            <>
              <li onClick={() => { navigate('/'); setMenuOpen(false); }}>Home</li>
              <li onClick={() => { navigate('/about'); setMenuOpen(false); }}>About Us</li>
              <li onClick={() => { navigate('/contact'); setMenuOpen(false); }}>Contact</li>
              <li onClick={() => { navigate('/rooms'); setMenuOpen(false); }}>Rooms</li>
              <li onClick={() => { navigate('/gallery'); setMenuOpen(false); }}>Gallery</li>
              <li>
                <button
                  className="bttn"
                  onClick={() => {
                    navigate('/rooms');
                    setMenuOpen(false); // close after clicking
                  }}
                >
                  Book Now
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
