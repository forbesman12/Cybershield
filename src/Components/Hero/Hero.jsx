import React from 'react';
import './Hero.css';
import { FaClock, FaDollarSign, FaSmileBeam } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero container">
      <div className="hero-text">
        <h1>Looking for a Safe Crypto Wallet<br />Recovery Service</h1>
        <p>
          We trace, recover, and investigate crypto wallets and scams.
          Your crypto isn't lost forever<br />
          <span style={{ color: 'red' }}>We can help you recover it.</span>
        </p>
        <button className="btn" onClick={() => navigate('/contact')}>Book a Session Now</button>

        <div className="hero-row">
          <div className="hero-item">
            <FaDollarSign style={{ color: 'green', fontSize: '30px' }} />
            <p>LOWEST FEES</p>
          </div>
          <div className="hero-item">
            <FaClock style={{ color: 'purple', fontSize: '30px' }} />
            <p>FAST</p>
          </div>
          <div className="hero-item">
            <FaSmileBeam style={{ color: 'orange', fontSize: '30px' }} />
            <p>ONLY PAY IF WE<br />SUCCEED</p>
          </div>
          <div className="hero-item">
            <FaDollarSign style={{ color: '#00ffff', fontSize: '30px' }} />
            <p style={{ color: 'black' }}>NO UPFRONT COST</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
