import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookingApi } from '../../services/bookingApi';
import { authUtils } from '../../services/paymentApi';
import PaymentStatus from '../PaymentStatus/PaymentStatus';
import './BookingConfirmationWithPayment.css';

const BookingConfirmationWithPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [showPaymentStatus, setShowPaymentStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get booking data from URL params or location state
  const searchParams = new URLSearchParams(location.search);
  const bookingId = searchParams.get('bookingId') || location.state?.bookingId;

  useEffect(() => {
    if (bookingId) {
      fetchBookingData();
    } else if (location.state?.bookingData) {
      // Use booking data passed from form submission
      setBookingData(location.state.bookingData);
      setLoading(false);
      
      // Generate guest token for payment proof upload
      if (location.state.bookingData.email) {
        authUtils.generateGuestToken(
          location.state.bookingData.email, 
          location.state.bookingData._id
        );
      }
    } else {
      setError('No booking information found');
      setLoading(false);
    }
  }, [bookingId, location.state]);

  const fetchBookingData = async () => {
    try {
      setLoading(true);
      const response = await bookingApi.getBookingById(bookingId);
      setBookingData(response.data);
      
      // Generate guest token for payment proof upload if needed
      if (response.data.email && !authUtils.isAuthenticated()) {
        authUtils.generateGuestToken(response.data.email, response.data._id);
      }
    } catch (error) {
      console.error('Error fetching booking:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed':
        return '✅';
      case 'Pending Payment':
        return '⏳';
      case 'Payment Failed':
        return '❌';
      case 'Cancelled':
        return '🚫';
      default:
        return '📋';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return '#10b981';
      case 'Pending Payment':
        return '#f59e0b';
      case 'Payment Failed':
        return '#ef4444';
      case 'Cancelled':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const handlePaymentAction = () => {
    setShowPaymentStatus(true);
  };

  if (loading) {
    return (
      <div className="booking-confirmation-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !bookingData) {
    return (
      <div className="booking-confirmation-container">
        <div className="error-state">
          <h2>❌ Error</h2>
          <p>{error || 'Booking not found'}</p>
          <button onClick={() => navigate('/')} className="home-button">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="booking-confirmation-container">
        <div className="confirmation-card">
          {/* Header */}
          <div className="confirmation-header">
            <div className="success-icon">🎉</div>
            <h1>Booking Confirmed!</h1>
            <p>Thank you for choosing our hotel. Your reservation has been created.</p>
          </div>

          {/* Booking Details */}
          <div className="booking-summary">
            <div className="booking-info-section">
              <h2>📋 Booking Details</h2>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Booking ID:</label>
                  <span className="booking-id">{bookingData._id}</span>
                </div>
                <div className="detail-item">
                  <label>Room:</label>
                  <span>{bookingData.roomName || `Room ${bookingData.roomId}`}</span>
                </div>
                <div className="detail-item">
                  <label>Guest:</label>
                  <span>{bookingData.name} {bookingData.surname}</span>
                </div>
                <div className="detail-item">
                  <label>Email:</label>
                  <span>{bookingData.email}</span>
                </div>
                <div className="detail-item">
                  <label>Check-in:</label>
                  <span>{new Date(bookingData.checkIn).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <label>Check-out:</label>
                  <span>{new Date(bookingData.checkOut).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <label>Total Amount:</label>
                  <span className="amount">${bookingData.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div className="payment-status-section">
              <h2>💳 Payment Status</h2>
              <div className="status-display">
                <div 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(bookingData.status) }}
                >
                  <span className="status-icon">{getStatusIcon(bookingData.status)}</span>
                  <span className="status-text">{bookingData.status}</span>
                </div>
              </div>

              {/* Payment Actions based on status */}
              {bookingData.status === 'Pending Payment' && (
                <div className="payment-actions">
                  <div className="payment-notice">
                    <p><strong>⚡ Action Required:</strong> Please complete your payment to confirm your booking.</p>
                  </div>
                  <button 
                    onClick={handlePaymentAction}
                    className="payment-button primary"
                  >
                    💳 Complete Payment
                  </button>
                </div>
              )}

              {bookingData.status === 'Payment Failed' && (
                <div className="payment-actions">
                  <div className="payment-notice error">
                    <p><strong>⚠️ Payment Issue:</strong> There was a problem with your payment. Please try again.</p>
                  </div>
                  <button 
                    onClick={handlePaymentAction}
                    className="payment-button retry"
                  >
                    🔄 Retry Payment
                  </button>
                </div>
              )}

              {bookingData.status === 'Confirmed' && (
                <div className="payment-actions">
                  <div className="payment-notice success">
                    <p><strong>✅ Payment Complete:</strong> Your booking is fully confirmed!</p>
                  </div>
                  <button 
                    onClick={handlePaymentAction}
                    className="payment-button secondary"
                  >
                    📄 View Payment Details
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Important Information */}
          <div className="important-info">
            <h3>📋 Important Information</h3>
            <ul>
              <li><strong>Check-in time:</strong> 3:00 PM</li>
              <li><strong>Check-out time:</strong> 11:00 AM</li>
              <li><strong>Cancellation:</strong> Free cancellation up to 24 hours before check-in</li>
              <li><strong>ID Required:</strong> Please bring a valid government-issued ID</li>
              <li><strong>Contact:</strong> Call us at +1-555-123-4567 for any questions</li>
            </ul>
          </div>

          {/* Next Steps */}
          {bookingData.status === 'Pending Payment' && (
            <div className="next-steps">
              <h3>📝 Next Steps</h3>
              <ol>
                <li>Complete payment using the button above</li>
                <li>Upload your payment proof for verification</li>
                <li>Receive email confirmation within 24-48 hours</li>
                <li>Prepare for your stay!</li>
              </ol>
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              onClick={() => navigate('/')} 
              className="home-button"
            >
              🏠 Return Home
            </button>
            <button 
              onClick={() => navigate('/rooms')} 
              className="rooms-button"
            >
              🏨 View More Rooms
            </button>
            {bookingData.status !== 'Cancelled' && (
              <button 
                onClick={handlePaymentAction}
                className="manage-button"
              >
                ⚙️ Manage Booking
              </button>
            )}
          </div>

          {/* Security Notice */}
          <div className="security-notice">
            <p>
              🔒 <strong>Secure & Private:</strong> Your booking information is encrypted and secure. 
              We will never share your personal details with third parties.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Status Modal */}
      {showPaymentStatus && (
        <PaymentStatus
          bookingId={bookingData._id}
          onClose={() => setShowPaymentStatus(false)}
        />
      )}
    </>
  );
};

export default BookingConfirmationWithPayment;
