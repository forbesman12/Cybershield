import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import CryptoRecoverySection from './Components/Cryptorecoverysec/recovery'
import Footer from './Components/Footer/Footer'
import RecoveryStepsSection from './Components/Step/Step'
import FAQSection from './Components/faq/faq'
import ContactPage from './Components/Contact/contact'
import AboutUs from './Components/About/about';


const Home = () => (
  <>
    <Navbar />
    <Hero />
    <CryptoRecoverySection />
    <RecoveryStepsSection />
    <FAQSection />
    <AboutUs/>
     <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/recovery" element={<CryptoRecoverySection />} />
        <Route path="/faq" element={<FAQSection />} />
        <Route path="/steps" element={<RecoveryStepsSection />} />
        <Route path="/navbar" element={<Navbar />} /> 
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default App