// Import React core
import React from 'react'
// Import routing components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all page and component modules
import Navbar from './Components/Homepage/Navbar/Navbar' // Top navigation bar
import Hero from './Components/Homepage/Hero/Hero' // Hero section for homepage
import Footer from './Components/Homepage/Footer/Footer' // Footer section
import ContactPage from './Components/Contactpage/contact' // Contact page
import Detail from './Components/Homepage/Detail/detail'; // Detail section for homepage
import Rooms from './Components/Rooms/Roomsections/rooms'; // Rooms listing page
import Gallery from './Components/Gallerypage/gallery'; // Gallery page
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'; // Scroll to top on route change
import AboutPage from './Components/Aboutpage/aboutpage'; // About page
import Oom from './Components/Homepage/Oom/Oom'; // Oom section for homepage
import Photo from './Components/Homepage/Photo/photo'; // Photo section for homepage
import RoomDetail from './Components/RoomDetails/roomDetails'; // Room detail page
import BookingConfirmation from './Components/BookingConfirmation/BookingConfirmation'; // ✅ Add this import
import BookingTest from './Components/BookingTest/BookingTest'; // Booking test page
// Home component for the root route
const Home = () => (
  <>
    <Navbar /> {/* Navigation bar at the top */}
    <Hero /> {/* Hero section */}
    <Detail /> {/* Details about the hotel or service */}
    <Oom /> {/* Oom section */}
    <Photo /> {/* Photo section */}
    <Footer /> {/* Footer at the bottom */}
  </>
);

// Main App component
const App = () => {
  return (
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />
          <Route path="/booking-test" element={<BookingTest />} />
        </Routes>
      </Router>
  );
};

export default App
