import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { backEndLink } from '../../utils/Links.js';
import NavBar from '../../components/navBar/NavBar.js';
import SearchMember from '../../components/Addmember&Search/SearchMember.js';
import style from './style.module.css';
import { NavBar2 } from '../../components/navBar/SideNavbar.js';
import { useDispatch } from 'react-redux';
import { info } from '../../store/user.js';

const HomeLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');
  const [SearchMemberClicked, setSearchMemberClicked] = useState(false);
  const [Role, setRole] = useState("");
  const [haveAccess, setHaveAccess] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch()
  const receiveDataFromNavBar = (Data) => {
    setSearchMemberClicked(Data);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setActiveTab(location.pathname);

    if (!token) {
      navigate('/login');
    } else {
      try {
          axios.post(`${backEndLink}/allInfo?token=${token}`)
          .then(( allInfoResponse) => {
            
            let haveAccess = allInfoResponse.data.type === 'company' || allInfoResponse.data.info.role !== 'Recruiter'
            let compId = allInfoResponse.data.type !== 'company' ? allInfoResponse.data.info.company : "";
            let Role = allInfoResponse.data.info.role;
            // let info = allInfoResponse.data.info
            dispatch(info({ "haveAccess":haveAccess,
                              "compId":compId,
                              "Role":Role,
                              "info":allInfoResponse.data.info,
                              "isCompany":allInfoResponse.data.type === 'company'?true:false
                               }));


            setName(allInfoResponse.data.info.name);
            setHaveAccess(allInfoResponse.data.type === 'company' || allInfoResponse.data.info.role !== 'Recruiter');
            setRole(allInfoResponse.data.info.role);

        
          })
          .catch((error) => {
            navigate('/');
            console.error('Error:', error);
          });
      } catch (e) {
        console.log(e);
        navigate('/login');
      }
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  const firstInitial = firstName.charAt(0);
  const lastInitial = lastName.charAt(0);

  return (
    <div className='relative flex'>
      <NavBar2 haveAccess={haveAccess}/>
      <div className={'bg-white  h-screen overflow-clip flex flex-col w-full'}>
        <NavBar Searchbttnstat={receiveDataFromNavBar} firstInitial={firstInitial} lastInitial={lastInitial} />
        <Outlet />
      </div>
      <div className={SearchMemberClicked ? 'absolute top-0 h-screen w-screen bg-gray-900 bg-opacity-50 flex items-center justify-center z-[50]' : 'hidden'}
        onClick={() => setSearchMemberClicked(false)}>
        <div className={style.bg_blur + ` p-[38px]  w-full h-full flex items-center justify-center`}>
          <SearchMember role={Role} accessState={haveAccess} />
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
