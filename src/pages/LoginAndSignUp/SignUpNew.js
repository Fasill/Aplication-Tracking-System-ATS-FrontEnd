import axios from 'axios';

import {useState} from "react"
import {useNavigate} from "react-router-dom"

import logo from '../../assets/logo.png'
// import style from "./style.module.css";

const SignUpNew = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate  = useNavigate()
  const [isEmpty, setIsEmpty] = useState(true);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Update isEmpty based on email and password fields
    setIsEmpty(formData.email === '' || formData.password === '' ? true : false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
        .post('http://localhost:8080/signupnew', formData)
    .then((res)=>{
      console.log(res)
    }) 
    // Clear form fields after submission
    setFormData({
      email: '',
      password: '',
    });
  };


  return ( 
    <div className='flex justify-between w-full   '>
      <div className='bg-blue-950 w-full max-w-full h-screen max-md:hidden  grid p-8'> 
        <img alt='logo' href = "/" className="w-[4rem]  m-0 justify-self-start transform hover:scale-[1.1] transition-transform duration-500 cursor-pointer" src= {logo}/>
        <div className='m-auto mt-[-5rem] w-full max-w-[30rem] grid gap-5'><h1 className='m-auto text-4xl font-bold text-[#BCBAC7]'>Welcome!</h1><p className='font-bold text-[#BCBAC7] text-[1.2rem]  '>Welcome to Seamless Job Matching, where your dream career meets its perfect match! ATS Login & Sign Up now to embark on your journey to professional success.</p></div>
      </div>
      <div className='bg-white w-full h-screen  flex align-center justify-center items-center p-8 ' >

        <form onSubmit={handleSubmit} className='grid  w-[350px] gap-5 pb-10 h-full max-h-[30rem]' >
            {/* Email input */}
            <h1 className='justify-self-start text-3xl font-bold text-[rgb(247,126,41)]'>Login as Others</h1>
            <div className={`text-black grid justify-items-start`}>
              <label>Enter Email<span className='text-red-500'>*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className='p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent'
              />
            </div>

            {/* Password input */}
            <div className={`text-black grid justify-items-start`}>
              <label>Enter Password<span className='text-red-500'>*</span></label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className='p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent'

              />
            </div>

            {/* Forgot password link */}
            <p className='font-bold justify-self-end'>
              <a href="/" className='text-blue-500 hover:text-blue-400 justify-self-end'>
                Forgot your password?
              </a>
            </p>

            {/* Login button */}
            <button
              className={`rounded-md h-11 ${isEmpty ? 'border pointer-events-none border-gray-400 text-blue-400 '  : 'bg-blue-500 text-white hover:bg-blue-400 ' } rounded-md h-11 font-bold text-xl`}
              type="submit"
            >
              Login
            </button>

            {/* Create account links */}
            <p className='text-[14px]'>OR</p>
            <button
              className={`rounded-md h-11 bg-blue-500 hover:bg-blue-400 text-white   font-bold `}
              
              onClick={()=>navigate("/login")}
            >
            Employer Or Recruiting Agency Login
            </button>
          </form>


      </div>
    </div>
  );
}

export default SignUpNew;
