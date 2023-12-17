import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { loading } from '../../utils/Loading.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { backEndLink } from '../../utils/Links.js';
import x from '../../assets/x.svg';
import verify from '../../assets/verify.svg';
import {useSelector} from 'react-redux';
const MappedJobs = (props) => {
  // Define states

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading0, setIsLoading0] = useState(false);

  const [activeTab, setActiveTab] = useState(''); // Add activeTab state
  const location = useLocation();


  const accept = (info) => {
    setIsLoading0(true);
    info.token = localStorage.getItem('token');

    axios.post(`${backEndLink}/jobs/acceptJob`, info)
      .then((response) => {
        console.log(response);
        // Update the info state to trigger a re-render
        setIsLoading0(false);
        // Remove the accepted job from props.info
        const updatedInfo = props.info.filter(item => item.JobId !== info.JobId);
        props.setInfo(updatedInfo); // Assuming you have a function to update props.info, like setInfo
      });
  }

  // Reject job function
  const reject = (info) => {
    setIsLoading0(true);

    const token = localStorage.getItem('token');

    axios.delete(`${backEndLink}/jobs/rejectJob?JobId=${info.JobId}&token=${token}`)
      .then((response) => {
        console.log(response);
        // Update the info state to trigger a re-render
        setIsLoading0(false);
        // Remove the rejected job from props.info
        const updatedInfo = props.info.filter(item => item.JobId !== info.JobId);
        props.setInfo(updatedInfo); // Assuming you have a function to update props.info, like setInfo
      });
  }
  const collapseStatus = useSelector((state) => state.tab.value);
  
  
  useEffect(()=>{
    
    setActiveTab(collapseStatus.tab)
    console.log('activetab',collapseStatus.tab)

  },[collapseStatus])


  const mapData = () => {
    return props.info.map((item, index) => (
      <div
        key={index}
        className={`  bg-white  w-[100%] h-[134px] rounded-xl shadow-md flex justify-between p-3 transition-transform transform hover:scale-[1.009] cursor-pointer border`}
      >
        <div className=' w-[33.3%] grid gap-2 justify-items-start items-start0'>
          <div className='flex gap-3'>
            <p>{item.jobName}</p>
          </div>
          <p>Location: {item.location}</p> {/* Render the job location */}
        </div>

        <div className='w-[35%] flex gap-2 justify-start items-start max-sm:hidden' onClick={()=>navigate(`details/${item.JobId}`)}> 
          <div className='grid gap-3 justify-items-start'>
            <p className='text-[12px]'>Salary</p>
            <p className='text-[12px]'>remark</p>
            <p className='text-[12px]'>Optional Skills  </p>
            <p className='text-[12px]'>Mandatory Skills  </p>
          </div>
          <div className='grid gap-3 justify-items-start '>
            <div className='flex gap-1 bg-slate-200 pl-1 pr-1 rounded w-[100%] '>
              <p className='font-bold text-[12px] overflow-auto  overflow-x-clip w-[100%] h-[18px] max-w-[9rem] flex items-start'>LPA {item.salaryFrom} To LPA {item.salaryTo}</p>{' '}
              
            </div>
            <p className='font-bold text-[12px] bg-slate-200 pl-1 pr-1 rounded h-[18px] overflow-y-auto  overflow-x-clip w-[100%] max-w-[20rem] flex items-start'>{item.salaryRemark}</p>
            <p className='font-bold text-[12px] bg-slate-200 pl-1 pr-1 rounded h-[18px] overflow-y-auto  overflow-x-clip w-[100%] max-w-[20rem] flex items-start'>{item.optionalSkills}</p>
            <p className='font-bold text-[12px] bg-slate-200 pl-1 pr-1 rounded h-[18px] overflow-y-auto  overflow-x-clip w-[100%] max-w-[20rem] flex items-start'>{item.mandatorySkills}</p>
          </div>
        </div>

        <div className=' flex gap-2 justify-start items-start max-md:grid'>
          <button
            className={`flex gap-1 items-center bg-white text-black font-bold p-1 rounded w-[100%] max-w-[76px] border border-[2px] hover:border-blue-500 ${isLoading0 ? 'cursor-disabled' : ''}`}
            onClick={() => { reject({ JobId: item.JobId }) }}
            disabled={isLoading0}
          >
            <img src={x} alt='message-icon' /> <p className='text-[14px] text-red-600'>Reject</p>
          </button>
          <button
            className='flex gap-1 items-center bg-blue-500 text-slate-50 font-bold p-1 rounded hover:bg-blue-600  w-[100%] max-w-[76px] border border-[2px] hover:border-blue-600 border-blue-500'
            onClick={() => { accept({ JobId: item.JobId }) }}
            disabled={isLoading0}
          >
            <img src={verify} alt='upload-icon' /> <p className='text-[14px]'>Accept</p>
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className={`bg-transparent h-[100%] max-h-[calc(100vh-194px)] flex flex-col items-center gap-1 p-1 overflow-y-auto overflow-x-clip rounded-xl ${activeTab != '7' ?'hidden':''}`}>
      {isLoading ? loading() : mapData()} 
    </div>
  );
};

export default MappedJobs;
