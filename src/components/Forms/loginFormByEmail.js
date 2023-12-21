import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import {backEndLink} from '../../utils/Links.js';

const LoginFormByEmail = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false); // For form submission state
  const [isEmpty, setIsEmpty] = useState(true); // To track if the form is empty
  const [formData, setFormData] = useState({ email: '', password: '' }); // Form data
  const [errorMessage , setErrorMessage] = useState(''); // Error message from the server
  const [errorMessage2 , setErrorMessage2] = useState(''); // Error message from the server
  const [isEmailSent,setIsEmailSent] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
  });

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
    // setIsEmpty(formData.email === '' );
  };

  useEffect(() => {
    setErrorMessage2("")
    const isFormEmpty = Object.values(formData).every((value) => value === '');
    setIsEmpty(isFormEmpty);
}, [formData]);

  // Handle form submission
  const onSubmit = () => {
    setIsEmailSent(false)
    setIsSubmitting(true);
    console.log(formData);
    formData.role = props.role; // Set form type

    // Send a POST request to the server
    axios.post(`${backEndLink}/${formData.role === 'As Supplier'?'sendemailtologinRecuireteragency':'sendemailtologin'}`, formData)
      .then((res) => {
        console.log(res);

        setFormData({ email: ''}); // Clear form fields
        setIsSubmitting(false);
        setIsEmailSent(true)
      })
      .catch((error) => {
        console.error('Error:', error);
        // console.error('Error2:', errorMessage2) ;
        setErrorMessage2(error.response.data)
        console.log('Error2:',errorMessage2) ;

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
      <div className="text-black  grid justify-items-start">
        <label>Enter Email<span className="text-red-600">: {errorMessage2} {errors.email?.message} {errorMessage === "User not found." ||errorMessage ===  "User not found2."? "User not found." : ""}</span><span className='text-green-600'>{isEmailSent?"Please check your email for the login verification link.":""}</span></label>
        <input
          type="text"
          {...register("email")}
          value={formData.email}
          onChange={handleChange}
          className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
     
     />
      </div>

      {/* Password Input */}
     

      {/* Forgot Password Link */}
      <p className="font-bold justify-self-start text-[14px] self-end">
        
        Click here to continue with a password: <a  onClick={()=>props.setInputStatus("d")} className="text-blue-500 hover:text-blue-400 justify-self-end cursor-pointer">Continue</a>
      </p>

      {/* Login Button */}
      <button
        className={`rounded-md h-11 ${isEmpty ? 'border pointer-events-none border-gray-400 text-blue-400' : 'bg-blue-500 text-white hover:bg-blue-400'} rounded-md h-11 font-bold text-xl`}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? <span className="loading loading-spinner loading-md"></span> : "Login"}
      </button>

      {/* Create Account Links */}
      
    </form>
  );
}

export default LoginFormByEmail;
