#!/usr/bin/env node

// Test script to verify frontend booking API integration
import { bookingApi } from './src/services/bookingApi.js';
import { paymentApi, authUtils } from './src/services/paymentApi.js';

const runTests = async () => {
  console.log('🧪 Testing Frontend-Backend Booking Integration');
  console.log('=================================================\n');

  let testsPassed = 0;
  let testsFailed = 0;

  // Test 1: Create a booking
  try {
    console.log('1. Testing booking creation...');
    
    const bookingData = {
      roomId: 102,
      roomName: 'Premium Suite',
      name: 'Jane',
      surname: 'Smith',
      email: 'jane.smith@example.com',
      address: '456 Oak Avenue, Another City, State, Country',
      checkIn: '2025-09-20',
      checkOut: '2025-09-22',
      phone: '0987654321',
      totalAmount: 399.99,
      paymentMethod: 'reserve'
    };

    const response = await bookingApi.createBooking(bookingData);
    
    if (response.success && response.data.bookingId) {
      console.log('✅ PASS: Booking created successfully');
      console.log(`   Booking ID: ${response.data.bookingId}`);
      console.log(`   Status: ${response.data.status}`);
      console.log(`   Total Amount: $${response.data.totalAmount}`);
      testsPassed++;
      
      // Store booking ID for further tests
      global.testBookingId = response.data.bookingId;
      global.testBookingEmail = response.data.email;
    } else {
      console.log('❌ FAIL: Booking creation failed');
      console.log('   Response:', response);
      testsFailed++;
    }
  } catch (error) {
    console.log('❌ FAIL: Booking creation error');
    console.log('   Error:', error.message);
    testsFailed++;
  }

  console.log('');

  // Test 2: Retrieve the created booking
  if (global.testBookingId) {
    try {
      console.log('2. Testing booking retrieval...');
      
      const response = await bookingApi.getBookingById(global.testBookingId);
      
      if (response.success && response.data) {
        console.log('✅ PASS: Booking retrieved successfully');
        console.log(`   Room: ${response.data.roomName}`);
        console.log(`   Guest: ${response.data.name} ${response.data.surname}`);
        console.log(`   Check-in: ${new Date(response.data.checkIn).toLocaleDateString()}`);
        console.log(`   Check-out: ${new Date(response.data.checkOut).toLocaleDateString()}`);
        testsPassed++;
      } else {
        console.log('❌ FAIL: Booking retrieval failed');
        console.log('   Response:', response);
        testsFailed++;
      }
    } catch (error) {
      console.log('❌ FAIL: Booking retrieval error');
      console.log('   Error:', error.message);
      testsFailed++;
    }
  } else {
    console.log('2. Skipping booking retrieval test (no booking ID)');
    testsFailed++;
  }

  console.log('');

  // Test 3: Test authentication utils
  try {
    console.log('3. Testing authentication utilities...');
    
    // Test guest token generation
    if (global.testBookingEmail && global.testBookingId) {
      authUtils.generateGuestToken(global.testBookingEmail, global.testBookingId);
      
      if (authUtils.isAuthenticated()) {
        console.log('✅ PASS: Guest token generated and authentication working');
        console.log(`   Token exists: ${!!authUtils.getToken()}`);
        testsPassed++;
      } else {
        console.log('❌ FAIL: Guest token generation failed');
        testsFailed++;
      }
    } else {
      console.log('❌ FAIL: Missing booking data for authentication test');
      testsFailed++;
    }
  } catch (error) {
    console.log('❌ FAIL: Authentication test error');
    console.log('   Error:', error.message);
    testsFailed++;
  }

  console.log('');

  // Test 4: Test payment API endpoints (should require authentication)
  try {
    console.log('4. Testing payment API endpoints...');
    
    if (global.testBookingId) {
      // This should work since we have a guest token
      try {
        const response = await paymentApi.getPaymentProofStatus(global.testBookingId);
        console.log('❌ FAIL: Should not get proof status without proof uploaded');
        testsFailed++;
      } catch (error) {
        if (error.message.includes('No payment proof found') || error.message.includes('404')) {
          console.log('✅ PASS: Payment proof status correctly returns no proof found');
          testsPassed++;
        } else {
          console.log('❌ FAIL: Unexpected error in payment proof status');
          console.log('   Error:', error.message);
          testsFailed++;
        }
      }
    } else {
      console.log('❌ FAIL: No booking ID for payment API test');
      testsFailed++;
    }
  } catch (error) {
    console.log('❌ FAIL: Payment API test error');
    console.log('   Error:', error.message);
    testsFailed++;
  }

  console.log('');

  // Test 5: Test health check
  try {
    console.log('5. Testing API health check...');
    
    const response = await bookingApi.checkHealth();
    
    if (response.status === 'OK') {
      console.log('✅ PASS: API health check successful');
      console.log(`   Database: ${response.database}`);
      console.log(`   Environment: ${response.environment}`);
      testsPassed++;
    } else {
      console.log('❌ FAIL: API health check failed');
      console.log('   Response:', response);
      testsFailed++;
    }
  } catch (error) {
    console.log('❌ FAIL: Health check error');
    console.log('   Error:', error.message);
    testsFailed++;
  }

  // Summary
  console.log('\n=================================================');
  console.log('🧪 Test Results Summary');
  console.log('=================================================');
  console.log(`✅ Passed: ${testsPassed}`);
  console.log(`❌ Failed: ${testsFailed}`);
  console.log(`📊 Total: ${testsPassed + testsFailed}`);
  
  if (testsFailed === 0) {
    console.log('\n🎉 All tests passed! Frontend-Backend integration is working perfectly!');
  } else {
    console.log(`\n⚠️  ${testsFailed} test(s) failed. Please check the implementation.`);
  }

  // Cleanup
  if (authUtils.isAuthenticated()) {
    authUtils.logout();
    console.log('\n🧹 Cleaned up authentication tokens');
  }

  return testsFailed === 0;
};

// Run the tests
runTests()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Test runner error:', error);
    process.exit(1);
  });
