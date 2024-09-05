import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../SignInModal/SignInModal.css'; // Import the CSS file for styling
import RegisterModal from '../RegisterModal/RegisterModal'; // Import RegisterModal

const SignInModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://hennes-and-mauritz.onrender.com/user/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token); // Save JWT token in local storage
      onClose(); // Close the modal after successful sign-in
      navigate('/'); // Redirect to the home page or dashboard
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Invalid email or password');
      } else {
        setError('Error logging in. Please try again later.');
      }
    }
  };

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true); // Open the RegisterModal
  };

  const handleRegisterModalClose = () => {
    setIsRegisterModalOpen(false); // Close the RegisterModal
  };

  // Don't render the modal if it isn't open
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-labelledby="sign-in-modal-title" aria-modal="true">
      <div className="modal-content">
        <button className="close-button" onClick={onClose} aria-label="Close modal">×</button>
        <h2 id="sign-in-modal-title">Sign in</h2>
        <form onSubmit={handleSignIn}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              aria-required="true"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              aria-required="true"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign in</button>
        </form>
        <button onClick={handleRegisterClick}>Become a member</button>
      </div>

      {/* Include RegisterModal and pass props to control its visibility */}
      <RegisterModal isOpen={isRegisterModalOpen} onClose={handleRegisterModalClose} />
    </div>
  );
};

export default SignInModal;
