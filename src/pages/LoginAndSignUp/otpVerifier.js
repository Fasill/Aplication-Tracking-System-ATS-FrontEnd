import logo from '../../assets/logo.png'
import OtpForm from '../../components/Forms/otpForm.js'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {backEndLink} from '../../utils/Links.js'
// import style from "./style.module.css";

const OtpVerifier = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem('token');

    if (!token) {
      // If no token is found, navigate to the login page
      navigate('/login');
    } else {
      try {
        axios
          .post(`${backEndLink}/verify`, { token: token })
          .then((res) => {
            // Navigate to the login page if the response is not as expected
            if (!res.data || !res.data.someProperty === 'expectedValue') {
              navigate('/login');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } catch (e) {
        console.log(e);
        navigate('/login');
      }
    }
  }, [navigate]);


  return ( 
    <div className='flex justify-between w-full   '>
      <div className='bg-blue-950 w-full max-w-full h-screen max-md:hidden  grid p-8 '> 
        <img alt='logo' href = "/" className="w-[4rem]  m-0 justify-self-start transform hover:scale-[1.1] transition-transform duration-500 cursor-pointer" src= {logo}/>
        <div className='m-auto mt-[-5rem] w-full max-w-[30rem] grid gap-5'><h1 className='m-auto text-4xl font-bold text-[#BCBAC7]'>Welcome!</h1><p className='font-bold text-[#BCBAC7] text-[1.2rem]  '>Welcome to Seamless Job Matching, where your dream career meets its perfect match! ATS Login & Sign Up now to embark on your journey to professional success.</p></div>
      </div>
      <div className='bg-white w-full h-screen flex align-center justify-center items-center p-8 overflow-y-auto' ><  OtpForm tittle = "Email Verification" /></div>
    </div>
  );
  
}

export default OtpVerifier;
