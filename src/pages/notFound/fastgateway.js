import React, { useEffect } from 'react';
import axios from 'axios';
import { backEndLink } from '../../utils/Links.js';
import { useNavigate } from 'react-router-dom';

const YourComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backEndLink}/FastLogin`);
        
        // Assuming the token is in the "token" field of the response
        const token = response.data.token;

        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Redirect or perform any other actions as needed
        navigate('/home'); // Example redirect to '/dashboard'
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors, e.g., show an error message to the user
      }
    };

    fetchData();
  }, [navigate]); // Adding navigate to the dependency array to satisfy React Hooks rules

  return (
    <div>
      {/* You can render loading spinners, messages, or other UI elements here */}
      <p>Loading...</p>
    </div>
  );
};

export default YourComponent;
