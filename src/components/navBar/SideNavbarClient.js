import {useState,useEffect} from 'react';
import logo from '../../assets/serivango2v/logo.png';
import dashboard from '../../assets/serivango2v/dashboard.svg'
import person from '../../assets/serivango2v/person.svg'

import gear from '../../assets/serivango2v/gear.svg'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';

import suitcase from '../../assets/serivango2v/suitcase.svg';

import {useSelector } from 'react-redux';

export const SideNavbarClient = () => {
    const navigate = useNavigate()
    const location = useLocation();

    const [activeTab,setActiveTab] = useState('')

    const [isCollapse1,setIsCollapse1] =  useState(true)
    const [haveAccess,setHaveAccess] = useState(false)
    const collapseStatus = useSelector((state) => state.nav.value.collapse);
  
    useEffect(() => {
      setIsCollapse1(collapseStatus)
    }, [collapseStatus]);
  
   
  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem('token');
    setActiveTab(location.pathname)
    
  }, [navigate]);


     
  return (
    <nav
    className={`z-30 bg-[#E1EBFF] w-[252px] h-screen flex flex-col items-center pt-[2rem] gap-[3rem] overflow-y-auto overflow-x-hidden scrollbar-w-1 pr-[1.9rem] transition-all duration-300 ease-in-out  max-xl:absolute  ${isCollapse1 ? '' : ' max-xl:hidden '} shadow-xl`}


    >
        <div className=' cursor-pointer h-[2rem] flex items-center justify-center gap-10 '>
            <img src={logo} className='w-[4rem]'
            loading="lazy" 
            />
        </div>
        <ul className=" w-[252px] ml-7 grid justify-center gap-5 bg-[#E1EBFF] z-30 ">
            <div className=' w-[8rem] justify-self-center flex'><label className='text-[18px] '>MENU</label></div>
           
            <li  
                className={`flex items-center  hover:bg-[#c5d5f5]  hover:ml-1  w-[232px] h-[50px] justify-center gap-3 cursor-not-allowed	 ${activeTab === '/home'?'bg-[#96B9FC] ml-1':''}`}
                disabled
                
            >
            <div className='flex items-start justify-start w-[8rem] gap-3'>
               
                <img src={dashboard}/>
                <p>Dashboard</p>
           </div>
            </li>
            <li 
                className={`flex items-center hover:ml-1    hover:bg-[#c5d5f5]  w-[232px] h-[50px] justify-center gap-3 cursor-not-allowed	 ${activeTab === '/members'?'bg-[#96B9FC] ml-1':''} ${!haveAccess ?'hidden':''}`} 
                disabled
                
                >
            <div className={`flex items-start justify-start w-[8rem] gap-3 `}>

                <img src={person}/>
                <p>Members</p>
            </div>
            </li>
            <div className=' w-[8rem] justify-self-center flex'>
            <label>RECRUITMENT </label>
            </div>
            <li className={`flex items-center  hover:ml-1  hover:bg-[#c5d5f5]  w-[232px] h-[50px] justify-center gap-3 cursor-not-allowed	 ${activeTab === '/jobs'?'bg-[#96B9FC]':''}`}
            disabled
            >
                <div className='flex items-start justify-start w-[8rem] gap-3'
            disabled
            >
                <img src={suitcase}/>
                <p>Jobs</p>
                </div>
            </li>
           <li 
            className={`flex items-center hover:ml-1  hover:bg-[#96B9FC]  w-[232px] h-[50px] justify-center gap-3 cursor-pointer ${activeTab === '/client/Candidates'?'bg-[#96B9FC]':''}`}
            onClick={()=>navigate('/client/Candidates')}
           >
           <div className='flex items-start justify-start w-[8rem] gap-3'>
                
                <img src={person}/>
                <p>Candidates</p>
                </div>
            </li>
            <div className=' w-[8rem] justify-self-center flex'
                disabled
            >
            <label>ORGANIZATIONS</label>
            </div>

           
            <li 
                className='flex items-center hover:ml-1  hover:bg-[#c5d5f5]  w-[232px] h-[50px] justify-center gap-3 cursor-not-allowed	'
                disabled
                >
            <div className='flex items-start justify-start w-[8rem] gap-3'>
              
                <img src={gear}/>
                <p>Setting</p>
            </div>
            </li>
        </ul>
        
    </nav>
  )
}
