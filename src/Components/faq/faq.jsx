import React, { useState } from 'react';
import './faq.css';

const faqs = [
  {
    question: 'How long does the recovery process take?',
    answer:
      'The duration varies depending on the complexity of the case. Some recoveries take hours, others may require days or weeks.',
  },
  {
    question: 'How much does a recovery cost?',
    answer:
      'Costs vary based on the type of wallet, amount of information provided, and time required. We’ll give you a clear estimate after assessing your case.',
  },
  {
    question: 'What types of cryptocurrencies can you recover?',
    answer:
      'We can recover a wide range of cryptocurrencies including Bitcoin, Ethereum, ERC-20 tokens, and assets across multiple blockchains.',
  },
  {
    question: 'Can you help if I have very little wallet information?',
    answer:
      'Yes, we’ve helped clients recover wallets with limited information. The more detail you provide, the better — but we may still be able to assist.',
  },
  {
    question: 'Can you restore crypto that has been sent to the wrong address?',
    answer:
      'In many cases, transactions on the blockchain are irreversible. However, if the destination wallet is under your control, recovery may be possible.',
  },
  {
    question: 'How successful is Crypto Recovers at recovering lost cryptocurrency?',
    answer:
      'We’ve successfully recovered crypto for hundreds of clients worldwide. Each case is unique, but our success rate is among the highest in the industry.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${openIndex === index ? 'open' : ''}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span>{openIndex === index ? '-' : '+'}</span>
            </div>
            {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
