// API service for booking operations
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4001/api';

export const bookingApi = {
  /**
   * Create a new booking
   * @param {Object} bookingData - The booking form data
   * @returns {Promise<Object>} API response
   */
  async createBooking(bookingData) {
    // For now, try without authentication first as guest bookings should be allowed
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Removed auth headers - guest bookings should not require authentication
      },
      body: JSON.stringify({
        ...bookingData,
        paymentMethod: 'reserve' // Default payment method
      }),
    });
    
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.message || `HTTP Error: ${response.status}`);
    }
    
    return responseData;
  },

  /**
   * Get all bookings with optional filters
   * @param {Object} filters - Optional filters (roomId, email, page, limit)
   * @returns {Promise<Object>} API response with bookings list
   */
  async getAllBookings(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const response = await fetch(`${API_BASE_URL}/bookings?${queryParams}`);
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.message || `HTTP Error: ${response.status}`);
    }
    
    return responseData;
  },

  /**
   * Get a specific booking by ID
   * @param {string} bookingId - The booking ID
   * @returns {Promise<Object>} API response with booking details
   */
  async getBookingById(bookingId) {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`);
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.message || `HTTP Error: ${response.status}`);
    }
    
    return responseData;
  },

  /**
   * Update a booking
   * @param {string} bookingId - The booking ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} API response with updated booking
   */
  async updateBooking(bookingId, updateData) {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.message || `HTTP Error: ${response.status}`);
    }
    
    return responseData;
  },

  /**
   * Delete a booking
   * @param {string} bookingId - The booking ID
   * @returns {Promise<Object>} API response confirmation
   */
  async deleteBooking(bookingId) {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
      method: 'DELETE',
    });
    
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.message || `HTTP Error: ${response.status}`);
    }
    
    return responseData;
  },

  /**
   * Check API health
   * @returns {Promise<Object>} Health status
   */
  async checkHealth() {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`);
    }
    
    return responseData;
  },

  /**
   * Get booking by ID with payment status
   * @param {string} bookingId - The booking ID
   * @param {boolean} includePaymentStatus - Whether to include payment proof status
   * @returns {Promise<Object>} API response with booking and payment details
   */
  async getBookingWithPaymentStatus(bookingId, includePaymentStatus = true) {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`);
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.message || `HTTP Error: ${response.status}`);
    }
    
    // If payment status is requested and user is authenticated
    if (includePaymentStatus && this.isUserAuthenticated()) {
      try {
        // This would be imported from paymentApi but we'll keep it simple
        const paymentResponse = await fetch(`${API_BASE_URL}/payments/proof/${bookingId}`, {
          headers: this.getAuthHeaders()
        });
        
        if (paymentResponse.ok) {
          const paymentData = await paymentResponse.json();
          responseData.data.paymentProof = paymentData.data;
        }
      } catch {
        // Payment proof not found or not accessible - that's okay
        console.log('No payment proof found for this booking');
      }
    }
    
    return responseData;
  },

  /**
   * Check if user is authenticated (helper method)
   * @returns {boolean} Authentication status
   */
  isUserAuthenticated() {
    return !!(localStorage.getItem('userToken') || sessionStorage.getItem('userToken'));
  },

  /**
   * Get authentication headers (helper method)
   * @returns {Object} Headers with authorization
   */
  getAuthHeaders() {
    const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
};

export default bookingApi;
