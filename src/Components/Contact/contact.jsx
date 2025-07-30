
import React from "react";
import './contact.css';
import Navbar from "../Navbar/Navbar";
import {
  FaFileContract,
  FaShieldAlt,
  FaHandshake,
  FaEnvelope,
  FaPhone,
  FaBuilding
} from "react-icons/fa";

const ContactPage = () => {
  return (
    <>
      <Navbar simple />

      <main className="container">
        <div className="grid">
          <section>
            <hgroup>
              <h2>Contact Us</h2>
              <h3>We're here to help you recover your assets</h3>
            </hgroup>

            <h3>Our Standards</h3>
            <ul>
              <li><FaFileContract style={{ marginRight: "0.5rem" }} /> Legally Binding Agreements</li>
              <li><FaShieldAlt style={{ marginRight: "0.5rem" }} /> No Recovery, No Fee Guarantee</li>
              <li><FaHandshake style={{ marginRight: "0.5rem" }} /> In-Person Consultations Available</li>
            </ul>

            <h3>Contact Information</h3>
            <p><strong><FaEnvelope /> Email:</strong> <a href="mailto:support@cryptorecovers.com">support@cryptorecovers.com</a></p>
            <p><strong><FaPhone /> Phone:</strong> <a href="tel:+31851091211">+31 85 109 1211</a></p>
            <p><strong><FaBuilding /> Chambers of Commerce:</strong> 75927276</p>

            <h3>Let’s Get Started!</h3>
            <p>Fields marked with an * are required.</p>

            <form>
              <label htmlFor="name">Name *</label>
              <input type="text" id="name" name="name" placeholder="Your full name" required />

              <label htmlFor="email">Email *</label>
              <input type="email" id="email" name="email" placeholder="you@example.com" required />

              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" placeholder="+1234567890" />

              <label htmlFor="country">Country *</label>
              <select id="country" name="country" required>
                <option value="">- Select Country -</option>
                <option value="nl">Netherlands</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="de">Germany</option>
                <option value="other">Other</option>
              </select>

              <label htmlFor="recovery-type">Type of Recovery</label>
              <select id="recovery-type" name="recovery-type">
                <option value="password">Password Recovery</option>
                <option value="wallet">Wallet Recovery</option>
                <option value="phishing">Phishing Scam</option>
                <option value="other">Other</option>
              </select>

              <label htmlFor="message">Message *</label>
              <textarea id="message" name="message" rows="5" required placeholder="Please explain your situation in as much detail as possible..."></textarea>

              <label>
                <input type="checkbox" required />
                I agree with the <a href="#">Privacy Policy</a> *
              </label>

              <button type="submit" onClick={(e) => e.preventDefault()}>Submit</button>
            </form>
          </section>
        </div>
      </main>

      <section aria-label="Subscribe example">
        <div className="container">
          <article>
            <hgroup>
              <h2>Stay Updated</h2>
              <h3>Subscribe for insights and case updates</h3>
            </hgroup>
            <form className="grid">
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="First Name"
                aria-label="First Name"
                required
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                aria-label="Email"
                required
              />
              <button type="submit" onClick={(e) => e.preventDefault()}>
                Subscribe
              </button>
            </form>
          </article>
        </div>
      </section>

      <footer className="container">
        <small>
          <a href="#">Privacy</a> • <a href="#">Terms</a>
        </small>
      </footer>
    </>
  );
};

export default ContactPage;
