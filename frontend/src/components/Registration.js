import React, { useState } from 'react';
import axios from 'axios';

function Registration() {
  const [registrationData, setRegistrationData] = useState({
    UserName: '',
    Password: '',
    Email: '',
    IsActive: 1,
  });
  const apiUrl = 'https://localhost:7108/api/Registration/registration';

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegistrationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegistration = async () => {
    try {
      const response = await axios.post(apiUrl, registrationData);
      console.log(response.data); // Registration success message
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <input type="text" name="UserName" placeholder='username' onChange={handleInputChange} />
      <input type="password" name="Password" placeholder='password' onChange={handleInputChange} />
      <input type="email" name="Email" placeholder='email' onChange={handleInputChange} />
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
}

export default Registration;




