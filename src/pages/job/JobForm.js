import React, { useState, useEffect } from 'react';
import MyJobs from '../../components/listingJobs/MyJobs.js';
import JobHeader from '../../components/listingJobs/JobHeader.js';
import MappedJobs from '../../components/listingJobs/MappedJobs.js';
import AcceptedJobs from '../../components/listingJobs/AcceptedJobs.js';

import {useSelector} from 'react-redux';
import { backEndLink } from '../../utils/Links.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {

  const navigate = useNavigate();
  const [myJobs,setMyJobs] = useState([]);
  const [acceptedJobs,setAcceptedJobs] = useState([]);
  const [mappedJobs,setMappedJobs] = useState([]);
  const collapseStatus = useSelector((state) => state.tab.value);


  const updateInfo = (updatedInfo) => {
    setMappedJobs(updatedInfo);
  };

  useEffect(() => {
    console.log('activeTab',collapseStatus.tab)
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('./login');
    } else {
      try {
        // Fetch MyJobs
        if (collapseStatus.tab == '10'){
        axios
          .get(`${backEndLink}/jobs/myjobs?token=${token}`)
          .then((response) => {
            setMyJobs(response.data)
            console.log(response.data)
          })
          .catch((err) => {
            console.error(err);
          });}
  
        // Fetch MappedJobs
        if (collapseStatus.tab == '7'){

        axios
          .get(`${backEndLink}/jobs/MappedJobs?token=${token}`)
          .then((response) => {
            setMappedJobs(response.data)
            console.log(response.data)

          })
          .catch((err) => {
            console.error(err);
          });}
          
          //Fetch AcceptedJobs
          if (collapseStatus.tab == '6'){
          axios
          .get(`${backEndLink}/jobs/AcceptedJobs?token=${token}` )
          .then((response) => {
            setAcceptedJobs(response.data)
            console.log(response.data)

          })
          .catch((err) => {
            console.log(err);
          });}

      } catch (e) {
        console.log("Error", e);
      }
    }
  }, [collapseStatus]);
  

  return (
    <>
      <div className={` h-screen w-full overflow-clip `}>
        <div className='flex'>
          <div className={`p-[15px]  grow  flex flex-col gap-1 `}>
            <JobHeader />
            <MyJobs info = {myJobs} />
            <MappedJobs info = {mappedJobs} setInfo = {updateInfo}/>
            <AcceptedJobs info = {acceptedJobs}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
