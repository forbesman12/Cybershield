import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingSuccess.css';

const BookingSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  const {
    message = "Booking created successfully! We've emailed your booking details. Next, you'll receive payment instructions. After you pay, our team will verify the transaction and email you an update.",
    bookingReference = '',
    instructions = null
  } = state || {};

  useEffect(() => {
    // Animate content appearance
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAccessBooking = () => {
    navigate('/booking-access');
  };

  const copyBookingReference = async () => {
    if (bookingReference) {
      try {
        await navigator.clipboard.writeText(bookingReference);
        // Could add a toast notification here
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  return (
    <div className="booking-success-wrapper">
      {/* Animated Background */}
      <div className="success-bg-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="success-container">
        <div className={`success-card ${showContent ? 'animate-in' : ''}`}>
          {/* Premium Success Icon */}
          <div className="success-icon-wrapper">
            <div className="success-pulse">
              <div className="success-icon">
                <svg className="checkmark" viewBox="0 0 52 52">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                  <path className="checkmark-check" fill="none" d="m14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Header Section */}
          <div className="success-header">
            <h1 className="success-title">
              <span className="title-gradient">Booking Confirmed!</span>
            </h1>
            <p className="success-subtitle">{message}</p>
          </div>

          {/* Booking Reference Card */}
          {bookingReference && (
            <div className="reference-card" onClick={copyBookingReference}>
              <div className="reference-header">
                <span className="reference-icon">🎫</span>
                <h3>Your Booking Reference</h3>
                <span className="copy-hint">Click to copy</span>
              </div>
              <div className="reference-number">
                <span className="reference-text">{bookingReference}</span>
                <div className="copy-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <p className="reference-note">
                💡 Save this reference - you'll need it for booking inquiries
              </p>
            </div>
          )}

          {/* Next Steps Section */}
          {instructions && (
            <div className="steps-card">
              <div className="steps-header">
                <span className="steps-emoji">{instructions.title.split(' ')[0]}</span>
                <h3>{instructions.title.split(' ').slice(1).join(' ')}</h3>
              </div>
              <div className="steps-list">
                {instructions.steps.map((step, index) => (
                  <div key={index} className="step-item">
                    <div className="step-number">
                      <span>{index + 1}</span>
                    </div>
                    <div className="step-content">
                      <p>{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              onClick={handleAccessBooking}
              className="btn btn-primary"
            >
              <span className="btn-icon">🔐</span>
              <span>Access My Booking</span>
              <div className="btn-shimmer"></div>
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="btn btn-secondary"
            >
              <span className="btn-icon">🏨</span>
              <span>Back to Home</span>
            </button>
          </div>

          {/* Support Section */}
          <div className="support-section">
            <div className="support-header">
              <span className="support-icon">💬</span>
              <h4>Need assistance?</h4>
            </div>
            <p className="support-text">
              Our team is here to help with any questions or international booking support.
            </p>
            <div className="contact-methods">
              <a href="tel:+2348058501777" className="contact-item phone">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <span className="contact-label">Call us</span>
                  <span className="contact-value">+234 805 850 1777</span>
                </div>
              </a>
              
              <a href="mailto:infosupportdehilltophotel@gmail.com" className="contact-item email">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <span className="contact-label">Email us</span>
                  <span className="contact-value">Support team</span>
                </div>
              </a>
            </div>
            <div className="support-tip">
              <span className="tip-icon">💡</span>
              <span>Pro tip: Have your booking reference ready for faster assistance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
