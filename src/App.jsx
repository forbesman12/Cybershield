// Import React core
import React, { Suspense, lazy } from 'react'
// Import routing components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import SEO Provider
import { HelmetProvider } from 'react-helmet-async';

// Import lightweight, always-needed components directly
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'; // Scroll to top on route change
import SEOHead from './Components/SEO/SEOHead';
import { getHotelStructuredData, getWebsiteStructuredData } from './Components/SEO/structuredData';
import LoadingScreen from './Components/LoadingScreen/LoadingScreen'; // Custom loading screen

// Lazy-load all page and component modules for better performance
const Navbar = lazy(() => import('./Components/Homepage/Navbar/Navbar')); // Top navigation bar
const Hero = lazy(() => import('./Components/Homepage/Hero/Hero')); // Hero section for homepage
const Footer = lazy(() => import('./Components/Homepage/Footer/Footer')); // Footer section
const ContactPage = lazy(() => import('./Components/Contactpage/contact')); // Contact page
const Detail = lazy(() => import('./Components/Homepage/Detail/detail')); // Detail section for homepage
const Rooms = lazy(() => import('./Components/Rooms/Roomsections/rooms')); // Rooms listing page
const Gallery = lazy(() => import('./Components/Gallerypage/gallery')); // Gallery page
const AboutPage = lazy(() => import('./Components/Aboutpage/aboutpage')); // About page
const Oom = lazy(() => import('./Components/Homepage/Oom/oom')); // Oom section for homepage
const Photo = lazy(() => import('./Components/Homepage/Photo/photo')); // Photo section for homepage
const RoomDetail = lazy(() => import('./Components/RoomDetails/roomDetails')); // Room detail page
const BookingConfirmation = lazy(() => import('./Components/BookingConfirmation/BookingConfirmation')); // ✅ Old confirmation
const BookingConfirmationAuth = lazy(() => import('./Components/BookingConfirmation/BookingConfirmationAuth')); // ✅ New authenticated confirmation
const BookingAccess = lazy(() => import('./Components/BookingAccess/BookingAccess')); // ✅ Booking access page
const BookingSuccess = lazy(() => import('./Components/BookingSuccess/BookingSuccess')); // ✅ Booking success page
const BookingTest = lazy(() => import('./Components/BookingTest/BookingTest')); // Booking test page
const Testimonials = lazy(() => import('./Components/Homepage/Testimonials/testimonials')); // Testimonials section for homepage
const NotFound = lazy(() => import('./Components/ErrorPages/NotFound')); // 404 Not Found page
// Home component for the root route
const Home = () => {
  const homeStructuredData = {
    ...getHotelStructuredData(),
    ...getWebsiteStructuredData()
  };

  return (
    <>
      <SEOHead 
        title="De-Hilltop Hotel - Luxury Mountain Resort & Hotel Booking"
        description="Experience luxury at De-Hilltop Hotel, a premium mountain resort offering comfortable rooms, stunning views, and exceptional hospitality. Book your stay today."
        keywords="hotel booking, luxury hotel, mountain resort, De-Hilltop, accommodation, rooms, hospitality, vacation, travel"
        canonicalUrl="https://dehilltophotels.com"
        structuredData={homeStructuredData}
      />
      <Suspense fallback={<LoadingScreen />}>
        <Navbar /> {/* Navigation bar at the top */}
        <Hero /> {/* Hero section */}
        <Detail /> {/* Details about the hotel or service */}
        <Oom/> {/* Oom section */}
        <Testimonials /> {/* Testimonials section */}
        <Photo /> {/* Photo section */}
        <Footer /> {/* Footer at the bottom */}
      </Suspense>
    </>
  );
};

// Main App component
const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/confirmation" element={<BookingConfirmation />} />
            <Route path="/booking-access" element={<BookingAccess />} />
            <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmationAuth />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/booking-test" element={<BookingTest />} />
            {/* Catch-all route for 404 pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
};

export default App
