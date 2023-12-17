import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {backEndLink} from '../../utils/Links.js';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


const JobForm = () => {
  
  const [isSubmited,setIsSubmitted] =  useState(false)

  const [jobData, setJobData] = useState({
    jobName: '',
    jobDescription: '',
    salaryFrom: '',
    salaryTo: '',
    salaryRemark: '',
    mandatorySkills: '',
    optionalSkills: '',
    clientName: '',
    clientEmail:'',
    openings: '',
    remarks: '',
    adminGroups: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

    // Use the effect to check if any of the form fields are empty
  useEffect(() => {
    const isFormEmpty = Object.values(jobData).some(value => value === '');
    setIsSubmitted(isFormEmpty);
  }, [jobData]);
  const notify = () => {toast.success('Job Created Seccefully', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    })};
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleAdminGroupChange = (e) => {
    const { value } = e.target;
    setJobData({ ...jobData, adminGroups: [...jobData.adminGroups, value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    jobData.token = localStorage.getItem('token')
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${backEndLink}/jobs/add`, jobData);
      console.log('Job created:', response.data);
      setIsSubmitted(true);

      notify();
      // navigate('/jobs')

      setJobData({
        jobName: '',
        jobDescription: '',
        salaryFrom: '',
        salaryTo: '',
        salaryRemark: '',
        mandatorySkills: '',
        optionalSkills: '',
        clientName: '',
        clientEmail:'',
        openings: '',
        remarks: '',
        adminGroups: [],
      });

      // Handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error('Error creating job:', error);
      // Handle error, e.g., show an error message
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className='bg-[#E1EBFF] rounded-[8rem] mt-[10rem] w-full h-full flex items-center justify-center p-2'>
     <ToastContainer/>
      
      <div className='bg-white w-full max-w-[1100px]  rounded-lg  shadow-2xl grid pb-[3rem] justify-items-center relative ' >
      {/* <dv className='bg-[#ff6f3c] w-full max-w-[1000px] h-[46px] rounded-lg absolute mt-[-1.5rem]'></dv> */}
      <h1 className='text-[3rem] max-[500px]:text-[2rem] font-bold text-[#6290e6]'>Job Creation Form</h1>
      <div className='  w-[100%]  flex justify-center rounded-lg items-center pb-[2rem] p-3 mt-[25px]'>
      <div className='  grid gap-5 w-full max-w-[40rem] self-center justify-self-center'>
          <div className="text-black grid justify-items-start">
          
            <label className ='font-bold text-[#113f67]'>Job or Requirement Name </label>
            <input
              type="text"
              name="jobName"
              value={jobData.jobName}
              onChange={handleInputChange}
              required
              className="p-3 border h-11 max-w-[40rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
          
          />
          </div>
          <div className="text-black grid justify-items-start">

            <label className ='font-bold text-[#113f67]'>Job Description</label>
            <textarea
              name="jobDescription"
              value={jobData.jobDescription}
              onChange={handleInputChange}
              className="p-3 border h-[10rem] max-w-[40rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
            
            />
          </div>

        <div className='flex gap-3  max-[500px]:grid '>
          <div className="text-black  grid justify-items-start  w-[50%]  max-[500px]:w-[100%]">
            <label className ='font-bold text-[#113f67]'>Salary Range in LPA </label>
            <div className='flex justify-center items-center gap-1'>
            <input
              type="number"
              name="salaryFrom"
              value={jobData.salaryFrom}
              onChange={handleInputChange}
              className="p-3 border h-11 max-w-[45%] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"

            />
            <label className ='font-bold text-[#113f67]'>To</label>
          
            <input
              type="number"
              name="salaryTo"
              value={jobData.salaryTo}
              onChange={handleInputChange}
              className="p-3 border h-11 max-w-[45%] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"

            />
            </div>
          </div>

            <div className="text-black grid justify-items-start w-[50%]  max-[500px]:w-[100%]">

              <label className ='font-bold text-[#113f67]'>Salary Remark</label>
              <input
                type="text"
                name="salaryRemark"
                value={jobData.salaryRemark}
                onChange={handleInputChange}
                className="p-3 border h-11 max-w-[30rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"

              />
            </div>
          </div>

          <div className='flex gap-3 max-[500px]:grid'>

          <div className="text-black grid justify-items-start  w-[50%] max-[500px]:w-[100%]">

            <label className ='font-bold text-[#113f67]'>Mandatory Skills</label>
            <textarea
              name="mandatorySkills"
              value={jobData.mandatorySkills}
              onChange={handleInputChange}
              className="p-3 border h-[5rem] w-full max-w-[40rem]  border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"

            />
          </div>

        <div className="grid text-black  justify-items-start w-[50%] max-[500px]:w-[100%]">

          <label className ='font-bold text-[#113f67]'>Optional Skills</label>
          <textarea
            name="optionalSkills"
            value={jobData.optionalSkills}
            onChange={handleInputChange}
            className="p-3 border h-[5rem] w-full   border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"


          />
        </div>
        </div>
        <div className='flex gap-3 max-[500px]:grid '>
        <div className="text-black grid justify-items-start  w-[50%] max-[500px]:w-[100%]">

          <label className ='font-bold text-[#113f67]'>Client Name</label>
          <input
            type="text"
            name="clientName"
            value={jobData.clientName}
            onChange={handleInputChange}
            className="p-3 border h-11 max-w-[30rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"

          />
        </div>
        <div className="text-black grid justify-items-start  w-[50%] max-[500px]:w-[100%]">

          <label className ='font-bold text-[#113f67]'>client Email</label>
          <input
            type="email"
            name="clientEmail"
            value={jobData.clientEmail}
            onChange={handleInputChange}
            className="p-3 border h-11 max-w-[30rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"

          />
        </div>
        </div>
        <div className='flex gap-3 max-[500px]:grid '>

        <div className="text-black grid justify-items-start w-[50%]">

          <label className ='font-bold text-[#113f67]'>Remarks</label>
          <input
            type="text"
            name="remarks"
            value={jobData.remarks}
            onChange={handleInputChange}
            className="p-3 border h-11 max-w-[30rem]  w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"

          />
        </div>
          <div className="text-black grid justify-items-start  w-[50%] max-[500px]:w-[100%]">

            <label className ='font-bold text-[#113f67]'>openings</label>
            <input
              type="number"
              name="openings"
              value={jobData.openings}
              onChange={handleInputChange}
              className="p-3 border h-11 max-w-[30rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
            />

          </div>
       </div>
        <button
              className="transition-all duration-300 text-white bg-[#6290e6] hover:bg-[#3770da] max-w-[30rem] w-full justify-items-start rounded-md h-11 font-bold text-xl flex items-center justify-center justify-self-center mt-2"
              type="submit"
              disabled={isSubmitting }
            >
             {isSubmitting?<span className="loading loading-spinner loading-md"></span>:<p>Create Job</p>}
        </button>
      </div>
      </div>
      </div>
    </form>
  );
};

export default JobForm;
