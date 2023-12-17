import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore
import userReducer from './store/user.js';
import tabReducer from './store/JobsTab.js'; 
import navSlice  from './store/navbar.js';
import candidateSlice from './store/CandidateInfo.js';

const store = configureStore({
  reducer: {
    
    user: userReducer,
    tab: tabReducer,
    nav:navSlice,
    candidate:candidateSlice,
    // You can add more reducers here if needed
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);