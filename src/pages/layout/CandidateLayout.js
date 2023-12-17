import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from '../../components/navBar/NavBar.js';
import SearchMember from '../../components/Addmember&Search/SearchMember.js';
import style from './style.module.css';
import { SideNavbarClient } from '../../components/navBar/SideNavbarClient.js';

const CandidateLayout = () => {

  const [SearchMemberClicked, setSearchMemberClicked] = useState(false);

  const receiveDataFromNavBar = (Data) => {
    setSearchMemberClicked(Data);
  };

  return (
    <div className='relative flex'>
      <SideNavbarClient />
      <div className={'bg-white  h-screen overflow-clip flex flex-col w-full'}>
        <NavBar Searchbttnstat={receiveDataFromNavBar} firstInitial={"C"} lastInitial={"N"} isClient={true}/>
        <Outlet />
      </div>
      <div className={SearchMemberClicked ? 'absolute top-0 h-screen w-screen bg-gray-900 bg-opacity-50 flex items-center justify-center z-[50]' : 'hidden'}
        onClick={() => setSearchMemberClicked(false)}>
        <div className={style.bg_blur + ` p-[38px]  w-full h-full flex items-center justify-center`}>
          <SearchMember role={""} accessState={false} />
        </div>
      </div>
    </div>
  );
}

export default CandidateLayout;
