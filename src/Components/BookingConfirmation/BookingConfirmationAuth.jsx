import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './BookingConfirmation.css';

const BookingConfirmationAuth = () => {
  const [paymentFile, setPaymentFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingData, setBookingData] = useState(null);
  const fileInputRef = useRef(null);
  
  const { state } = useLocation();
  const navigate = useNavigate();
  const { bookingId } = useParams();

  // Check authentication on component mount
  useEffect(() => {
    checkAuthentication();
  }, [bookingId, state, navigate]); // Added dependencies

  const checkAuthentication = async () => {
    try {
      // Check if we have authentication from state or localStorage
      const token = state?.token || localStorage.getItem('bookingToken');
      
      if (!token) {
        setError('Authentication required. Please access your booking via the email link.');
        setIsLoading(false);
        return;
      }

      // Verify token is valid by making a test API call
      try {
        const apiUrl = process?.env?.REACT_APP_API_URL || 'http://localhost:4001';
        // eslint-disable-next-line no-unused-vars
        const response = await axios.get(
          `${apiUrl}/api/payments/proof/${bookingId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        // Token is valid, set up the booking data
        setIsAuthenticated(true);
        
        // Use booking data from state if available, otherwise extract from token
        if (state?.booking) {
          setBookingData(state.booking);
        } else if (state?.authenticated) {
          // Extract from state passed by BookingAccess
          setBookingData({
            roomName: state.roomName || 'Room',
            totalAmount: state.totalAmount || 0,
            guestName: state.guestName || 'Guest',
            email: state.email || '',
            checkIn: state.checkIn || new Date().toISOString(),
            checkOut: state.checkOut || new Date().toISOString()
          });
        } else {
          // Decode token to get basic info
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const payload = JSON.parse(window.atob(base64));
          
          setBookingData({
            totalAmount: payload.totalAmount,
            guestName: payload.guestName,
            email: payload.email
          });
        }
        
        // Generate booking reference
        const timestamp = Date.now().toString().slice(-6);
        const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
        setBookingReference(`BK${timestamp}${randomStr}`);
        
      } catch (apiError) {
        if (apiError.response?.status === 401) {
          setError('Your booking access has expired. Please use your booking reference to access again.');
          localStorage.removeItem('bookingToken');
        } else if (apiError.response?.status === 404) {
          // Payment proof not found is okay - means they haven't uploaded yet
          setIsAuthenticated(true);
          // Set booking data from state or token
          if (state?.booking) {
            setBookingData(state.booking);
          } else {
            const token = state?.token || localStorage.getItem('bookingToken');
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            
            setBookingData({
              totalAmount: payload.totalAmount,
              guestName: payload.guestName,
              email: payload.email
            });
          }
          
          const timestamp = Date.now().toString().slice(-6);
          const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
          setBookingReference(`BK${timestamp}${randomStr}`);
        } else {
          setError('Error accessing booking. Please try again.');
        }
      }
      
    } catch (error) {
      console.error('Authentication check error:', error);
      setError('Error checking authentication. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Extract booking details with fallbacks
  const {
    // roomId = state?.roomId || '', // Unused
    roomName = bookingData?.roomName || state?.roomName || 'Room',
    price = state?.price || '₦150,000 / night',
    totalAmount = bookingData?.totalAmount || state?.totalAmount || 0,
    name = bookingData?.guestName?.split(' ')[0] || state?.name || 'Guest',
    surname = bookingData?.guestName?.split(' ').slice(1).join(' ') || state?.surname || '',
    email = bookingData?.email || state?.email || 'guest@example.com',
    // address = state?.address || '123 Main St, City', // Unused
    checkIn = bookingData?.checkIn || state?.checkIn || new Date().toISOString().split('T')[0],
    checkOut = bookingData?.checkOut || state?.checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    adults = state?.adults || 2,
    children = state?.children || 0,
  } = {};

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

  // Handle file upload with authentication
  const handleUploadPaymentProof = async () => {
    if (!paymentFile) {
      alert('Please select a file first.');
      return;
    }

    if (!isAuthenticated) {
      alert('Authentication required. Please access your booking via the email link.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Uploading...');

    try {
      const token = state?.token || localStorage.getItem('bookingToken');
      
      const formData = new FormData();
      formData.append('paymentProof', paymentFile);
      formData.append('totalAmount', totalAmount);
      formData.append('guestName', `${name} ${surname}`);
      formData.append('guestEmail', email);

      const apiUrl = process?.env?.REACT_APP_API_URL || 'http://localhost:4001';
      const response = await axios.post(
        `${apiUrl}/api/payments/proof/${bookingId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        }
      );

      if (response.data.success) {
        setUploadStatus('Payment proof uploaded successfully! We will review and confirm your booking within 24 hours.');
        // Optionally navigate to success page
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
      
      if (error.response?.status === 401) {
        setError('Your session has expired. Please access your booking again via the email link.');
        setIsAuthenticated(false);
        localStorage.removeItem('bookingToken');
      } else if (error.response?.data?.message) {
        setUploadStatus(`Upload failed: ${error.response.data.message}`);
      } else {
        setUploadStatus('Upload failed. Please check your connection and try again.');
      }
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

  // Redirect to access page if not authenticated
  const redirectToAccess = () => {
    navigate('/booking-access');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="booking-confirmation-container">
        <div className="container mx-auto p-6 max-w-4xl">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-blue-600">Loading your booking...</p>
          </div>
        </div>
      </div>
    );
  }

  // Authentication error state
  if (!isAuthenticated && error) {
    return (
      <div className="booking-confirmation-container">
        <div className="container mx-auto p-6 max-w-4xl">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Required</h1>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={redirectToAccess}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔑 Access Your Booking
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-confirmation-container">
      <div className="container mx-auto p-6 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Booking Confirmation</h1>

        {/* Authentication Status */}
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          <div className="flex items-center">
            <span className="text-green-600 mr-2">🔐</span>
            <span className="font-medium">Securely authenticated</span>
            <span className="ml-2 text-sm">({email})</span>
          </div>
        </div>

        {/* Booking Summary Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Booking Summary</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Room Type:</span>
                <span className="text-gray-800">{roomName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Check-in:</span>
                <span className="text-gray-800">{new Date(checkIn).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Check-out:</span>
                <span className="text-gray-800">{new Date(checkOut).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Nights:</span>
                <span className="text-gray-800">{nights}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Adults:</span>
                <span className="text-gray-800">{adults}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Children:</span>
                <span className="text-gray-800">{children}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Guest Name:</span>
                <span className="text-gray-800">{`${name} ${surname}`}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="text-gray-800 text-sm">{email}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xl font-semibold text-gray-800">Total Amount:</span>
                <p className="text-sm text-gray-600">({nights} nights × {getPricePerNight()} per night)</p>
              </div>
              <span className="text-2xl font-bold text-green-600">{formattedTotalAmount}</span>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-800">Booking Reference:</span>
                <span className="text-lg font-mono bg-blue-100 px-3 py-1 rounded text-blue-800">{bookingReference}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Account Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Bank Transfer Details</h2>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="block text-sm font-medium text-gray-600">Bank Name:</span>
                  <span className="text-lg font-semibold text-gray-800">{bankDetails.bank}</span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-600">Account Name:</span>
                  <span className="text-lg font-semibold text-gray-800">{bankDetails.accountName}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="block text-sm font-medium text-gray-600">Account Number:</span>
                  <span className="text-lg font-mono font-semibold text-gray-800">{bankDetails.accountNumber}</span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-600">Routing Number:</span>
                  <span className="text-lg font-mono font-semibold text-gray-800">{bankDetails.routing}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Important Instructions */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-red-800">⚠️ IMPORTANT PAYMENT INSTRUCTIONS</h3>
                <div className="mt-2 text-red-700">
                  <p className="font-medium mb-2">When making your bank transfer, you MUST:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Include your booking reference ({bookingReference}) in the payment description/memo field</strong></li>
                    <li>Transfer the exact amount: <strong>{formattedTotalAmount}</strong></li>
                    <li>Upload proof of payment below after completing the transfer</li>
                  </ul>
                  <p className="mt-3 text-sm"><strong>Note:</strong> Payments without the correct reference may cause delays in processing your booking.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Proof Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Upload Proof of Payment</h2>
          
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">📋 Upload Requirements:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• File types: Images (JPEG, PNG, GIF) or PDF documents only</li>
              <li>• Maximum file size: 5MB</li>
              <li>• Upload a clear screenshot or photo of your bank transfer receipt</li>
              <li>• Ensure the booking reference <strong>({bookingReference})</strong> is visible in the transfer details</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Payment Proof File:
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,.pdf"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-lg cursor-pointer"
                disabled={!isAuthenticated}
              />
            </div>

            {paymentFile && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Selected file:</p>
                    <p className="text-sm text-gray-600">{paymentFile.name}</p>
                    <p className="text-xs text-gray-500">Size: {(paymentFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    onClick={removeFile}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleUploadPaymentProof}
              disabled={!paymentFile || isUploading || !isAuthenticated}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                !paymentFile || isUploading || !isAuthenticated
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isUploading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                'Upload Payment Proof'
              )}
            </button>

            {uploadStatus && (
              <div className={`p-4 rounded-lg ${
                uploadStatus.includes('successfully') 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : uploadStatus.includes('failed') || uploadStatus.includes('error')
                  ? 'bg-red-50 text-red-800 border border-red-200'
                  : 'bg-blue-50 text-blue-800 border border-blue-200'
              }`}>
                <p className="text-sm font-medium">{uploadStatus}</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Instructions */}
        <div className="bg-yellow-50 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">📞 Need Help?</h3>
          <div className="text-yellow-700 space-y-2 text-sm">
            <p>If you encounter any issues with your payment or upload:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Email us at: <strong>bookings@cybertrace.com</strong></li>
              <li>Call us at: <strong>+1 (555) 123-4567</strong></li>
              <li>Include your booking reference: <strong>{bookingReference}</strong></li>
            </ul>
            <p className="mt-3"><strong>Processing Time:</strong> We will review your payment proof within 24 hours and send you a confirmation email once verified.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationAuth;
