import React, { useEffect, useState } from 'react';
import axios from 'axios';
import message from '../../assets/message.svg';
import upload from '../../assets/upload.svg';
import { loading } from '../../utils/Loading.js';
import { useLocation,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {backEndLink} from '../../utils/Links.js'
import { useSelector } from 'react-redux';
export const AcceptedJobs = (props) => {
  // Define states
  const dispatch = useDispatch();
  const navigate= useNavigate() 
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(''); // Add activeTab state
  const [counter, setCounter] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [tabValue,setTabValue] = useState('')


  const collapseStatus = useSelector((state) => state.tab.value);
  
  
  useEffect(()=>{
      setActiveTab(collapseStatus.tab)
      console.log('activetab',collapseStatus.tab)

  },[collapseStatus])

  // Define a function to map through the data and render it
  const mapData = () => {
    return props.info.map((item, index) => (
      
      <div 
        key={index}
        className={`bg-white w-[100%] h-[134px] rounded-xl shadow-md flex justify-between p-3 transition-transform transform hover:scale-[1.009] cursor-pointer border`}
        >
        <div className='w-[37.5%] grid gap-2 justify-items-start items-start0' onClick={()=>navigate(`details/${item.JobId}`)}>
          <div className='flex gap-3 '>
            <p className='max-md:text-[15px] w-[100%]'>{item.jobName}</p>
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
              {/* <p className='font-bold text-[12px] overflow-auto h-[18px]'>To</p>{' '} */}
              {/* <p className='font-bold text-[12px] overflow-auto w-[100%] h-[18px] max-w-[9rem] flex justify-center bl-5'>LPA {item.salaryTo}</p>{' '} */}
            </div>
            <p className='font-bold text-[12px] bg-slate-200 pl-1 pr-1 rounded h-[18px] overflow-y-auto  overflow-x-clip w-[100%] max-w-[20rem] flex items-start'>{item.salaryRemark}</p>
            <p className='font-bold text-[12px] bg-slate-200 pl-1 pr-1 rounded h-[18px] overflow-y-auto  overflow-x-clip w-[100%] max-w-[20rem] flex items-start'>{item.optionalSkills}</p>
            <p className='font-bold text-[12px] bg-slate-200 pl-1 pr-1 rounded h-[18px] overflow-y-auto  overflow-x-clip w-[100%] max-w-[20rem] flex items-start'>{item.mandatorySkills}</p>
          </div>
        </div>

        <div className='flex gap-2 justify-start items-start max-sm:hidden' onClick={()=>navigate(`details/${item.JobId}`)}>
          <div className='grid justify-items-start gap-3 p-1'>
            <p className='text-[12px] max-md:text-[8px]'>Resumes Required</p>
            <p className='text-[12px] max-md:text-[8px]'>Resumes Submitted</p>
          </div>
          <div className='grid gap-3 p-1'>
            <p className='font-bold text-[12px] bg-slate-200 pl-1 pr-1 -center rounded-[40%]'>4</p>
            <p className='font-bold text-[12px] bg-slate-200 pl-1 pr-1 -center rounded-[40%]'>4</p>
          </div>
        </div>

        <div className='grid gap-2 justify-start items-start'>
          <button className='flex gap-1 items-center bg-[#6290e6] hover:bg-[#3770da] hover:text-white text-slate-50 font-bold p-1 rounded transition-all duration-300 w-[148px]'>
            <img src={upload} alt='upload-icon' /> Upload Resume
          </button>
          <button className='flex gap-1 items-center bg-white text-[#6290e6] hover:text-white font-bold p-1 rounded border border-[2px] border-[#6290e6] hover:bg-[#3770da] hover:border-[#3770da]'>
            <img src={message} alt='message-icon' /> Job Message
          </button>
        </div>
        
      </div>
    ));
  };

  return (
    <div className={`bg-transparent h-[100%] max-h-[calc(100vh-194px)] flex flex-col items-center gap-1 p-1 overflow-y-auto overflow-x-clip rounded-xl ${activeTab != '6' ?'hidden':''}`}>
      {isLoading ? loading() : mapData()} {/* Call the mapData function to render the data */}
   </div>
  );
};

export default AcceptedJobs;


