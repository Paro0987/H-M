import React, { useState } from 'react';
import axios from 'axios';
import '../pageStyle/Newsletter.css'; // Import CSS for styling
import newsletter from '../assets/newsletter.jpg'; // Import image for styling

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/subscribe', { email });
      if (response.status === 200) {
        setStatus('Thank you for subscribing!');
        setEmail('');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="newsletter-page">
    <img src={newsletter} alt="newsletter"  />
      <h1>Subscribe to Our Newsletter</h1>
      <p>Stay updated with the latest news, offers, and promotions. Enter your email below to subscribe to our newsletter.</p>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="newsletter-input"
        />
        <button type="submit" className="newsletter-button">Subscribe</button>
      </form>
      {status && <p className="newsletter-status">{status}</p>}
    </div>
  );
};

export default Newsletter;
