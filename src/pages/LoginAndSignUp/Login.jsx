import { useEffect, useState } from 'react';
import React from 'react'
import LoginForm from '../../components/Forms/loginForm.js';
import LoginFormByEmail from '../../components/Forms/loginFormByEmail.js';

const Login = () => {
  const [userRole,setUserRole] = useState("Admin")
  const [isByPassword, setIsByPassword] = useState(false);
  useEffect(()=>{
    console.log(isByPassword)
  },[isByPassword])
  const setInputStatus=((val)=>{
    setIsByPassword(!isByPassword)
  })


  return (
    <div className="bg-white w-[35rem]  p-[2rem] shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
        <nav className='grid items-center gap-3 '>
            <h1 className='font-bold text-[30px] '>LOGIN</h1>
            <div role="tablist" className="justify-self-center tabs-bordered tabs">
    <a
        onClick={() => setUserRole("Requiter")}
        role="tab"
        className={`tab ${userRole === "Requiter" ? "tab-active font-bold" : ""} transition duration-300 ease-in-out`}
    >
        Requiter
    </a>
    <a
        onClick={() => setUserRole("Admin")}
        role="tab"
        className={`tab ${userRole === "Admin" ? "tab-active font-bold" : ""} transition duration-300 ease-in-out`}
    >
        Admin
    </a>
    <a
        onClick={() => setUserRole("Owner")}
        role="tab"
        className={`tab ${userRole === "Owner" ? "tab-active font-bold" : ""} transition duration-300 ease-in-out`}
    >
        Owner
    </a>
</div>

      {isByPassword?(<  LoginForm  setInputStatus={setInputStatus}  role = {userRole} />):(<  LoginFormByEmail setInputStatus={setInputStatus}  role = {userRole} />)}

        </nav>

    </div>
  )
}

export default Login