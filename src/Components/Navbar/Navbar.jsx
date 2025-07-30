import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ simple }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // close menu after clicking link
    }
  };

  return (
    <nav className='navbar container'>
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
            <li onClick={() => handleScrollTo('why-choose-us')}>About Us</li>
            <li onClick={() => handleScrollTo('recovery-services')}>Recovery Services</li>
            <li onClick={() => handleScrollTo('faq-section')}>FAQ?</li>
            <li onClick={() => handleScrollTo('wallets-section')}>Wallets</li>
            <li onClick={() => handleScrollTo('steps-section')}>Steps</li>
            <li>
              <button className="btn" onClick={() => navigate('/contact')}>Contact Us</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
