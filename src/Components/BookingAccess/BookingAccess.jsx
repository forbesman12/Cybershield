import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './BookingAccess.css';

const BookingAccess = () => {
  const [accessMode, setAccessMode] = useState('token'); // 'token' or 'reference'
  const [bookingReference, setBookingReference] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check for token in URL parameters
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // Automatically authenticate with token from email link
      authenticateWithToken(token);
    }
  }, [searchParams, navigate]); // Added navigate to dependencies

  // Authenticate using token from email link
  const authenticateWithToken = async (token) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Store token in localStorage for API calls
      localStorage.setItem('bookingToken', token);
      
      // Decode token to get booking ID (without verification - just for routing)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      
      // Navigate to booking confirmation with token
      navigate(`/booking-confirmation/${payload.bookingId}`, {
        state: {
          authenticated: true,
          token: token,
          bookingId: payload.bookingId,
          guestName: payload.guestName,
          email: payload.email,
          totalAmount: payload.totalAmount
        }
      });
      
    } catch (error) {
      console.error('Token authentication error:', error);
      setError('Invalid or expired booking link. Please use the booking reference method below.');
      setAccessMode('reference');
    } finally {
      setIsLoading(false);
    }
  };

  // Access booking using reference and email
  const handleReferenceAccess = async (e) => {
    e.preventDefault();
    
    if (!bookingReference.trim() || !email.trim()) {
      setError('Please enter both booking reference and email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const apiUrl = process?.env?.REACT_APP_API_URL || 'http://localhost:4001';
      const response = await axios.post(`${apiUrl}/api/bookings/access`, {
        bookingReference: bookingReference.trim(),
        email: email.trim()
      });

      if (response.data.success) {
        const { token, bookingId, booking } = response.data.data;
        
        // Store token for API calls
        localStorage.setItem('bookingToken', token);
        
        // Navigate to booking confirmation
        navigate(`/booking-confirmation/${bookingId}`, {
          state: {
            authenticated: true,
            token: token,
            bookingId: bookingId,
            booking: booking,
            fromReference: true
          }
        });
      }
    } catch (error) {
      console.error('Reference access error:', error);
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Unable to access booking. Please check your booking reference and email.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="booking-access-container">
      <div className="container mx-auto p-6 max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Your Booking</h1>
            <p className="text-gray-600">Complete your payment or check booking status</p>
          </div>

          {isLoading && (
            <div className="text-center mb-6">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-blue-600">Processing...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!isLoading && (
            <>
              {/* Access Mode Tabs */}
              <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                <button
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    accessMode === 'token' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setAccessMode('token')}
                >
                  📧 Email Link
                </button>
                <button
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    accessMode === 'reference' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setAccessMode('reference')}
                >
                  🔑 Manual Access
                </button>
              </div>

              {accessMode === 'token' && (
                <div className="text-center py-8">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">📧 Access via Email Link</h3>
                    <p className="text-blue-700 mb-4">
                      Click the "Upload Payment Proof" button in your booking confirmation email to access your booking automatically.
                    </p>
                    <div className="text-sm text-blue-600">
                      <p>✅ Secure one-click access</p>
                      <p>✅ No manual entry required</p>
                      <p>✅ Direct link to payment upload</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Don't have the email link?</p>
                    <button
                      onClick={() => setAccessMode('reference')}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm underline"
                    >
                      Use booking reference instead
                    </button>
                  </div>
                </div>
              )}

              {accessMode === 'reference' && (
                <form onSubmit={handleReferenceAccess} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booking Reference
                    </label>
                    <input
                      type="text"
                      value={bookingReference}
                      onChange={(e) => setBookingReference(e.target.value.toUpperCase())}
                      placeholder="BK123456ABCD"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Found in your booking confirmation email
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Email address used when making the booking
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-md font-semibold transition-colors ${
                      isLoading
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isLoading ? 'Accessing...' : '🔓 Access My Booking'}
                  </button>
                </form>
              )}
            </>
          )}

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">📞 Need Help?</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p>• Check your email for the booking confirmation</p>
              <p>• Booking reference starts with "BK" followed by numbers and letters</p>
              <p>• Contact us: <a href="mailto:bookings@cybertrace.com" className="text-blue-600 hover:underline">bookings@cybertrace.com</a></p>
              <p>• Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingAccess;
