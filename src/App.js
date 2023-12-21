// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import * as Pages from './pages/index.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          {/* Admin Routes */}
          <Route path="/" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyAdminDashboard /></React.Suspense>} />
          
          {/* Other Routes */}
          <Route path="/dashboard" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyDashboard /></React.Suspense>} />
          <Route path="/fast" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyYourComponent /></React.Suspense>} />
          <Route path="/verifyClient" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyVerifyClient /></React.Suspense>} />
          <Route path="/verifySupplier" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyVerifySupplier /></React.Suspense>} />
         
          
          {/* Home Layout Routes */}
          <Route path="" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyHomeLayout /></React.Suspense>}>
            {/* Nested Routes within Home Layout */}
            <Route path="/app/profile" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyProfile /></React.Suspense>} />
            <Route path='/jobs' element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyJobs /></React.Suspense>} />
            <Route path="/jobs/edit/*" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyEditJobs /></React.Suspense>} />
            <Route path="/jobs/Add" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyAddJobs /></React.Suspense>} />
            <Route path="/jobs/details/*" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyJobDetail /></React.Suspense>} />
            <Route path="/home" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyFront /></React.Suspense>} />
            <Route path="/members" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyMembers /></React.Suspense>} />
            <Route path="/Candidate/*" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyCandidateProfile /></React.Suspense>} />
            <Route path="/Candidates" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyCandidates /></React.Suspense>} />
          </Route>

          <Route path="" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyCandidateLayout /></React.Suspense>}>
            <Route path="/client/Candidates" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyCandidatesForClient /></React.Suspense>} />
            <Route path="/client/CandidateProfileClient/*" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyCandidateProfileClient /></React.Suspense>} />
          </Route>
          <Route path="" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyTestLogin /></React.Suspense>}>
            <Route path="/login" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyTest /></React.Suspense>} />
            <Route path="/register/verify" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyOtpVerifier /></React.Suspense>} />
            <Route path="/register" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazySignupAsSupplier /></React.Suspense>} />
          </Route>



        </Routes>
      </Router>
    </div>
  );
}

export default App;
