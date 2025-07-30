import React from 'react';
import './about.css';
// import teamImage from '../../assets/team.jpg'; // Replace with your image path

const AboutUs = () => {
  return (
    <section id='why-choose-us' className="about-container">
      <div className="about-header">
        <h1>About Chain Sentinel Recovery</h1>
        <p>Leading the way in crypto wallet recovery and scam tracing solutions.</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            At Chain Sentinel Recovery, we are a passionate team of cybersecurity experts, blockchain developers, and crypto analysts dedicated to helping individuals and businesses recover lost or inaccessible digital assets.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to provide reliable and transparent crypto recovery services — whether you've lost access to your wallet, forgotten your password, or been scammed.
          </p>

          <h2>Why Trust Us?</h2>
          <ul>
            <li>✅ 95% client satisfaction rate</li>
            <li>✅ Secure and private handling of client data</li>
            <li>✅ 24/7 customer support</li>
            <li>✅ Successful recovery cases worldwide</li>
          </ul>
        </div>

        <div className="about-image">
          {/* <img src={teamImage} alt="Our team" /> */}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
