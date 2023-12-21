// LoginLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
const AuthLayout = ({ children }) => {

  
  return (
    <div>
      
      <div className="bg-[rgb(245,249,255)] h-screen w-screen flex items-center justify-center">
        <Outlet/>
      </div>
    </div>
  );
};

export default AuthLayout;
