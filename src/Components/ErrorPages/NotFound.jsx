import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Homepage/Navbar/Navbar';
import Footer from '../Homepage/Footer/Footer';
import SEOHead from '../SEO/SEOHead';
import './NotFound.css';

const NotFound = () => {
  return (
    <>
      <SEOHead 
        title="Page Not Found - De-Hilltop Hotel"
        description="The page you're looking for doesn't exist. Return to De-Hilltop Hotel homepage to find what you need."
        noIndex={true}
      />
      <Navbar />
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="not-found-illustration">
            <div className="error-code">404</div>
            <div className="error-icon">🏨</div>
          </div>
          <h1>Oops! Page Not Found</h1>
          <p>
            The page you're looking for seems to have checked out. 
            Don't worry, our rooms are still available!
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
            <Link to="/rooms" className="btn-secondary">
              View Rooms
            </Link>
          </div>
          <div className="helpful-links">
            <h3>Looking for something specific?</h3>
            <ul>
              <li><Link to="/rooms">Browse our rooms</Link></li>
              <li><Link to="/about">Learn about us</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
              <li><Link to="/gallery">View our gallery</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
