import React, { useState, useEffect } from 'react';
import { paymentApi, authUtils, PAYMENT_STATUS, VERIFICATION_STATUS } from '../../services/paymentApi';
import { bookingApi } from '../../services/bookingApi';
import PaymentProofUpload from '../PaymentProof/PaymentProofUpload';
import './PaymentStatus.css';

const PaymentStatus = ({ bookingId, onClose }) => {
  const [bookingData, setBookingData] = useState(null);
  const [proofStatus, setProofStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    if (bookingId) {
      fetchBookingData();
    }
  }, [bookingId]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchBookingData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch booking information
      const bookingResponse = await bookingApi.getBookingById(bookingId);
      setBookingData(bookingResponse.data);

      // Try to fetch proof status if user is authenticated
      if (authUtils.isAuthenticated()) {
        try {
          const proofResponse = await paymentApi.getPaymentProofStatus(bookingId);
          setProofStatus(proofResponse.data);
        } catch {
          // No proof uploaded yet, which is fine
          console.log('No payment proof found');
        }
      }
    } catch (error) {
      console.error('Error fetching booking data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (uploadData) => {
    setProofStatus(uploadData);
    setShowUploadModal(false);
    // Refresh booking data
    fetchBookingData();
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case PAYMENT_STATUS.CONFIRMED:
        return '#10b981';
      case PAYMENT_STATUS.PENDING_PAYMENT:
        return '#f59e0b';
      case PAYMENT_STATUS.PAYMENT_FAILED:
        return '#ef4444';
      case PAYMENT_STATUS.CANCELLED:
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getVerificationStatusColor = (status) => {
    switch (status) {
      case VERIFICATION_STATUS.VERIFIED:
        return '#10b981';
      case VERIFICATION_STATUS.PENDING:
        return '#f59e0b';
      case VERIFICATION_STATUS.REJECTED:
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const canUploadProof = () => {
    if (!bookingData) return false;
    
    const allowedStatuses = [PAYMENT_STATUS.PENDING_PAYMENT, PAYMENT_STATUS.PAYMENT_FAILED];
    return allowedStatuses.includes(bookingData.status) && !proofStatus;
  };

  const needsProofReUpload = () => {
    return proofStatus?.verificationStatus === VERIFICATION_STATUS.REJECTED;
  };

  if (loading) {
    return (
      <div className="payment-status-modal">
        <div className="status-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading payment status...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-status-modal">
        <div className="status-container">
          <div className="error-state">
            <h3>Error</h3>
            <p>{error}</p>
            <button onClick={onClose} className="close-button-primary">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="payment-status-modal">
        <div className="status-container">
          <div className="error-state">
            <h3>Booking Not Found</h3>
            <p>The requested booking could not be found.</p>
            <button onClick={onClose} className="close-button-primary">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="payment-status-modal">
        <div className="status-container">
          <div className="status-header">
            <h3>Payment Status</h3>
            <button onClick={onClose} className="close-button">×</button>
          </div>

          <div className="booking-summary">
            <div className="booking-info">
              <h4>Booking Details</h4>
              <div className="booking-details">
                <p><strong>Booking ID:</strong> {bookingData._id}</p>
                <p><strong>Room:</strong> {bookingData.roomName || `Room ${bookingData.roomId}`}</p>
                <p><strong>Guest:</strong> {bookingData.name} {bookingData.surname}</p>
                <p><strong>Check-in:</strong> {new Date(bookingData.checkIn).toLocaleDateString()}</p>
                <p><strong>Check-out:</strong> {new Date(bookingData.checkOut).toLocaleDateString()}</p>
                <p><strong>Total Amount:</strong> ${bookingData.totalAmount}</p>
              </div>
            </div>

            <div className="payment-status-info">
              <div className="status-badge-container">
                <div 
                  className="status-badge"
                  style={{ backgroundColor: getPaymentStatusColor(bookingData.status) }}
                >
                  {bookingData.status}
                </div>
              </div>

              {/* Payment Instructions based on status */}
              {bookingData.status === PAYMENT_STATUS.PENDING_PAYMENT && (
                <div className="payment-instructions">
                  <h5>📋 Next Steps:</h5>
                  <ol>
                    <li>Make payment using your preferred method</li>
                    <li>Upload payment proof using the button below</li>
                    <li>Wait for verification (24-48 hours)</li>
                  </ol>
                </div>
              )}

              {bookingData.status === PAYMENT_STATUS.CONFIRMED && (
                <div className="confirmation-message">
                  <div className="success-icon">✅</div>
                  <h5>Payment Confirmed!</h5>
                  <p>Your booking is confirmed. We look forward to welcoming you!</p>
                </div>
              )}

              {bookingData.status === PAYMENT_STATUS.PAYMENT_FAILED && (
                <div className="failed-message">
                  <div className="error-icon">❌</div>
                  <h5>Payment Failed</h5>
                  <p>Please try uploading your payment proof again or contact support.</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Proof Section */}
          {proofStatus && (
            <div className="proof-section">
              <h4>Payment Proof Status</h4>
              <div className="proof-status-card">
                <div className="proof-header">
                  <span 
                    className="verification-badge"
                    style={{ backgroundColor: getVerificationStatusColor(proofStatus.verificationStatus) }}
                  >
                    {proofStatus.verificationStatus.toUpperCase()}
                  </span>
                  <span className="upload-date">
                    Uploaded: {new Date(proofStatus.uploadedAt).toLocaleDateString()}
                  </span>
                </div>

                {proofStatus.verificationStatus === VERIFICATION_STATUS.PENDING && (
                  <div className="pending-message">
                    <p>🕐 Your payment proof is being reviewed by our team. You'll receive an email confirmation once verified.</p>
                  </div>
                )}

                {proofStatus.verificationStatus === VERIFICATION_STATUS.VERIFIED && (
                  <div className="verified-message">
                    <p>✅ Your payment has been verified! Your booking is now confirmed.</p>
                  </div>
                )}

                {proofStatus.verificationStatus === VERIFICATION_STATUS.REJECTED && (
                  <div className="rejected-message">
                    <p>❌ Your payment proof was rejected. Please upload a clearer image or contact support for assistance.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="status-actions">
            {(canUploadProof() || needsProofReUpload()) && (
              <button 
                onClick={() => setShowUploadModal(true)}
                className="upload-proof-button"
              >
                {needsProofReUpload() ? '🔄 Upload New Proof' : '📤 Upload Payment Proof'}
              </button>
            )}

            {bookingData.status === PAYMENT_STATUS.PENDING_PAYMENT && (
              <div className="payment-methods">
                <h5>💳 Payment Methods:</h5>
                <div className="payment-options">
                  <div className="payment-option">
                    <strong>Bank Transfer:</strong>
                    <p>Account: 1234567890<br/>
                    Bank: Example Bank<br/>
                    Reference: {bookingData._id}</p>
                  </div>
                  <div className="payment-option">
                    <strong>Online Payment:</strong>
                    <button 
                      className="stripe-pay-button"
                      onClick={() => {
                        // Integrate with Stripe payment
                        paymentApi.initiatePayment({
                          bookingId: bookingData._id,
                          amount: bookingData.totalAmount
                        }).then((response) => {
                          if (response.data?.url) {
                            window.open(response.data.url, '_blank');
                          }
                        }).catch((error) => {
                          console.error('Payment initiation failed:', error);
                        });
                      }}
                    >
                      💳 Pay with Card
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button onClick={onClose} className="close-button-secondary">
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Payment Proof Upload Modal */}
      {showUploadModal && (
        <PaymentProofUpload
          bookingData={{
            id: bookingData._id,
            totalAmount: bookingData.totalAmount,
            name: bookingData.name,
            surname: bookingData.surname,
            email: bookingData.email
          }}
          onUploadSuccess={handleUploadSuccess}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </>
  );
};

export default PaymentStatus;
