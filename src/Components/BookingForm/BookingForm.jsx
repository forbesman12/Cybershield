import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomsData } from '../Models/roomsData';
import { useBooking } from '../../context/BookingContext';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import './BookingForm.css'; // ← Add your own CSS file

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

    if (!formData.roomId) newErrors.roomId = 'Please select a room, should be the same as room title';
    else if (!roomsData.find(room => room.id === parseInt(formData.roomId))) {
      newErrors.roomId = 'Invalid room selection';
    }

    if (!formData.name) newErrors.name = 'Name is required';
    else if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    else if (formData.name.length > 50) newErrors.name = 'Name cannot exceed 50 characters';

    if (!formData.surname) newErrors.surname = 'Surname is required';
    else if (formData.surname.length < 2) newErrors.surname = 'Surname must be at least 2 characters';
    else if (formData.surname.length > 50) newErrors.surname = 'Surname cannot exceed 50 characters';

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData.address) newErrors.address = 'Address is required';
    else if (formData.address.length < 10) newErrors.address = 'Address must be at least 10 characters';

    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (formData.phone.length < 7) newErrors.phone = 'Phone number must be at least 7 digits';
    else if (formData.phone.length > 20) newErrors.phone = 'Phone number cannot exceed 20 digits';

    if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required';
    else if (formData.checkIn && formData.checkOut && new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      newErrors.checkOut = 'Check-out date must be after check-in date';
    }

    if (formData.specialRequest.length > 500) newErrors.specialRequest = 'Special request cannot exceed 500 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    clearStatus();

    if (validateForm()) {
      const selectedRoom = roomsData.find(room => room.id === parseInt(formData.roomId));
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

      let roomPrice = 150000;
      if (selectedRoom && selectedRoom.price) {
        const priceMatch = selectedRoom.price.match(/₦?([0-9,]+)/);
        if (priceMatch) {
          roomPrice = parseInt(priceMatch[1].replace(/,/g, ''));
        }
      }

      const totalAmount = roomPrice * nights;

      const bookingData = {
        ...formData,
        totalAmount
      };

      const result = await submitBooking(bookingData);
      if (result.success) {
        setLastSuccessfulBooking({ ...formData, totalAmount });
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
      }
    }
  };

  const handlePopupClose = () => {
    hideSuccessPopup();
    if (lastSuccessfulBooking) {
      navigate('/booking-success', {
        state: {
          message: 'Booking created successfully! We\'ve emailed your booking details. Next, you\'ll receive payment instructions. After you pay, our team will verify the transaction and email you an update.',
          bookingReference: lastSuccessfulBooking.bookingReference,
          bookingId: lastSuccessfulBooking.bookingId,
          instructions: {
            title: '✅ What happens next',
            steps: [
              'Check your inbox for your booking confirmation (it includes your booking reference).',
              'Watch for a follow-up email with payment instructions and available methods.',
              'Complete your payment and keep your receipt handy.',
              'Our team will receive and verify your transaction—once confirmed, you\'ll get a status update by email.',
              'Need help or international bookings? Call +2348058501777 or email infosupportdehilltophotel@gmail.com'
            ]
          }
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

  const calculateDisplayPrice = () => {
    if (!formData.roomId || !formData.checkIn || !formData.checkOut) {
      return { nights: 0, roomPrice: 0, totalAmount: 0 };
    }

    const selectedRoom = roomsData.find(room => room.id === parseInt(formData.roomId));
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    let roomPrice = 150000;
    if (selectedRoom && selectedRoom.price) {
      const priceMatch = selectedRoom.price.match(/₦?([0-9,]+)/);
      if (priceMatch) {
        roomPrice = parseInt(priceMatch[1].replace(/,/g, ''));
      }
    }

    return {
      nights: nights > 0 ? nights : 0,
      roomPrice,
      totalAmount: nights > 0 ? roomPrice * nights : 0
    };
  };

  const priceInfo = calculateDisplayPrice();

  return (
    <div className="booking-form-container">
      <h2>Booking Form</h2>

      {submissionStatus && (
        <div className={`status-message ${submissionStatus}`}>
          {submissionMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <select name="roomId" value={formData.roomId} onChange={handleChange}>
            <option value="">Select a room same as room title</option>
            {roomsData.map(room => (
              <option key={room.id} value={room.id}>
                {room.name} - {room.price}
              </option>
            ))}
          </select>
          {errors.roomId && <p className="error">{errors.roomId}</p>}
        </div>

        <div>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Your name'/>
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder='Your surname'/>
          {errors.surname && <p className="error">{errors.surname}</p>}
        </div>

        <div>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Your email @gmail.com'/>
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder='Adress Including State'/>
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        <div>
          <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} placeholder='Check-in'/>
          {errors.checkIn && <p className="error">{errors.checkIn}</p>}
        </div>

        <div>
          <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} placeholder='Check-out'/>
          {errors.checkOut && <p className="error">{errors.checkOut}</p>}
        </div>

        <div>
          <label>Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder='0123456789'/>
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div>
          <label>Special Request</label>
          <textarea name="specialRequest" value={formData.specialRequest} onChange={handleChange} rows="4"/>
          {errors.specialRequest && <p className="error">{errors.specialRequest}</p>}
        </div>

        {priceInfo.totalAmount > 0 && (
          <div className="price-summary">
            <h3>Booking Summary</h3>
            <p><strong>Room:</strong> {formData.roomName}</p>
            <p><strong>Nights:</strong> {priceInfo.nights}</p>
            <p><strong>Rate per night:</strong> ₦{priceInfo.roomPrice.toLocaleString()}</p>
            <p><strong>Total Amount:</strong> ₦{priceInfo.totalAmount.toLocaleString()}</p>
          </div>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Booking"}
        </button>
      </form>

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
