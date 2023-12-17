import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { backEndLink } from '../../utils/Links';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jet from '../../assets/jet.svg';

const SendEmailForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [checkbox,setCheckbox] = useState(true)
  const validationSchema = yup.object().shape({
    subject: yup.string(),
    text: yup.string(),
    status: yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleCheckbox=(e) =>{
      setCheckbox(!checkbox)
      console.log("eee",e.target.value)
  }
  const notify = () => {
    toast.success('Email Sent Seccefully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('token');
      data.token= token;
      data.JobId= props.jobId
      axios.post(`${backEndLink}/client/NotifyClient`,data)
      .then((response)=>{
        setIsLoading(false)
        notify()
        methods.setValue('subject', '');
        methods.setValue('text', '');
        methods.setValue('attachFile', false);
        methods.setValue('status', 'All');
      }).catch((e)=>{
        console.log(e)
        setIsLoading(false)
      })

    } catch (error) {
      console.error('Error submitting form:', error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="w-full h-full grid gap-3 ">
      <ToastContainer />

      <div className="text-black  w-full grid justify-items-start ">
        <label className="flex gap-1">
          <p>
            <p className="text-[1.2rem] ">Subject:</p>{' '}
          </p>{' '}
          <p className="text-red-500">{errors.subject?.message}</p>
        </label>
        <input
          {...register('subject')}
          className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
        />
        <p></p>
      </div>

      <div className="text-black  w-full grid justify-items-start ">
        <label className="flex gap-1">
          <p>
            <p className="text-[1.2rem] ">Message:</p>{' '}
          </p>{' '}
          <p className="text-red-500">{errors.text?.message}</p>
        </label>
        <textarea
          {...register('text')}
          className="p-3 border h-[7rem] max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
        />
        <p></p>
      </div>

      <div className="text-black  w-full grid justify-items-start ">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register('attachFile')}
            className="checkbox"
            onChange={handleCheckbox}
          />  
          <p>Send candidate status attachment</p>
        </div>
      </div>

      <div className="text-black  w-full grid justify-items-start ">
        <label className="flex gap-1">
          <p>
            <p className="text-[1.2rem] ">Candidates Status:</p>{' '}
          </p>{' '}
          <p className="text-red-500">{errors.status?.message}</p>
        </label>
        <select
          {...register('status')}
          disabled = {checkbox}
          className="cursor-pointer p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
        >
          
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="Round 1">Round 1</option>
          <option value="Round 2">Round 2</option>
          <option value="Round 3">Round 3</option>
          <option value="Round 4">Round 4</option>
          <option value="Round 5">Round 5</option>
          <option value="Rejected">Rejected</option>
          <option value="Hold">Hold</option>
          <option value="Offered">Offered</option>
          <option value="Joined">Joined</option>
        </select>
      </div>

      <button type="submit" className="mt-4 bg-[#3770da] text-white px-4 py-2 rounded-md text-[1.2rem]" disabled={isLoading}>
        <div className={`${isLoading ? 'hidden' : 'flex items-center justify-center gap-2 font-bold'}`}><p>Send</p> <img src={jet}/></div>
        <span className={`loading loading-spinner loading-md ${!isLoading ? 'hidden' : ''}`}></span>
      </button>
    </form>
  );
};

export default SendEmailForm;
