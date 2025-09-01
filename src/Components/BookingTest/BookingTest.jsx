import React from 'react';
import BookingForm from '../BookingForm/BookingForm';
import { useBooking } from '../../context/BookingContext';

const BookingTest = () => {
  const { lastBookingData } = useBooking();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Hotel Booking System
          </h1>
          <p className="text-gray-600">
            Test your booking form integration with the API
          </p>
        </div>
        
        {/* Booking Form */}
        <div className="mb-8">
          <BookingForm />
        </div>
        
        {/* Last Booking Data Display (for testing) */}
        {lastBookingData && (
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-600 mb-4">
              ✅ Last Successful Booking
            </h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(lastBookingData, null, 2)}
              </pre>
            </div>
          </div>
        )}
        
        {/* API Status Indicator */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Backend API: <span className="text-green-600 font-medium">localhost:4001</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingTest;
