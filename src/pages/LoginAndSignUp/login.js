import logo from '../../assets/logo.png'
import LoginForm from '../../components/Forms/loginForm.js';
import LoginFormByEmail from '../../components/Forms/loginFormByEmail.js';
import { useState,useEffect } from 'react';
// import style from "./style.module.css";

const Login = () => {
  const [isByPassword, setIsByPassword] = useState(false)
  useEffect(()=>{
    const currentUrl = window.location.href;

    // Extract the parameters from the URL
    const urlParams = new URLSearchParams(currentUrl);

    // Get the values of the parameters
    const password = urlParams.get('password');
    setIsByPassword(password==='true'?true:false)
  },[])

  return ( 
    <div className='flex justify-between w-full   '>
      <div className='bg-blue-950 w-full max-w-full h-screen max-md:hidden  grid p-8'> 
        <img alt='logo' href = "/" className="w-[4rem]  m-0 justify-self-start transform hover:scale-[1.1] transition-transform duration-500 cursor-pointer" src= {logo}/>
        <div className='m-auto mt-[-5rem] w-full max-w-[30rem] grid gap-5'><h1 className='m-auto text-4xl font-bold text-[#BCBAC7]'>Welcome!</h1><p className='font-bold text-[#BCBAC7] text-[1.2rem]  '>Welcome to Seamless Job Matching, where your dream career meets its perfect match! ATS Login & Sign Up now to embark on your journey to professional success.</p></div>
      </div>
      <div className='bg-white w-full h-screen  flex align-center justify-center items-center p-8 ' >{isByPassword?<  LoginForm  tittle = "Login" role = "Recruiter" />:<  LoginFormByEmail  tittle = "Login" role = "Recruiter" />}</div>
   
    </div>
  );
}

export default Login;
