import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterModal.css'; // Import the CSS file for styling

const RegisterModal = ({ isOpen, onClose }) => {
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/user/register', registerData);
      alert(response.data.message); // Alert the response message from the server
      onClose(); // Close the modal after successful registration
      navigate('/'); // Redirect to the home page or dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  // Don't render the modal if it isn't open
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Register</h2>
        <form onSubmit={handleRegisterSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input 
              type="text" 
              name="firstName" 
              value={registerData.firstName} 
              onChange={handleRegisterChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input 
              type="text" 
              name="lastName" 
              value={registerData.lastName} 
              onChange={handleRegisterChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={registerData.email} 
              onChange={handleRegisterChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={registerData.password} 
              onChange={handleRegisterChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select 
              name="gender" 
              value={registerData.gender} 
              onChange={handleRegisterChange} 
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
