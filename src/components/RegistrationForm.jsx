import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    panNumber: '',
    aadharNumber: ''
  });

  // Error state for validation
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    panNumber: '',
    aadharNumber: ''
  });

  // Form validity state
  const [isFormValid, setIsFormValid] = useState(false);

  // Countries and cities data
  const countries = ["India", "USA", "UK", "Canada", "Australia"];
  
  // Using useMemo to prevent recreation on every render
  const citiesByCountry = React.useMemo(() => ({
    "India": ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"],
    "USA": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    "UK": ["London", "Manchester", "Birmingham", "Glasgow", "Liverpool"],
    "Canada": ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"]
  }), []);

  // Country codes for phone
  const countryCodes = [
    { code: "+91", country: "India" },
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" },
    { code: "+1", country: "Canada" },
    { code: "+61", country: "Australia" }
  ];

  // Cities state based on selected country
  const [cities, setCities] = useState([]);

  // Update cities when country changes
  useEffect(() => {
    if (formData.country) {
      setCities(citiesByCountry[formData.country] || []);
      // Reset city if country changes
      if (!citiesByCountry[formData.country]?.includes(formData.city)) {
        setFormData(prev => ({ ...prev, city: '' }));
      }
    } else {
      setCities([]);
    }
  }, [formData.country, formData.city, citiesByCountry]);

  // Validate form on data change
  useEffect(() => {
    validateForm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Validate form fields
  const validateForm = () => {
    let newErrors = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      phoneCode: '',
      phoneNumber: '',
      country: '',
      city: '',
      panNumber: '',
      aadharNumber: ''
    };
    
    let valid = true;

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
      valid = false;
    } else if (!/^[a-zA-Z]+$/.test(formData.firstName.trim())) {
      newErrors.firstName = 'Only alphabets are allowed';
      valid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
      valid = false;
    } else if (!/^[a-zA-Z]+$/.test(formData.lastName.trim())) {
      newErrors.lastName = 'Only alphabets are allowed';
      valid = false;
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    } else if (formData.username.length < 4) {
      newErrors.username = 'Username should be at least 4 characters';
      valid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers and underscores';
      valid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password should be at least 8 characters';
      valid = false;
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character';
      valid = false;
    }

    // Phone validation
    if (!formData.phoneCode) {
      newErrors.phoneCode = 'Country code is required';
      valid = false;
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number should be 10 digits';
      valid = false;
    }

    // Country validation
    if (!formData.country) {
      newErrors.country = 'Please select a country';
      valid = false;
    }

    // City validation
    if (!formData.city) {
      newErrors.city = 'Please select a city';
      valid = false;
    }

    // PAN validation (Indian PAN format: ABCDE1234F)
    if (!formData.panNumber.trim()) {
      newErrors.panNumber = 'PAN Number is required';
      valid = false;
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
      newErrors.panNumber = 'Invalid PAN format. It should be in the format ABCDE1234F';
      valid = false;
    }

    // Aadhar validation (12 digits)
    if (!formData.aadharNumber.trim()) {
      newErrors.aadharNumber = 'Aadhar Number is required';
      valid = false;
    } else if (!/^\d{12}$/.test(formData.aadharNumber)) {
      newErrors.aadharNumber = 'Aadhar Number should be 12 digits';
      valid = false;
    }

    setErrors(newErrors);
    setIsFormValid(valid);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Final validation before submission
    validateForm();
    
    if (isFormValid) {
      // Navigate to results page with form data
      navigate('/results', { state: { formData } });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name*</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'error-input' : ''}
          />
          {errors.firstName && <div className="error-message">{errors.firstName}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name*</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'error-input' : ''}
          />
          {errors.lastName && <div className="error-message">{errors.lastName}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="username">Username*</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'error-input' : ''}
          />
          {errors.username && <div className="error-message">{errors.username}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group password-group">
          <label htmlFor="password">Password*</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error-input' : ''}
            />
            <button 
              type="button" 
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        <div className="form-group phone-group">
          <label>Phone Number*</label>
          <div className="phone-inputs">
            <select
              name="phoneCode"
              value={formData.phoneCode}
              onChange={handleChange}
              className={`phone-code ${errors.phoneCode ? 'error-input' : ''}`}
            >
              <option value="">Select</option>
              {countryCodes.map((item, index) => (
                <option key={index} value={item.code}>
                  {item.code} ({item.country})
                </option>
              ))}
            </select>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`phone-number ${errors.phoneNumber ? 'error-input' : ''}`}
              placeholder="Enter phone number"
            />
          </div>
          {(errors.phoneCode || errors.phoneNumber) && (
            <div className="error-message">
              {errors.phoneCode || errors.phoneNumber}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="country">Country*</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={errors.country ? 'error-input' : ''}
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <div className="error-message">{errors.country}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="city">City*</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.country}
            className={errors.city ? 'error-input' : ''}
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <div className="error-message">{errors.city}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="panNumber">PAN Number*</label>
          <input
            type="text"
            id="panNumber"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            className={errors.panNumber ? 'error-input' : ''}
            placeholder="ABCDE1234F"
          />
          {errors.panNumber && <div className="error-message">{errors.panNumber}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="aadharNumber">Aadhar Number*</label>
          <input
            type="text"
            id="aadharNumber"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            className={errors.aadharNumber ? 'error-input' : ''}
            placeholder="123456789012"
          />
          {errors.aadharNumber && <div className="error-message">{errors.aadharNumber}</div>}
        </div>

        <div className="form-group submit-group">
          <button type="submit" disabled={!isFormValid}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
