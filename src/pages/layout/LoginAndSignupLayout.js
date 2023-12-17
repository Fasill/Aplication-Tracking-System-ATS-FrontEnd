// LoginLayout.js
import React from 'react';
import Sidebar from './Sidebar';
import TopNavBar from './TopNavBar';

const LoginAndSignupLayout = ({ children }) => {

  
  return (
    <div>
      <TopNavBar />
      <div className="main-content">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default LoginAndSignupLayout;
