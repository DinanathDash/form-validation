import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RegistrationResults.css';

const RegistrationResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  // If no form data is available, redirect back to the form
  if (!formData) {
    navigate('/');
    return null;
  }

  // Handle going back to form
  const handleBackToForm = () => {
    navigate('/');
  };

  return (
    <div className="results-container">
      <h2>Registration Successful!</h2>
      <div className="results-content">
        <table className="results-table">
          <tbody>
            <tr>
              <th>First Name</th>
              <td>{formData.firstName}</td>
            </tr>
            <tr>
              <th>Last Name</th>
              <td>{formData.lastName}</td>
            </tr>
            <tr>
              <th>Username</th>
              <td>{formData.username}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{formData.email}</td>
            </tr>
            <tr>
              <th>Phone Number</th>
              <td>{formData.phoneCode} {formData.phoneNumber}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{formData.country}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{formData.city}</td>
            </tr>
            <tr>
              <th>PAN Number</th>
              <td>{formData.panNumber}</td>
            </tr>
            <tr>
              <th>Aadhar Number</th>
              <td>{formData.aadharNumber}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="action-buttons">
        <button onClick={handleBackToForm} className="back-button">
          Back to Form
        </button>
      </div>
    </div>
  );
};

export default RegistrationResults;
