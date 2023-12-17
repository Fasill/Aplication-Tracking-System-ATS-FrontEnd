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
          {/* Authentication Routes */}
          <Route path="/login" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyLogin /></React.Suspense>} />
          <Route path="/login/supplier" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyLoginAsSupplier /></React.Suspense>} />
          <Route path="/login/channelPartner" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyLoginAsChannelPartner /></React.Suspense>} />
          <Route path="/login/employer" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyLoginAsEmployer /></React.Suspense>} />
          <Route path="/login/SignUpNew" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazySignUpNew /></React.Suspense>} />

          {/* Admin Routes */}
          <Route path="/" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyAdminDashboard /></React.Suspense>} />
          <Route path="/signup/supplier" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazySignupAsSupplier /></React.Suspense>} />
          <Route path="/signup/verify" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyOtpVerifier /></React.Suspense>} />
          
          {/* Other Routes */}
          <Route path="/dashboard" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyDashboard /></React.Suspense>} />
          <Route path="/fast" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyYourComponent /></React.Suspense>} />
          <Route path="/verifyClient" element={<React.Suspense fallback={<div>Loading...</div>}><Pages.LazyVerifyClient /></React.Suspense>} />
          
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

        </Routes>
      </Router>
    </div>
  );
}

export default App;
