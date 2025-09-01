import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomsData } from '../Models/roomsData';
import { useBooking } from '../../context/BookingContext';
import SuccessPopup from '../SuccessPopup/SuccessPopup';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    roomId: '',
    roomName: '',
    name: '',
    surname: '',
    email: '',
    address: '',
    checkIn: '',
    checkOut: '',
    phone: '',
    specialRequest: ''
  });

  const [errors, setErrors] = useState({});
  const [lastSuccessfulBooking, setLastSuccessfulBooking] = useState(null);
  const navigate = useNavigate();
  const { 
    submissionStatus, 
    submissionMessage, 
    isLoading, 
    showSuccessPopup,
    submitBooking, 
    clearStatus,
    hideSuccessPopup
  } = useBooking();

  const validateForm = () => {
    const newErrors = {};
    
    // Room selection validation
    if (!formData.roomId) newErrors.roomId = 'Please select a room';
    else if (!roomsData.find(room => room.id === parseInt(formData.roomId))) {
      newErrors.roomId = 'Invalid room selection';
    }

    // Name validation
    if (!formData.name) newErrors.name = 'Name is required';
    else if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    else if (formData.name.length > 50) newErrors.name = 'Name cannot exceed 50 characters';

    // Surname validation
    if (!formData.surname) newErrors.surname = 'Surname is required';
    else if (formData.surname.length < 2) newErrors.surname = 'Surname must be at least 2 characters';
    else if (formData.surname.length > 50) newErrors.surname = 'Surname cannot exceed 50 characters';

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    // Address validation
    if (!formData.address) newErrors.address = 'Address is required';
    else if (formData.address.length < 10) newErrors.address = 'Address must be at least 10 characters';

    // Phone validation
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (formData.phone.length < 7) newErrors.phone = 'Phone number must be at least 7 digits';
    else if (formData.phone.length > 20) newErrors.phone = 'Phone number cannot exceed 20 digits';

    // Date validation
    if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required';
    else if (formData.checkIn && formData.checkOut && new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      newErrors.checkOut = 'Check-out date must be after check-in date';
    }

    // Special Request validation
    if (formData.specialRequest.length > 500) newErrors.specialRequest = 'Special request cannot exceed 500 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    clearStatus(); // Clear previous status messages
    
    if (validateForm()) {
      const result = await submitBooking(formData);
      if (result.success) {
        // Store the successful booking data before resetting the form
        setLastSuccessfulBooking(formData);
        
        // Reset form on successful submission
        setFormData({
          roomId: '',
          roomName: '',
          name: '',
          surname: '',
          email: '',
          address: '',
          checkIn: '',
          checkOut: '',
          phone: '',
          specialRequest: ''
        });
        
        console.log('Booking created successfully:', result.data);
      }
    }
  };

  const handlePopupClose = () => {
    hideSuccessPopup();
    // Navigate to confirmation page with the last successful booking data
    if (lastSuccessfulBooking) {
      const selectedRoom = roomsData.find(room => room.id === parseInt(lastSuccessfulBooking.roomId));
      navigate('/confirmation', {
        state: {
          ...lastSuccessfulBooking,
          price: selectedRoom?.price || 0,
          adults: 1, // Default values, you can modify based on your form
          children: 0
        }
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'roomId') {
      const selectedRoom = roomsData.find(room => room.id === parseInt(value));
      setFormData(prev => ({
        ...prev,
        roomId: value,
        roomName: selectedRoom ? selectedRoom.name : ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Booking Form</h2>
      {submissionStatus && (
        <div className={`mb-4 p-4 rounded-md ${submissionStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {submissionMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Room</label>
          <select
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select a room</option>
            {roomsData.map(room => (
              <option key={room.id} value={room.id}>{room.name} - {room.price}</option>
            ))}
          </select>
          {errors.roomId && <p className="text-red-500 text-sm mt-1">{errors.roomId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Surname</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.checkIn && <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.checkOut && <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Special Request</label>
          <textarea
            name="specialRequest"
            value={formData.specialRequest}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="4"
          />
          {errors.specialRequest && <p className="text-red-500 text-sm mt-1">{errors.specialRequest}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </div>
          ) : (
            'Submit Booking'
          )}
        </button>
      </form>
      
      {/* Success Popup */}
      <SuccessPopup
        isVisible={showSuccessPopup}
        onClose={handlePopupClose}
        message="Booking Successful!"
        autoCloseDelay={3000}
      />
    </div>
  );
};

export default BookingForm;