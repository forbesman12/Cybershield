import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaPaperPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-grid">

        {/* Logo & About */}
        <div className="footer-section">
          <h2 className="footer-logo">De-Hill Top Apartment</h2>
          <p className="footer-text">
            Experience unparalleled comfort and elegance in our private luxury suites,
            designed for the discerning traveler.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/rooms">Rooms</Link></li>
            <li><Link to="/dining">Dining</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact</h3>
          <p>📍 Ofili Drive, Last Redeem Bustop <br />Off Chief Ukah Way, Okpanam Delta State</p>
          <p>📞 +234 9033 142 302</p>
          <p>✉ contact@luxestay.com</p>
        </div>

        {/* Email Signup */}
        <div className="footer-section">
          <h3 className="footer-heading">Sign Up for Exclusive Offers</h3>
          <div className="email-input">
            <input
              type="email"
              placeholder="Enter your email"
              className="email-input-field"
            />
            <FaPaperPlane className="email-icon" />
          </div>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="footer-socials">
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <a href="https://wa.me/+2348033087666?text=Hello%20I%20need%20help"
          class="whatsapp-float" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp" width="35" />
          <span>Chat with us</span>
        </a>

        © {new Date().getFullYear()} De-HilltopHotel&Apartments. All Rights Reserved.
      </div>
    </footer>
  );
}
export default Footer;
