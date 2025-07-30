import React from 'react';
import './step.css';
import { FaFileAlt, FaPlay, FaUndo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const steps = [
  {
    id: 1,
    icon: <FaFileAlt />,
    title: 'Step 1',
    subtitle: 'Personalized consultation.',
    description:
      'We’ll assess your situation and outline the process. This can be done remotely or in person, followed by signing a legal service contract.',
  },
  {
    id: 2,
    icon: <FaPlay />,
    title: 'Step 2',
    subtitle: 'Starting the process.',
    description:
      'We’ll gather all the information and start the recovery process. You’ll receive regular updates, our team will be available for any questions.',
  },
  {
    id: 3,
    icon: <FaUndo />,
    title: 'Step 3',
    subtitle: 'Returning the crypto.',
    description:
      'Once we get the access to the wallet, we’ll securely transfer your digital assets back to you. Our team remains ready to assist you with any follow-up needs.',
  },
];

const RecoveryStepsSection = () => {
  const navigate = useNavigate();
  return (
    <section id='steps-section' className="recovery-steps-section">
      <div className="section-header">
        <h1>Outlining Crypto Wallet Recovery Steps</h1>
        <div className="underline" />
        <p>
          Wondering what happens after you reach out for our help? Here’s a quick look at the process.
        </p>
      </div>

      <div className="steps-container">
        {steps.map((step) => (
          <div className="step-card" key={step.id}>
            <div className="step-icon">{step.icon}</div>
            <h2>{step.title}</h2>
            <h3>{step.subtitle}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
        <br/>
      <button className="btn" onClick={() => navigate('/contact')}>Get Started</button>
    </section>
  );
};

export default RecoveryStepsSection;
<span>&gt;</span>