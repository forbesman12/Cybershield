import React, { useEffect, useState } from 'react';
import './SuccessPopup.css';

const SuccessPopup = ({ 
  isVisible, 
  onClose, 
  message = 'Booking Successful!',
  autoCloseDelay = 3000 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      
      // Auto-close the popup after the specified delay
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoCloseDelay, onClose]); // Added onClose to dependencies

  const handleClose = () => {
    setIsAnimating(false);
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className={`popup-container ${isAnimating ? 'popup-enter' : 'popup-exit'}`}>
        <div className="popup-content">
          {/* Success Icon */}
          <div className="success-icon">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark-check"
                fill="none"
                d="m14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h2 className="success-title">{message}</h2>
          <p className="success-subtitle">
            You will be redirected to the confirmation page shortly...
          </p>

          {/* Close Button */}
          <button 
            className="close-button"
            onClick={handleClose}
            aria-label="Close popup"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
