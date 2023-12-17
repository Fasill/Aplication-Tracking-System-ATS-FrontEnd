import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 
import { backEndLink } from '../../utils/Links';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CandidateForm = (props) => {
  const [file, setFile] = useState(null);
  const [isLoading,setIsLoading] = useState(false)

  const validationSchema = yup.object().shape({
    Name: yup.string().required('Name is required'),
    PhoneNumber: yup.string().required('Phone Number is required'),
    EmailID: yup.string().email('Invalid email').required('Email is required'),
    TotalExperience: yup.number().required('Total Experience is required'),
    Education: yup.string().required('Education is required'),
    NoticePeriod: yup.string().required('Notice Period is required'),
    CurrentLocation: yup.string().required('Current Location is required'),
    Skills: yup.string().required('Skills are required'),
    CurrentCTC: yup.number().required('Current CTC is required'),
    ExpectedCTC: yup.number().required('Expected CTC is required'),
    Remarks: yup.string().required('Remarks are required'),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { register, handleSubmit, formState: { errors } } = methods;
  
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const notify = () => {
    toast.success('candidate added Successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  
  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const formData = new FormData();
  
      formData.append('filename', file, file.name);
  
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
  
      const token = localStorage.getItem('token');
      formData.append('token', token);
      formData.append('jobId', props.jobId);
      console.log(formData);

      
      const response = await axios.post(`${backEndLink}/upload-resume?token=${token}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data);
      setIsLoading(false)
      // Check if the response status indicates success
      if (response.status === 200) {
        notify();
      } else {
        // Handle error response
        console.error('Error submitting form. Status:', response.status);
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setIsLoading(false)

    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className='w-full h-full grid items-center justify-center'>
     <ToastContainer/>
    
      <div>
        <h1 className='text-[48px] text-[#3770da] '>Candidate Registration Form</h1>
      </div>
      <div className='flex gap-2'>
        <div className="text-black max-w-[349px] w-full grid justify-items-start my-4">
          <label className='flex gap-1'>
            <p>Name: </p> <p className='text-red-500'>{errors.Name?.message}</p>
          </label>
          <input 
            {...register('Name')} 
            className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
          />
          <p></p>
        </div>
        <div className="text-black max-w-[349px] w-full grid justify-items-start my-4">
          <label className='flex gap-1'>
            <p>Phone:</p> <p className='text-red-500'>{errors.PhoneNumber?.message}</p>
          </label>
          <input 
          { ...register('PhoneNumber')}
           className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"

            
          />
        </div>
      </div>

      <div className='flex gap-2'>
        <div className="text-black max-w-[349px] w-full grid justify-items-start my-4">
          <label className='flex gap-1'>
            <p>Email ID:</p> <p className='text-red-500'>{errors.EmailID?.message}</p>
          </label>
          <input 
            {...register('EmailID')} 
            className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
          />
        </div>
        <div className="text-black max-w-[349px] w-full grid justify-items-start my-4">
          <label className='flex gap-1'>
            <p>Total Experience:</p> <p className='text-red-500'>{errors.TotalExperience?.message}</p>
          </label>
          <input 
            type="number" 
            required
            {...register('TotalExperience')} 
            className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
          />
        </div>
      </div>

      <div className='flex gap-2'>
        <div className="text-black max-w-[349px] w-full grid justify-items-start my-4">
          <label className='flex gap-1'>
            <p>Education:</p> <p className='text-red-500'>{errors.Education?.message}</p>
          </label>
          <input 
            {...register('Education')} 
            className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
          />
        </div>
        <div className="text-black max-w-[349px] w-full grid justify-items-start my-4">
          <label className='flex gap-1'>
            <p>Notice Period:</p> <p className='text-red-500'>{errors.NoticePeriod?.message}</p>
          </label>
          <input 
            {...register('NoticePeriod')} 
            className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
          />
        </div>
      </div>

      <div className='flex gap-2'>
        <div className="text-black max-w-[349px] w-full grid justify-items-start my-4">
          <label className='flex gap-1'>
            <p>Current Location:</p> <p className='text-red-500 text-[14px]'>{errors.CurrentLocation?.message}</p>
          </label>
          <input 
            {...register('CurrentLocation')} 
            className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
          />
        </div>
        <div className="text-black max-w-[349px] w-full grid justify-items-start my-4">
          <label className='flex gap-1'>
            <p>Skills:</p> <p className='text-red-500'>{errors.Skills?.message}</p>
          </label>
          <input 
            {...register('Skills')} 
            className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
          />
        </div>
      </div>

      <div className='flex gap-2'>
        <div className="text-black max-w-[349px] w-full grid justify-items-start my-4">
          <label className='flex gap-1'>
            <p>Current CTC:</p> <p className='text-red-500'>{errors.CurrentCTC?.message}</p>
          </label>
          <input 
            type="number" 
            {...register('CurrentCTC')} 
            required 
            className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
          />
        </div>
        <div className="text-black max-w-[349px] w-full grid justify-items-start my-4">
          <label className='flex gap-1'>
            <p>Expected CTC:</p> <p className='text-red-500'>{errors.ExpectedCTC?.message}</p>
          </label>
          <input 
            type="number" 
            required 
            {...register('ExpectedCTC')} 
            className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
          />
        </div>
      </div>

      <div className='flex gap-2'>
        <div className="text-black max-w-[349px] w-full grid justify-items-start my-4">
          <label className='flex gap-1'>
            <p>Remarks:</p> <p className='text-red-500'>{errors.Remarks?.message}</p>
          </label>
          <input 
            {...register('Remarks')} 
            className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
          />
        </div>
        <div className="text-black max-w-[349px] w-full grid justify-items-start my-4">
          <label className='flex gap-1'>
            <p>Resume:</p> <p className='text-red-500'>{errors.filename?.message}</p>
          </label>
          <input 
            
            type="file" onChange={handleFileChange} 
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
      </div>

      <button type="submit" className="mt-4 bg-[#3770da] text-white px-4 py-2 rounded-md" disabled={isLoading}>
        <p className={`${isLoading? 'hidden':''}`}>Submit</p>
        <span className={`loading loading-spinner loading-md ${!isLoading?'hidden':''}`}></span>
      </button>
    </form>
  );
};

export default CandidateForm;
