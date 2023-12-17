import {info} from '../../store/JobsTab.js';

import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import down_arrow from '../../assets/arrow-down-sign.png'
import React from 'react'
import box_with_arrow from '../../assets/box_with_arrow.svg';

const JobHeader = () => {

  const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isFileterClicked,setIsFileterClicked] = useState(false);
    const [isNoResumeClicked,setNoResumeClicked] = useState(false);
    const userInfo = useSelector((state) => state.user.value);
    const collapseStatus = useSelector((state) => state.tab.value.tab);
   
  const handleTab = (val)=>{
    dispatch(info(val));
  }
  

 
  

  return (
<div className={`bg-white p-3  w-full max-w-[100%]  rounded-xl shadow-md grid gap-2 max-md:h-[146px] ${isFileterClicked?`h-[146px]`:'h-[100px]' }`} >
              <div className='flex justify-between  max-md:grid'>
                <h1 className='font-bold text-[1.6rem] justify-self-start '>Jobs</h1>

                <div className='flex'>
                  <input type = "text" placeholder='Jon Title / ID ' className='border rounded-lg p-2  hover:bg-[#F8FAFC] h-[36px] w-[100%] max-w-[234px]  mr-2'  />
                  <div className='flex max-sm:hidden'>
                      <div className='flex border border-[1.8px] w-[6.5rem] h-[36px] cursor-pointer hover:bg-[#F8FAFC] rounded-tl-lg rounded-bl-lg items-center justify-center gap-2'>
                        <img src = {box_with_arrow} />
                        <p className = 'font-bold text-[#475569]'>Export</p>
                      </div>
                      <div className='flex border border-[1.8px] w-[6.5rem] h-[36px] cursor-pointer hover:bg-[#F8FAFC] items-center justify-center gap-2' onClick={()=>setIsFileterClicked(!isFileterClicked)}>
                        <img src = {down_arrow} className={`w-[15px] ${isFileterClicked?'scale-y-[-1]':""}`}/>
                        <p className = 'font-bold text-[#475569]'>Filters</p>
                      </div>
                      <div className={`border border-[1.8px] w-[6.5rem] h-[36px] flex items-center justify-center cursor-pointer hover:bg-[#F8FAFC] ${!userInfo.haveAccess?'rounded-tr-lg rounded-br-lg':''}`}>
                        <p className = 'font-bold text-[#475569]'>GideLines</p>
                      </div>
                      <div className={`border border-[1.8px] w-[6.5rem] h-[36px] flex items-center justify-center cursor-pointer hover:bg-[#F8FAFC] rounded-tr-lg rounded-br-lg ${!userInfo.haveAccess?'hidden':''}`} onClick={()=>navigate('add')}>
                        <p className = 'font-bold text-[#475569]'>Add Job</p>
                      </div>
                      
                  </div>
                  <div className='w-full max-w-[100%] md:hidden sm:hidden'>
                      <select className=' h-[36px] w-[100%] max-w-[234px] bg-white border rounded-lg p-1'>
                        <option selected fixed className='flex cursor-pointer  items-center justify-center gap-2' >
                          <img src = {box_with_arrow} />
                        <p className = 'font-bold text-[#475569]'>Export</p>
                      </option>
                        <option>
                          <img src = {down_arrow} className={`w-[15px] ${isFileterClicked?'scale-y-[-1]':""}`}/>
                          <p className = 'font-bold text-[#475569]'>Filters</p>
                        </option>
                        <option>
                        <p className = 'font-bold text-[#475569]'>GideLines</p>
                          
                        </option>
                        <option className={`${!userInfo.haveAccess?'hidden':''}`} onClick={()=>navigate('add')}>
                        <p  className = 'font-bold text-[#475569]'>Add Job</p>
                          
                        </option>

                      </select>
                  </div>
                </div>
                
              </div>
            

        <div className='flex gap-4 justify-start h-[20px] items-center  w-full  pb-1 max-md:justify-center max-md:max-w-[100%]'>
          <div className={`max-md:hidden group flex justify-between  cursor-pointer hover:border-b-2   ${collapseStatus == '6' ?'border-b-2 border-b-blue-400 ':''}`}  onClick={()=>handleTab({'tab':6})}>
            <p className={`text-[#575d63] group-hover:text-[#2b3a49] max-lg:text-[0.8rem] ${collapseStatus == '6'?'text-blue-400':''}`}>Accepted Jobs</p>
          </div>

          <div className={`max-md:hidden group flex justify-between  cursor-pointer hover:border-b-2 ${collapseStatus == '7'?'border-b-2 border-b-blue-400':''}`} onClick={()=>handleTab({'tab':7})}>
            <p className={`text-[#575d63] group-hover:text-[#2b3a49] max-lg:text-[0.8rem] ${collapseStatus == '7'?'text-blue-400':''}`}>Mapped Jobs </p> 
          </div>
          <div className={`max-md:hidden group flex justify-between  cursor-pointer hover:border-b-2 ${collapseStatus == '8'?'border-b-2 border-b-blue-400':''}`} onClick={()=>handleTab({'tab':8})}>
            <p className={`text-[#575d63] group-hover:text-[#2b3a49] max-lg:text-[0.8rem] ${collapseStatus == '8'?'text-blue-400':''}`}>Live Positions</p>
          </div>
          <div className={`max-md:hidden group flex justify-between  cursor-pointer hover:border-b-2 ${collapseStatus == '9'?'border-b-2 border-b-blue-400':''}`} onClick={()=>handleTab({'tab':9})}>
            <p className={`text-[#575d63] group-hover:text-[#2b3a49] max-lg:text-[0.8rem] ${collapseStatus == '9'?'text-blue-400':''}`}>Favourite Jobs </p> 
          </div>
          <div
              className={`max-md:hidden group flex justify-between cursor-pointer hover:border-b-2 ${!userInfo.haveAccess ? 'hidden' : ''} ${collapseStatus == '10' ? 'border-b-2 border-b-blue-400' : ''}`}
              onClick={() => handleTab({ 'tab': 10 })}
            >
              <p className={`text-[#575d63] group-hover:text-[#2b3a49] max-lg:text-[0.8rem] ${!userInfo.haveAccess ? 'hidden' : ''} ${collapseStatus == '10' ? 'text-blue-400' : ''}`}>My Jobs</p>
          </div>

          <div className='w-full max-w-[100%] md:hidden focus-none '>
              <select className='w-[100%]  h-[36px] max-w-[full] bg-white border rounded-lg p-1'>
                <option selected >Accepted Jobs</option>
                <option>Mapped Jobs </option>
                <option>Live Positions</option>
                <option>Favourite Jobs</option>
                <option className={`${!userInfo.haveAccess?'hidden':''}`}> My Jobs</option>
              </select>
          </div>

        </div>
        
        <div className={`flex  w-full max-w-[55%] justify-between max-md:hidden ${!isFileterClicked?'hidden':''}`}>
        <div className=''>
          <select className=' p-1 h-[28px] w-full max-w-[162px]  bg-white border rounded-md cursor-pointer focus:outline-none'>
            <option disabled selected > <p className=''>All Jobs</p></option>
          </select>
        </div>
        <div className=''>
          <select className=' p-1 h-[28px] w-full max-w-[162px]  bg-white border rounded-md cursor-pointer focus:outline-none'>
            <option disabled selected > <p className=''>All Clients</p></option>
          </select>
        </div>
        <div className=''>
          <select className=' p-1 h-[28px] w-full max-w-[162px]  bg-white border rounded-md cursor-pointer focus:outline-none'>
            <option disabled selected > <p className=''>All Domains</p></option>
          </select>
        </div>
        <div className=''>
          <select className=' p-1 h-[28px] w-full max-w-[162px]  bg-white border rounded-md cursor-pointer focus:outline-none'>
            <option disabled selected > <p className=''>All Locations</p></option>
          </select>
        </div>
        <div className={`flex items-center justify-center p-1 h-full max-h-[28px] w-[200px] border rounded-md cursor-pointer max-xl:text-[0.8rem] ${isNoResumeClicked?'bg-blue-600 text-white':'bg-white'}`} onClick={()=>setNoResumeClicked(!isNoResumeClicked)}>No Resumes Uploaded</div>
          
      </div>
          </div>
  )
}

export default JobHeader