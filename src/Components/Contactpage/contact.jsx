import React, { useState } from "react";
import './contact.css';
import Navbar from "../Homepage/Navbar/Navbar";
import ImgContact from '../../Assets/H6.jpg';
import Footer from "../Homepage/Footer/Footer";
import SEOHead from '../SEO/SEOHead';
import { getLocalBusinessStructuredData } from '../SEO/structuredData';
import {
  FaFileContract,
  FaShieldAlt,
  FaHandshake,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaPaperPlane
} from "react-icons/fa";

const ContactPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mrbaoazj", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      if (response.ok) {
        setShowPopup(true);
        form.reset(); // Clear the form after successful submission
      } else {
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      alert("Error submitting form: " + error.message);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const contactStructuredData = getLocalBusinessStructuredData();

  return (
    <>
      <SEOHead 
        title="Contact Us - De-Hilltop Hotel | Get in Touch"
        description="Contact De-Hilltop Hotel for reservations, inquiries, or assistance. Reach us by phone, email, or visit us at our location. We're here to help with your hotel booking needs."
        keywords="contact De-Hilltop Hotel, hotel contact, reservations, customer service, hotel phone number, hotel email, contact information"
        canonicalUrl="https://de-hilltop.com/contact"
        structuredData={contactStructuredData}
      />
      <Navbar />
      <div className="contact-page">
        <div className="contact-hero" style={{ backgroundImage: `url(${ImgContact})`, height: '40vh', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

        <div className="contact-container">
          <div className="email-container">
            <p>NEED ANY HELP</p>
            <h1>Feel free to write</h1>

            <form onSubmit={handleSubmit} className="contact-form" action="https://formspree.io/f/mrbaoazj" method="POST">
              <div className="flex1">
                <div className="form-group">
                  <input type="text" name="name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" name="email" placeholder="Your Email" required />
                </div>
              </div>
              <div className="form-group">
                <input type="text" name="subject" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <textarea name="message"  rows="10" required></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>

          <div className="helptext">
            <p>Need any Help?</p>
            <h2>Get in touch with us</h2>
            <p>We're here to help! Whether you have a question, need assistance, <br />
              have a suggestion, or want to learn more about our services, we'd love to hear from you. <br />Please don't hesitate to reach out to us using the contact information below.</p>
            <div className="call">
              <div className="icon"><FaPhone /></div>
              <div className="text">
                <h2>Have any questions</h2>
                <p>Free +234 - (0)80 - 330 - 876 - 66</p>
              </div>
            </div>
            <div className="call">
              <div className="icon"><FaPaperPlane/></div>
              <div className="text">
                <p>Info@dehilltopapartment.com</p>
              </div>
            </div>
            <div className="location">
              <div className="icon"><FaBuilding /></div>
              <div className="text">
                <p>Ofili Drive, Last Redeem Bustop <br />Off Chief Ukah Way, Okpanam Delta State</p>
              </div>
            </div>
          </div>
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h1>Thank you we have received your message</h1>
              <button onClick={closePopup} className="popup-close-button">Close</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;