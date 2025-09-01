import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingContext = createContext();

// API base URL - you can move this to environment variables later
const API_BASE_URL = 'http://localhost:4001/api';

export const BookingProvider = ({ children }) => {
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastBookingData, setLastBookingData] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const submitBooking = async (formData) => {
    setIsLoading(true);
    setSubmissionStatus(null);
    setSubmissionMessage('');
    
    try {
      // Add paymentMethod field required by backend
      const bookingData = {
        ...formData,
        paymentMethod: 'reserve' // Default to reserve payment method
      };
      
      console.log('Submitting booking data:', bookingData);
      
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      const responseData = await response.json();
      console.log('API Response:', responseData);
      
      if (!response.ok) {
        // Handle specific API errors
        if (responseData.errors) {
          // Validation errors from the API
          const errorMessages = Array.isArray(responseData.errors) 
            ? responseData.errors.join(', ')
            : responseData.errors;
          throw new Error(errorMessages);
        } else if (responseData.message) {
          // General error message from API
          throw new Error(responseData.message);
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      }
      
      // Success handling
      setSubmissionStatus('success');
      setSubmissionMessage(responseData.message || 'Booking submitted successfully!');
      setLastBookingData(responseData.data);
      setShowSuccessPopup(true);
      
      return { success: true, data: responseData.data, formData };
      
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmissionStatus('error');
      
      // Handle different types of errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setSubmissionMessage('Unable to connect to the server. Please check your internet connection or try again later.');
      } else {
        setSubmissionMessage(`Error submitting booking: ${error.message}`);
      }
      
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Clear status after 5 seconds for success messages
  React.useEffect(() => {
    if (submissionStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmissionStatus(null);
        setSubmissionMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submissionStatus]);

  const clearStatus = () => {
    setSubmissionStatus(null);
    setSubmissionMessage('');
  };

  const hideSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <BookingContext.Provider value={{ 
      submissionStatus, 
      submissionMessage, 
      isLoading, 
      lastBookingData,
      showSuccessPopup,
      submitBooking,
      clearStatus,
      hideSuccessPopup
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
