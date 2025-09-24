import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookingConfirmation.css';
import Navbar from '../Homepage/Navbar/Navbar';

const BookingConfirmation = () => {
  const [paymentFile, setPaymentFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const fileInputRef = useRef(null);

  const { state } = useLocation();
  const navigate = useNavigate();

  // Extract booking details from location state
  const {
    // roomId = state?.roomId || '', // Unused variable
    roomName = state?.roomName || 'Deluxe Room',
    price = state?.price || '₦150,000 / night', // Keep as string for display
    totalAmount = state?.totalAmount || 0, // Use the calculated total amount
    name = state?.name || 'John',
    surname = state?.surname || 'Doe',
    email = state?.email || 'john.doe@example.com',
    // address = state?.address || '123 Main St, City', // Unused variable
    checkIn = state?.checkIn || new Date().toISOString().split('T')[0],
    checkOut = state?.checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    adults = state?.adults || 2,
    children = state?.children || 0,
  } = state || {};

  // Calculate nights and format total price
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = checkOutDate && checkInDate
    ? Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
    : 1;

  // Use the totalAmount passed from the booking form, formatted for display
  const formattedTotalAmount = totalAmount ? `₦${totalAmount.toLocaleString()}` : '₦300,000';

  // Extract numeric price per night for display
  const getPricePerNight = () => {
    if (typeof price === 'string') {
      const match = price.match(/₦?([0-9,]+)/);
      if (match) {
        return `₦${parseInt(match[1].replace(/,/g, '')).toLocaleString()}`;
      }
    }
    return totalAmount && nights ? `₦${Math.round(totalAmount / nights).toLocaleString()}` : '₦150,000';
  };

  // Generate booking reference
  React.useEffect(() => {
    const generateReference = () => {
      const timestamp = Date.now().toString().slice(-6);
      const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
      return `BK${timestamp}${randomStr}`;
    };

    if (!bookingReference) {
      setBookingReference(generateReference());
    }
  }, [bookingReference]); // Added bookingReference to dependencies

  // Static bank account details
  const bankDetails = {
    bank: 'Example Bank',
    accountNumber: '1234567890',
    routing: '021000021',
    accountName: 'CyberTrace Hotel Ltd',
    instructions: 'Include reference in payment description'
  };

  // File validation
  const validateFile = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];

    if (file.size > maxSize) {
      return { valid: false, error: 'File size must be less than 5MB' };
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Only images (JPEG, PNG, GIF) and PDF files are allowed' };
    }

    return { valid: true };
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validation = validateFile(file);
      if (validation.valid) {
        setPaymentFile(file);
        setUploadStatus('');
      } else {
        alert(validation.error);
        e.target.value = ''; // Reset file input
      }
    }
  };

  // Handle file upload
  const handleUploadPaymentProof = async () => {
    if (!paymentFile) {
      alert('Please select a file first.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Uploading...');

    try {
      const formData = new FormData();
      formData.append('paymentProof', paymentFile);
      formData.append('bookingReference', bookingReference);
      formData.append('totalAmount', totalAmount);
      formData.append('guestName', `${name} ${surname}`);
      formData.append('guestEmail', email);

      const response = await axios.post('/api/payment-proof', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setUploadStatus('Payment proof uploaded successfully! We will review and confirm your booking within 2 hours.');
        setTimeout(() => {
          navigate('/booking-success', {
            state: {
              bookingReference,
              message: 'Payment proof uploaded successfully'
            }
          });
        }, 3000);
      } else {
        setUploadStatus('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('Upload failed. Please check your connection and try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Remove selected file
  const removeFile = () => {
    setPaymentFile(null);
    setUploadStatus('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ margin: '70px'}}>
        <div style={{ padding: '1.5rem', maxWidth: '100%',}}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem', color: '#1f2937' }}>
            Booking Confirmation
          </h1>

          {/* Booking Summary Section */}
          <div className="flex" style={{ display: 'flex', justifyContent: "space-between", gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{flex: 1, backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                Booking Summary
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontWeight: '500', color: '#4b5563' }}>Room Type:</span>
                    <span style={{ color: '#1f2937' }}>{roomName}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontWeight: '500', color: '#4b5563' }}>Check-in:</span>
                    <span style={{ color: '#1f2937' }}>{new Date(checkIn).toLocaleDateString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontWeight: '500', color: '#4b5563' }}>Check-out:</span>
                    <span style={{ color: '#1f2937' }}>{new Date(checkOut).toLocaleDateString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontWeight: '500', color: '#4b5563' }}>Nights:</span>
                    <span style={{ color: '#1f2937' }}>{nights}</span>
                  </div>
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontWeight: '500', color: '#4b5563' }}>Adults:</span>
                    <span style={{ color: '#1f2937' }}>{adults}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontWeight: '500', color: '#4b5563' }}>Children:</span>
                    <span style={{ color: '#1f2937' }}>{children}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontWeight: '500', color: '#4b5563' }}>Guest Name:</span>
                    <span style={{ color: '#1f2937' }}>{`${name} ${surname}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontWeight: '500', color: '#4b5563' }}>Email:</span>
                    <span style={{ color: '#1f2937', fontSize: '0.875rem' }}>{email}</span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>Total Amount:</span>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>({nights} nights × {getPricePerNight()} per night)</p>
                  </div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>{formattedTotalAmount}</span>
                </div>
                <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#eff6ff', borderRadius: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', color: '#1e40af' }}>Booking Reference:</span>
                    <span style={{ fontSize: '1.125rem', fontFamily: 'monospace', backgroundColor: '#dbeafe', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', color: '#1e40af' }}>
                      {bookingReference}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Account Details Section */}
            <div style={{flex:1, backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                Bank Transfer Details
              </h2>
              <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4b5563' }}>Bank Name:</span>
                      <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>{bankDetails.bank}</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4b5563' }}>Account Name:</span>
                      <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>{bankDetails.accountName}</span>
                    </div>
                  </div>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4b5563' }}>Account Number:</span>
                      <span style={{ fontSize: '1.125rem', fontFamily: 'monospace', fontWeight: '600', color: '#1f2937' }}>{bankDetails.accountNumber}</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4b5563' }}>Routing Number:</span>
                      <span style={{ fontSize: '1.125rem', fontFamily: 'monospace', fontWeight: '600', color: '#1f2937' }}>{bankDetails.routing}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
             </div>
            {/* Important Instructions */}
            <div style={{ backgroundColor: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ marginLeft: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#991b1b' }}>⚠️ IMPORTANT PAYMENT INSTRUCTIONS</h3>
                  <div style={{ marginTop: '0.5rem', color: '#b91c1c' }}>
                    <p style={{ fontWeight: '500', marginBottom: '0.5rem' }}>When making your bank transfer, you MUST:</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginBottom: '0.25rem' }}>
                      <li><strong>Include your booking reference ({bookingReference}) in the payment description/memo field</strong></li>
                      <li>Transfer the exact amount: <strong>{formattedTotalAmount}</strong></li>
                      <li>Upload proof of payment below after completing the transfer</li>
                    </ul>
                    <p style={{ marginTop: '0.75rem', fontSize: '0.875rem' }}><strong>Note:</strong> Payments without the correct reference may cause delays in processing your booking.</p>
                  </div>
                </div>
              </div>
            </div>
         

          {/* Payment Proof Upload Section */}
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
              Upload Proof of Payment
            </h2>

            <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '0.5rem' }}>
              <h3 style={{ fontWeight: '600', color: '#1e40af', marginBottom: '0.5rem' }}>📋 Upload Requirements:</h3>
              <ul style={{ fontSize: '0.875rem', color: '#1e40af', marginBottom: '0.25rem' }}>
                <li>File types: Images (JPEG, PNG, GIF) or PDF documents only</li>
                <li>Maximum file size: 5MB</li>
                <li>Upload a clear screenshot or photo of your bank transfer receipt</li>
                <li>Ensure the booking reference <strong>({bookingReference})</strong> is visible in the transfer details</li>
              </ul>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Select Payment Proof File:
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  style={{
                    display: 'block',
                    width: '100%',
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                  }}
                  className="file-input" // Keep class for any custom CSS in BookingConfirmation.css
                />
              </div>

              {paymentFile && (
                <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Selected file:</p>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{paymentFile.name}</p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Size: {(paymentFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button
                      onClick={removeFile}
                      style={{ color: '#dc2626', fontSize: '0.875rem', fontWeight: '500' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleUploadPaymentProof}
                disabled={!paymentFile || isUploading}
                style={{
                  width: '100%',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  // Removed transition: 'background-color 0.2s',
                  ...(paymentFile && !isUploading
                    ? { backgroundColor: '#16a34a', color: '#ffffff', cursor: 'pointer' }
                    : { backgroundColor: '#d1d5db', color: '#6b7280', cursor: 'not-allowed' })
                }}
              >
                {isUploading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg style={{ /* Removed animation: 'spin 1s linear infinite', */ marginRight: '0.75rem', height: '1.25rem', width: '1.25rem', color: '#ffffff' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  'Upload Payment Proof'
                )}
              </button>

              {uploadStatus && (
                <div style={{
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  border: `1px solid ${uploadStatus.includes('successfully') ? '#dcfce7' : uploadStatus.includes('failed') || uploadStatus.includes('error') ? '#fee2e2' : '#dbeafe'}`,
                  backgroundColor: uploadStatus.includes('successfully') ? '#f0fdf4' : uploadStatus.includes('failed') || uploadStatus.includes('error') ? '#fef2f2' : '#eff6ff',
                  color: uploadStatus.includes('successfully') ? '#166534' : uploadStatus.includes('failed') || uploadStatus.includes('error') ? '#b91c1c' : '#1e40af'
                }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>{uploadStatus}</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Instructions */}
          <div style={{ backgroundColor: '#fefce8', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#854d0e', marginBottom: '0.75rem' }}>📞 Need Help?</h3>
            <div style={{ color: '#713f12', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              <p>If you encounter any issues with your payment or upload:</p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginLeft: '1rem' }}>
                <li>Email us at: <strong>bookings@cybertrace.com</strong></li>
                <li>Call us at: <strong>+1 (555) 123-4567</strong></li>
                <li>Include your booking reference: <strong>{bookingReference}</strong></li>
              </ul>
              <p style={{ marginTop: '0.75rem' }}><strong>Processing Time:</strong> We will review your payment proof within 24 hours and send you a confirmation email once verified.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingConfirmation;