import React from 'react';
// import style from './NotFound.module.css'; // Import your CSS file

const NotFound = () => {
  return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-600">
        <div className="text-white text-6xl font-bold mb-4 animate-bounce">
          404
        </div>
        <div className="text-white text-2xl">Page Not Found</div>
      </div>
  );
};

export default NotFound;
