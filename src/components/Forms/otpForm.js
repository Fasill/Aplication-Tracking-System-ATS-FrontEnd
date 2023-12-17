import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import emailIcon from '../../assets/emailIcon.svg';
import { backEndLink } from '../../utils/Links.js';

const OtpForm = (props) => {
  // State variables
const navigate = useNavigate();
const [isSubmitting, setIsSubmitting] = useState(false); // For form submission state
const [isSending, setIsSending] = useState(false);
const [formData, setFormData] = useState({ code: '' }); // Form data
const [, setErrorMessage] = useState(''); // Error message from the server
const [isEmpty, setIsEmpty] = useState(true)

useEffect(() => {
  // Check if the 'otpverifyToken' cookie exists
  const otpverifyToken = localStorage.getItem("otpverifyToken");

  if (!otpverifyToken) {
    // If the cookie does not exist, navigate to the '/login' page
    navigate('/signup/supplier'); // Replace '/login' with the actual login page route
    return; // Exit the useEffect if the token does not exist
  }
}, []); // Empty dependency array means this effect runs once after the component mounts
  // Form vali dation schema using Yup
  const schema = yup.object().shape({
    code: yup
      .string()
      .required('Code is required')
      .matches(/^\d{6}$/, 'Code must be a six-digit number'),
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
    // setIsEmpty(formData.code != ''? false:true )
  };

  useEffect(() => {
    const isFormEmpty = Object.values(formData).every((value) => value === '');
    setIsEmpty(isFormEmpty);
}, [formData]);

const sendOtp = ()=>{
    setIsSending(true)
    const token = localStorage.getItem('token')

    axios.post(`${backEndLink}/send-otp`,{token})
    .then((otpResponse) => {
    
      console.log(otpResponse.data.message);
      const otpverifyToken = otpResponse.data.otpverifyToken 
      localStorage.setItem("otpverifyToken",otpverifyToken)
    }) 
       .catch((otpError) => {
        console.error('Error sending OTP:', otpError);
        setErrorMessage('An error occurred during OTP generation. Please try again.');
        setIsSending(false)
        })
    
  }
  const onSubmit = () => {
    setIsSubmitting(true);
    // Create a FormData object and append your data
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    // console.log(formData.code)
    // Send a POST request to the server using Axios
    axios.post(`${backEndLink}/verify-otp`, {'otp':parseInt(formData.code, 10),'token':token})
      .then((res) => {
        const token = res.data.token;
        console.log(res.data);
        navigate('/home'); // Navigate to the home page
        localStorage.setItem("otpverifyToken",'');

        if (token) {
          localStorage.setItem('token', token); // Store the token in local storage
       localStorage.setItem("otpverifyToken",'');

          setFormData({ code: '' }); // Clear form fields
        }
        setFormData({ code: '' }); // Clear form fields

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
        setFormData({ code: '' }); // Clear form fields

      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid h-full max-w-[20rem]  w-full max-h-[18rem] ">
      {/* Form Header */}
      <h1 className="m-auto text-black text-3xl font-bold">{props.tittle}</h1>
      <div className='flex m-0  items-start justify-center p-0'><img className='self-start p-1' alt='email' src={emailIcon}/><p className='p-0 text-black'>We emailed a code to [email] please enter the code to sign in.</p></div>
     
      {/* <p className='text-black'>Check Your Email and Enter the 6-Digit Code Below</p> */}
      {/* Code Input */}
      <div className="p-0 m-0 text-black flex items-center justify-between">
        <label>Enter 6-Digit Code<span className="text-red-600 m-0">{errors.phoneNumber?.message}</span></label>
        <input
          type="text"
          name="code"
          {...register("code")}
          value={formData.code}
          onChange={handleChange}
          className="p-3 border h-11 max-w-[10rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent m-0"
        />
      </div>


      {/* Forgot Password Link */}
      <p className="font-bold text-[14px] self-end justify-self-start m-0">
        If you didn't receive the code <span className="text-blue-500 hover:text-blue-400  cursor-pointer" onClick={sendOtp}>
        {isSending ? <span className="loading loading-spinner loading-md"></span> :  "Resend Code"}
        </span>
      </p>

      {/* Submit Button */}
      <button
        className={`rounded-md h-11 ${isEmpty ? 'border pointer-events-none border-gray-400 text-blue-400' : 'bg-blue-500 text-white hover:bg-blue-400'} rounded-md h-11 font-bold text-xl`}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? <span className="loading loading-spinner loading-md"></span> : "Confirm"}
      </button>

      
    </form>
  );
};

export default OtpForm;
