import React, { useEffect, useState } from 'react';
import avatarImg from '../../assets/searchIcon.svg';
import notificationIcon from '../../assets/bell.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { info } from '../../store/navbar';

const NavBar = (props) => {
    const userInfo = useSelector((state) => state.user.value)
    const collapseStatus = useSelector((state) => state.nav.value.collapse);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [collapseStatusLocal, setCollapseStatusLocal] = useState(false);

    const handleCollapseToggle = () => {
        dispatch(info({ collapse: !collapseStatusLocal }));
      };
    
      useEffect(() => {
        console.log("from redux store ", userInfo);
      }, [userInfo]);
    
      useEffect(() => {
        setCollapseStatusLocal(collapseStatus);
      }, [collapseStatus]);
    

    const {Searchbttnstat } = props;
    const searchBarClicked = () => {
      Searchbttnstat(true);
    };
    const logout = () => {
        // Clear the token from local storage
        localStorage.setItem('token', '');
        navigate('/login');
      };



    return (
        <>
        <div className="bg-[#] flex items-center justify-between h-[64px] p-[12px] gap-[3rem] border-b shadow-md">
          <div className="flex gap-3 items-center">
            {/* <img src={} className=""  /> */}
            <label className="btn btn-circle bg-transparent border-none swap swap-rotate hover:bg-transparent xl:hidden z-[100]" onClick={handleCollapseToggle}  >
  
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />
                
                {/* hamburger icon */}
                <svg className="swap-off" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512" fill="#808080">
                    <path fill="#808080" d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/>
                </svg>


                {/* close icon */}
                <svg className="swap-on fill-current " xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon fill="black" points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
                
                </label>
            {/* <a href="/home" className="text-white font-bold">
              LOGO
            </a> */}
          </div>
          <button
            className="bg-white border border-blue-300 w-[500px] h-[28px] rounded-md flex items-center p-4 gap-5 max-md:hidden"
            onClick={searchBarClicked}
          >
            <img src={avatarImg} alt="Avatar" />
            <p>Search</p>
          </button>
          <div className="flex gap-8 ">
            <img src={notificationIcon} alt="Notification" />
            <div className="avatar placeholder dropdown dropdown-end">
              <div
                tabIndex={0}
                className="bg-[rgb(27,106,218)] cursor-pointer text-neutral-content rounded-full w-10 border-[rgb(27,106,218)] border-2 hover:border-[#FF9D56]"
              >
                <span className="text-xs">{props.firstInitial} {props.lastInitial}</span>
                <ul
                  tabIndex={0}
                  className="mt-[10rem] absolute dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-black"
                >
                  <li>
                    { !props.isClient && <p onClick={() => navigate("/app/profile")}>My Profile</p> }
                  </li>

                  <li onClick={logout}><p>Sign Out</p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default NavBar;