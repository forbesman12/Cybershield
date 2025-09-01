// Payment utility functions

/**
 * Generate a unique payment ID
 * @param {string} userId - User identifier
 * @returns {string} Unique payment ID
 */
export const generatePaymentId = (userId) => {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  const userPart = userId ? userId.substring(0, 4).toUpperCase() : 'ANON';
  return `PAY_${userPart}_${timestamp}_${randomPart}`;
};

/**
 * Generate a unique booking reference
 * @param {string} roomId - Room identifier
 * @returns {string} Unique booking reference
 */
export const generateBookingReference = (roomId = '') => {
  const timestamp = Date.now().toString().slice(-6);
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  const roomPart = roomId ? `R${roomId}` : 'RM';
  return `${roomPart}${timestamp}${randomStr}`;
};

/**
 * Generate a unique user session ID (if user is not logged in)
 * @returns {string} Unique session ID
 */
export const generateUserSessionId = () => {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `USER_${timestamp}_${randomPart}`;
};

/**
 * Payment status constants
 */
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  AWAITING_PROOF: 'awaiting_proof',
  PROOF_UPLOADED: 'proof_uploaded',
  UNDER_REVIEW: 'under_review',
  VERIFIED: 'verified',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
};

/**
 * Format currency for Nigerian Naira
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatNaira = (amount) => {
  return `₦${amount.toLocaleString('en-NG')}`;
};

/**
 * Create payment data object for API
 * @param {Object} bookingData - Booking information
 * @param {string} userId - User identifier
 * @returns {Object} Payment data object
 */
export const createPaymentData = (bookingData, userId) => {
  const paymentId = generatePaymentId(userId);
  const bookingReference = generateBookingReference(bookingData.roomId);
  
  return {
    paymentId,
    bookingReference,
    userId,
    amount: bookingData.totalPrice,
    currency: 'NGN',
    paymentMethod: 'bank_transfer',
    status: PAYMENT_STATUS.PENDING,
    bookingDetails: {
      roomId: bookingData.roomId,
      roomName: bookingData.roomName,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      nights: bookingData.nights,
      guests: {
        adults: bookingData.adults,
        children: bookingData.children
      },
      guestInfo: {
        name: bookingData.name,
        surname: bookingData.surname,
        email: bookingData.email,
        address: bookingData.address
      }
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

/**
 * Validate payment proof file
 * @param {File} file - The file to validate
 * @returns {Object} Validation result
 */
export const validatePaymentProof = (file) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = [
    'image/jpeg', 
    'image/jpg', 
    'image/png', 
    'image/gif', 
    'application/pdf'
  ];
  
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 5MB' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Only images (JPEG, PNG, GIF) and PDF files are allowed' 
    };
  }
  
  return { valid: true };
};

/**
 * Check if payment is completed
 * @param {string} status - Payment status
 * @returns {boolean} Whether payment is completed
 */
export const isPaymentCompleted = (status) => {
  return [PAYMENT_STATUS.VERIFIED, PAYMENT_STATUS.COMPLETED].includes(status);
};

/**
 * Check if payment needs action from user
 * @param {string} status - Payment status
 * @returns {boolean} Whether payment needs user action
 */
export const needsUserAction = (status) => {
  return [PAYMENT_STATUS.PENDING, PAYMENT_STATUS.AWAITING_PROOF].includes(status);
};

export default {
  generatePaymentId,
  generateBookingReference,
  generateUserSessionId,
  PAYMENT_STATUS,
  formatNaira,
  createPaymentData,
  validatePaymentProof,
  isPaymentCompleted,
  needsUserAction
};
