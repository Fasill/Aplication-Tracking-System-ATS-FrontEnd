import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backEndLink } from './Links.js';

export const PrivateRoutes = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const verifyToken = async () => {
      try {
        if (token) {
          const response = await axios.post(`${backEndLink}/verify`, { token: token });
          console.log(response);
          setIsAuth(true);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };

    verifyToken();
  }, []); // Empty dependency array to run the effect only once

  return (
      <Outlet />
  );
};

export default PrivateRoutes;
