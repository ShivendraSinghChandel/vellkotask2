import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    zipCode: '',
    serviceType: '',
    roofAction: '',
    locationType: '',
    timing: '',
    description: '',
    streetAddress: '',
    city: '',
    state: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateStep = () => {
    const stepErrors = {};
    switch (step) {
      case 1:
        if (!/^\d{5}$/.test(formData.zipCode)) stepErrors.zipCode = 'Enter a valid 5-digit zip code';
        break;
      case 2:
        if (!formData.serviceType) stepErrors.serviceType = 'Select a service type';
        break;
      case 3:
        if (!formData.roofAction) stepErrors.roofAction = 'Select a roofing action';
        break;
      case 4:
        if (!formData.locationType) stepErrors.locationType = 'Select a location type';
        break;
      case 5:
        if (!formData.timing) stepErrors.timing = 'Select a timing option';
        break;
      case 6:
        if (!formData.description) stepErrors.description = 'Enter a project description';
        break;
      case 7:
        if (!formData.streetAddress) stepErrors.streetAddress = 'Enter a street address';
        if (!formData.city) stepErrors.city = 'Enter a city';
        if (!formData.state) stepErrors.state = 'Enter a state';
        break;
      case 8:
        if (!formData.firstName) stepErrors.firstName = 'Enter your first name';
        if (!formData.lastName) stepErrors.lastName = 'Enter your last name';
        break;
      case 9:
        if (!/\S+@\S+\.\S+/.test(formData.email)) stepErrors.email = 'Enter a valid email';
        break;
      case 10:
        if (!/^\d{10}$/.test(formData.phoneNumber)) stepErrors.phoneNumber = 'Enter a valid 10-digit phone number';
        if (!formData.termsAccepted) stepErrors.termsAccepted = 'You must accept the terms and conditions';
        break;
      default:
        break;
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      axios.post('http://localhost/backend/submit-form.php', formData)
        .then(() => {
          Swal.fire('Success', 'Your form has been submitted!', 'success');
        })
        .catch(() => {
          Swal.fire('Error', 'There was an error submitting your form!', 'error');
        });
    }
  };

  return (
    <div className="multistep-form">
      <div className="progress-bar">
        <div style={{ width: `${(step / 10) * 100}%` }}></div>
      </div>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h3>Enter Zip Code</h3>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="Zip Code"
            />
            {errors.zipCode && <p className="error">{errors.zipCode}</p>}
          </div>
        )}
        {step === 2 && (
          <div>
            <h3>Select Service Type</h3>
            <select name="serviceType" value={formData.serviceType} onChange={handleInputChange}>
              <option value="">Select Service</option>
              <option value="Roofing">Roofing</option>
              <option value="Guttering">Guttering</option>
              <option value="Siding">Siding</option>
              <option value="Insulation">Insulation</option>
              <option value="Windows">Windows</option>
              <option value="Doors">Doors</option>
              <option value="Solar Panels">Solar Panels</option>
              <option value="Other">Other</option>
            </select>
            {errors.serviceType && <p className="error">{errors.serviceType}</p>}
          </div>
        )}
        {step === 3 && (
          <div>
            <h3>Select Roof Action</h3>
            <select name="roofAction" value={formData.roofAction} onChange={handleInputChange}>
              <option value="">Select Roof Action</option>
              <option value="Completely Replace Roof">Completely Replace Roof</option>
              <option value="Install on New Construction">Install on New Construction</option>
              <option value="Repair Existing Roof">Repair Existing Roof</option>
            </select>
            {errors.roofAction && <p className="error">{errors.roofAction}</p>}
          </div>
        )}
        {step === 4 && (
          <div>
            <h3>Select Location Type</h3>
            <select name="locationType" value={formData.locationType} onChange={handleInputChange}>
              <option value="">Select Location</option>
              <option value="Business">Business</option>
              <option value="Home">Home</option>
            </select>
            {errors.locationType && <p className="error">{errors.locationType}</p>}
          </div>
        )}
        {step === 5 && (
          <div>
            <h3>Select Timing</h3>
            <select name="timing" value={formData.timing} onChange={handleInputChange}>
              <option value="">Select Timing</option>
              <option value="Flexible Timing">Flexible Timing</option>
              <option value="Within One Week">Within One Week</option>
              <option value="One to Two Weeks">One to Two Weeks</option>
              <option value="More than Two Weeks">More than Two Weeks</option>
            </select>
            {errors.timing && <p className="error">{errors.timing}</p>}
          </div>
        )}
        {step === 6 && (
          <div>
            <h3>Enter Project Description</h3>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your project"
            />
            {errors.description && <p className="error">{errors.description}</p>}
          </div>
        )}
        {step === 7 && (
          <div>
            <h3>Enter Address</h3>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              placeholder="Street Address"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State"
            />
            {errors.streetAddress && <p className="error">{errors.streetAddress}</p>}
            {errors.city && <p className="error">{errors.city}</p>}
            {errors.state && <p className="error">{errors.state}</p>}
          </div>
        )}
        {step === 8 && (
          <div>
            <h3>Enter Your Name</h3>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>
        )}
        {step === 9 && (
          <div>
            <h3>Enter Your Email</h3>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
        )}
        {step === 10 && (
          <div>
            <h3>Enter Mobile Number </h3>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
            />
            <label className='termslabel'>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className='rm-width'
              />
             <span> I accept the terms and conditions</span>
            </label>
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
            {errors.termsAccepted && <p className="error">{errors.termsAccepted}</p>}
          </div>
        )}
        <div className="buttons">
          {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
          {step < 10 && <button type="button" onClick={nextStep}>Next</button>}
          {step === 10 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default App;
