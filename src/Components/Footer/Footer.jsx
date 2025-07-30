import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaTwitter, FaFacebookF, FaTelegram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3>Crypto Recovers</h3>
          <p>&copy; {new Date().getFullYear()} Crypto Recovers. All rights reserved.</p>
        </div>

        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Services</a>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-socials">
          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a
            href="https://t.me/chain_sentinelRecovery"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTelegram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
