import { useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {backEndLink} from '../../utils/Links.js';


const LoginForm = (props) => {
  // State variables
  const [isSubmitting, setIsSubmitting] = useState(false); // For form submission state
  const [isEmpty, setIsEmpty] = useState(true); // To track if the form is empty
  const navigate = useNavigate(); // React Router navigation
  const [formData, setFormData] = useState({ email: '', password: '' }); // Form data
  const [errorMessage, setErrorMessage] = useState(''); // Error message from the server

  // Form validation schema using Yup
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  // Form hook setup
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // setIsEmpty(formData.email === '' || formData.password === '');
  };

  useEffect(() => {
    const isFormFilled = Object.values(formData).every((value) => value !== '');
    setIsEmpty(!isFormFilled);
}, [formData]);

  // Handle form submission
  const onSubmit = () => {
    
    setIsSubmitting(true);
    formData.role = props.role; // Set form type
    console.log(formData)

    // Send a POST request to the server
    axios.post(`${backEndLink}/login`, formData)
      .then((res) => {
        const token = res.data.token;
        console.log(res.data.message);

        if (token) {
          localStorage.setItem('token', token); // Store the token in local storage
          navigate('/home'); // Navigate to the home page
          setFormData({ email: '', password: '' }); // Clear form fields
        }
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('Error:', error);

        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message); // Set error message from the server
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 pb-10 h-full max-h-[30rem]">
      {/* Form Header */}
      <h1 className="m-auto text-black text-3xl font-bold">{props.tittle}</h1>

      {/* Email Input */}
      <div className="text-black grid justify-items-start">
        <label>Enter Email<span className="text-red-600">: {errors.email?.message} {errorMessage === "User not found." ||errorMessage ===  "User not found2."? "User not found." : ""}</span><span className='text-red-600'>{errorMessage === "Unverified use try to login by email"?"Please log in with your email and complete your information.":""}</span></label>
        <input
          type="text"
          {...register("email")}
          value={formData.email}
          onChange={handleChange}
          className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
        />
      </div>

      {/* Password Input */}
      <div className="text-black grid justify-items-start">
        <label>Enter Password <span className="text-red-600">: {errors.password?.message} {errorMessage === "Authentication failed. Incorrect password." ? "Incorrect password." : ""}</span></label>
        <input
          type="password"
          name="password"
          {...register("password")}
          value={formData.password}
          onChange={handleChange}
          className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
        />
      </div>

      {/* Forgot Password Link */}
      <p className="font-bold justify-self-start text-[14px] self-end">
        
        Click here to continue with a Email: <a  onClick={()=>props.setInputStatus("d")} className="text-blue-500 hover:text-blue-400 justify-self-end cursor-pointer">Continue</a>
      </p>


      {/* Login Button */}
      <button
        className={`rounded-md h-11 ${isEmpty ? 'border pointer-events-none border-gray-400 text-blue-400' : 'bg-blue-500 text-white hover:bg-blue-400'} rounded-md h-11 font-bold text-xl`}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? <span className="loading loading-spinner loading-md "></span> : "Login"}
      </button>
      {/* Create Account Links */}
    </form>
  );
}

export default LoginForm;
