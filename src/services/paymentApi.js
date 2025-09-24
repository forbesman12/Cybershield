// Secure Payment API service for user-facing operations only
// This file ONLY exposes endpoints that users should have access to

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4001/api';

/**
 * Authentication utilities - Updated for booking token system
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('bookingToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleApiResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    // Handle authentication errors
    if (response.status === 401) {
      localStorage.removeItem('bookingToken');
      throw new Error('Authentication required. Please access your booking via the email link.');
    }
    
    if (response.status === 403) {
      throw new Error('Access denied. You can only upload proof for your own bookings.');
    }
    
    if (response.status === 429) {
      throw new Error('Too many upload attempts. Please wait a few minutes before trying again.');
    }
    
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }
  
  return data;
};

/**
 * USER-FACING PAYMENT APIs ONLY
 * These are the only payment-related endpoints users should access
 */
export const paymentApi = {
  /**
   * Upload payment proof for a booking
   * @param {string} bookingId - The booking ID
   * @param {Object} proofData - Payment proof data
   * @param {File} proofData.file - Payment proof file (JPEG/PNG/GIF/PDF, max 5MB)
   * @param {number} proofData.totalAmount - Total amount paid
   * @param {string} proofData.guestName - Guest name (must match booking)
   * @param {string} proofData.guestEmail - Guest email (must match booking)
   * @returns {Promise<Object>} Upload response
   */
  async uploadPaymentProof(bookingId, proofData) {
    const { file, totalAmount, guestName, guestEmail } = proofData;
    
    // Client-side validation
    if (!file) {
      throw new Error('Please select a payment proof file');
    }
    
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
    
    if (file.size > maxSize) {
      throw new Error('File size must be less than 5MB');
    }
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only images (JPEG, PNG, GIF) and PDF files are allowed');
    }
    
    if (!totalAmount || !guestName || !guestEmail) {
      throw new Error('Please fill in all required fields');
    }
    
    // Create form data
    const formData = new FormData();
    formData.append('paymentProof', file);
    formData.append('totalAmount', totalAmount.toString());
    formData.append('guestName', guestName);
    formData.append('guestEmail', guestEmail);
    
    try {
      const response = await fetch(`${API_BASE_URL}/payments/proof/${bookingId}`, {
        method: 'POST',
        headers: {
          ...getAuthHeaders()
          // Don't set Content-Type for FormData - browser will set it with boundary
        },
        body: formData
      });
      
      return await handleApiResponse(response);
    } catch (error) {
      console.error('Payment proof upload error:', error);
      throw error;
    }
  },

  /**
   * Get payment proof upload status for a booking
   * @param {string} bookingId - The booking ID
   * @returns {Promise<Object>} Proof status response
   */
  async getPaymentProofStatus(bookingId) {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/proof/${bookingId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      });
      
      return await handleApiResponse(response);
    } catch (error) {
      console.error('Payment proof status error:', error);
      throw error;
    }
  },

  /**
   * Initiate payment process (for Stripe/card payments)
   * @param {Object} paymentData - Payment initiation data
   * @param {string} paymentData.bookingId - Booking ID
   * @param {number} paymentData.amount - Payment amount
   * @returns {Promise<Object>} Payment initiation response
   */
  async initiatePayment(paymentData) {
    const { bookingId, amount } = paymentData;
    
    if (!bookingId || !amount) {
      throw new Error('Booking ID and amount are required');
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/payments/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ bookingId, amount })
      });
      
      return await handleApiResponse(response);
    } catch (error) {
      console.error('Payment initiation error:', error);
      throw error;
    }
  },

  /**
   * Verify payment after Stripe checkout
   * @param {string} sessionId - Stripe session ID
   * @returns {Promise<Object>} Payment verification response
   */
  async verifyPayment(sessionId) {
    if (!sessionId) {
      throw new Error('Session ID is required');
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/payments/verify/${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      });
      
      return await handleApiResponse(response);
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  }
};

/**
 * Authentication utilities for the booking token system
 */
export const authUtils = {
  /**
   * Store booking authentication token
   * @param {string} token - JWT booking token
   */
  storeBookingToken(token) {
    localStorage.setItem('bookingToken', token);
  },

  /**
   * Get stored booking authentication token
   * @returns {string|null} JWT token or null
   */
  getBookingToken() {
    return localStorage.getItem('bookingToken');
  },

  /**
   * Check if user has a valid booking token
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    return !!this.getBookingToken();
  },

  /**
   * Clear booking authentication
   */
  clearBookingAuth() {
    localStorage.removeItem('bookingToken');
  },

  /**
   * Decode booking token to get booking info (client-side only, for display)
   * @returns {Object|null} Decoded token payload or null
   */
  getBookingInfo() {
    const token = this.getBookingToken();
    if (!token) return null;
    
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Error decoding booking token:', error);
      return null;
    }
  }
};

/**
 * Payment status constants
 */
export const PAYMENT_STATUS = {
  PENDING_PAYMENT: 'Pending Payment',
  CONFIRMED: 'Confirmed',
  PAYMENT_FAILED: 'Payment Failed',
  CANCELLED: 'Cancelled',
  RESERVED: 'Reserved'
};

/**
 * Payment proof verification status
 */
export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected'
};

/**
 * Helper function to format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Helper function to get file type icon
 * @param {string} fileType - MIME type
 * @returns {string} Icon name or emoji
 */
export const getFileTypeIcon = (fileType) => {
  if (fileType.startsWith('image/')) return '🖼️';
  if (fileType === 'application/pdf') return '📄';
  return '📎';
};

export default paymentApi;
