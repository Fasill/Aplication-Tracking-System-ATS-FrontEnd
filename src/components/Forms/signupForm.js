import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { backEndLink } from '../../utils/Links.js';

const SignUpForm = (props) => {
  // State variables
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    ownerName:'',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Form validation schema using Yup
  // Form validation schema using Yup
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    name: yup.string(),
    ownerName: yup.string(),

    address: yup.string(),
    city: yup.string(),
    state: yup.string(),
    country: yup.string(),
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

  };

  useEffect(() => {
    const isFormFilled = Object.values(formData).every((value) => value !== '');
    setIsEmpty(!isFormFilled);
}, [formData]);

  // Handle form submission
  const onSubmit = () => {
    setIsSubmitting(true);
    formData.type = "";
    console.log(formData)

    axios
      .post(`${backEndLink}/signup`, formData)
      .then((res) => {
        const token = res.data.token;
        console.log(res.data.message);
        console.log("saved1");

        if (token) {
          localStorage.setItem('token', token);

          axios
            .post(`${backEndLink}/send-otp`, { token: token })
            .then((otpResponse) => {
              console.log(otpResponse);
              console.log(otpResponse.data.message);
              const otpverifyToken = otpResponse.data.otpverifyToken;
              localStorage.setItem("otpverifyToken", otpverifyToken);
              navigate('/register/verify');
              setFormData({
                email: '',
                phoneNumber: '',
                name: '',
                address: '',
                city: '',
                state: '',
                country: '',
                ownerName:'',
              });
            })
            .catch((otpError) => {
              console.error('Error sending OTP:', otpError);
              setErrorMessage('An error occurred during OTP generation. Please try again.');
              setIsSubmitting(false);
            });
        } else {
          setIsSubmitting(false);
        }
      })
      .catch((error) => {
        console.error('Error:', error);

        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" grid gap-5 ">
      <h1 className="m-auto text-black text-3xl font-bold">{props.tittle}</h1>



        
    <div className="flex max-w-96 w-full gap-3 max-md:grid justify-between">
      <div className="text-black grid justify-items-start">
        <label>Agency Name<span className="text-red-600">{errors.name?.message}</span></label>
        <input
          type="text"
          name="name"
          {...register("name")}
          value={formData.name}
          onChange={handleChange}
          className="p-3 border h-11  w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
        />
      </div>

      <div className="text-black grid justify-items-start">
        <label>Address<span className="text-red-600">{errors.address?.message}</span></label>
        <input
          type="text"
          name="address"
          {...register("address")}
          value={formData.address}
          onChange={handleChange}
          className="p-3 border h-11  w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
       
       />
      </div>
      </div>

    <div className="flex max-w-96 w-full gap-3 max-md:grid justify-between">

      <div className="text-black grid justify-items-start">
        <label>City<span className="text-red-600">{errors.city?.message}</span></label>
        <input
          type="text"
          name="city"
          {...register("city")}
          value={formData.city}
          onChange={handleChange}
          className="p-3 border h-11  w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
       
       />
      </div>

      <div className="text-black grid justify-items-start">
        <label>State<span className="text-red-600">{errors.state?.message}</span></label>
        <input
          type="text"
          name="state"
          {...register("state")}
          value={formData.state}
          onChange={handleChange}
          className="p-3 border h-11  w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
       
       />
      </div>
      </div>

    <div className="flex max-w-96 w-full gap-3 max-md:grid justify-between">

      <div className="text-black grid justify-items-start">
        <label>Phone Number<span className="text-red-600">{errors.phoneNumber?.message}</span></label>
        <PhoneInput
          inputStyle={{
            height: '45px',
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}

          value={formData.phoneNumber}
          onChange={(value) => setFormData({ ...formData, phoneNumber: value })}
        />
      </div>

      <div className="text-black grid justify-items-start">
        <label>Country<span className="text-red-600">{errors.country?.message}</span></label>
        <input
          type="text"
          name="country"
          {...register("country")}
          value={formData.country}
          onChange={handleChange}
          className="p-3 border h-11  w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
       
       />
          </div>

      </div>
    <div className="flex max-w-96 w-full gap-3 max-md:grid justify-between">

          <div className="text-black grid justify-items-start">
            <label>Email ID<span className="text-red-600">{errors.email?.message}</span></label>
            <input
              type="text"
              {...register("email")}
              value={formData.email}
              onChange={handleChange}
          className="p-3 border h-11  w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
           
           />
          </div>
          <div className="text-black grid justify-items-start">
            <label>Owner Name<span className="text-red-600">{errors.ownerName?.message}</span></label>
            <input
              type="text"
              {...register("ownerName")}
              value={formData.ownerName}
              onChange={handleChange}
          className="p-3 border h-11  w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
           
           />
        </div>
          </div>

      <button
        className={`rounded-md h-11 ${isEmpty ? 'border pointer-events-none border-gray-400 text-blue-400' : 'bg-blue-500 text-white hover:bg-blue-400'} rounded-md h-11 font-bold text-xl`}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? <span className="loading loading-spinner loading-md"></span> : "Sign Up"}
      </button>

      <p className="font-bold justify-self-end text-[14px]">
        <a href="/" className="text-blue-500 hover:text-blue-400 justify-self-end">
          Already have an account? Log in
        </a>
      </p>
    </form>
  );
}

export default SignUpForm;
