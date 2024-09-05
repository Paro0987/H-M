import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pageStyle/CustomerService.css'; // Import the CSS for styling

const CustomerService = () => {
  const [contactInfo, setContactInfo] = useState({});
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactResponse = await axios.get('http://localhost:5000/api/contact-info');
        const faqsResponse = await axios.get('http://localhost:5000/api/faqs');

        if (Array.isArray(faqsResponse.data)) {
          setContactInfo(contactResponse.data);
          setFaqs(faqsResponse.data);
        } else {
          console.error('FAQs data is not an array:', faqsResponse.data);
          setError('Failed to load FAQs. Please try again later.');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="customer-service-page">
      <h1>Customer Service</h1>
      <div className="customer-service-content">
        <section className="contact-info">
          <h2>Contact Us</h2>
          <p>If you have any questions or need assistance, please reach out to us:</p>
          <ul>
            <li>
              <strong>Email:</strong> {contactInfo.email || 'Not available'}
            </li>
            <li>
              <strong>Phone:</strong> {contactInfo.phone || 'Not available'}
            </li>
            <li>
              <strong>Address:</strong> {contactInfo.address || 'Not available'}
            </li>
          </ul>
        </section>
        
        <section className="faq">
          <h2>Frequently Asked Questions</h2>
          {faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <div className="faq-item" key={index}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))
          ) : (
            <p>No FAQs available at the moment. Please check back later.</p>
          )}
        </section>
        
        <section className="support-options">
          <h2>Support Options</h2>
          <div className="support-item">
            <h3>Live Chat</h3>
            <p>Chat with our support team in real-time for immediate assistance.</p>
            <button className="support-button" onClick={() => window.open('https://chat.example.com', '_blank')}>Start Chat</button>
          </div>
          <div className="support-item">
            <h3>Help Center</h3>
            <p>Browse our help center for articles and guides on common topics.</p>
            <button className="support-button" onClick={() => window.open('https://help.example.com', '_blank')}>Visit Help Center</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerService;
