import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backEndLink } from '../../utils/Links.js';
import JobNotFound from '../notFound/JobNotFound.js';
import blackPencil from '../../assets/blackPencil.svg';


const JobDetail = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [jobInfo, setJobInfo] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [isEditing,setIsEditing] = useState(false);
  const [isDeleting,setIsDeleting] = useState(false);

  const [errorVal, setErrorVal] = useState('');
  const [editableBttn, setEditableBttn] = useState(false);
  const [editableBttn1, setEditableBttn1] = useState(false);
  const [editableBttn2, setEditableBttn2] = useState(false);
  const [editableBttn3, setEditableBttn3] = useState(false);
  const [inputs,setInputs] = useState(
                                    {"jobName":null,
                                    "openings":null,
                                    "clientName":null,
                                    "status":null,
                                    "salaryTo":null,
                                    "salaryFrom":null,
                                    "salaryRemark":null,
                                    "mandatorySkills":null,
                                    "optionalSkills":null,
                                    "remarks":null,
                                    "jobDescription":null
                                  })


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const deleteFunc = () => {
    setIsDeleting(true);
  
    const jobId = location.pathname.split('/').pop();
    let token = localStorage.getItem('token'); // Use let instead of const
  
    try {
  
      axios.delete(`${backEndLink}/jobs/delete?token=${token}&JobId=${jobId}`).then((response) => {
        console.log(response);
        setIsDeleting(false);
        navigate('/jobs?tab=10')
      });
    } catch (error) {
      console.error('Error:', error);
      setIsDeleting(false);
    }
  };
  

  const save = async () => {
    setIsEditing(true)
    const jobId = location.pathname.split('/').pop();
    const token = localStorage.getItem('token');
  
    console.log({ inputs,
      token: token,
      JobId: jobId})
    try {
      axios.put(`${backEndLink}/jobs/edit`, {
        inputs,
        token: token,
        JobId: jobId
      }).then((response)=>{
        setIsEditing(false)
        window.location.reload();
        // console.log(response)
        
      })

      // Add any additional handling based on the response, if needed
    } catch (error) {
      setIsEditing(false)

      console.error('Error:', error);
      setInputs(({"jobName":null,
      "openings":null,
      "clientName":null,
      "status":null,
      "salaryTo":null,
      "salaryFrom":null,
      "salaryRemark":null,
      "mandatorySkills":null,
      "optionalSkills":null,
      "remarks":null,
      "jobDescription":null
    }))
      // Handle errors, display a message to the user, or perform any necessary actions
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobId = location.pathname.split('/').pop();
        const token = localStorage.getItem('token');
        setIsSearching(true);

        const response = await axios.get(`${backEndLink}/jobs/getdetail?JobId=${jobId}&token=${token}`);
        setJobInfo(response.data.job);
        setIsSearching(false);
      } catch (error) {
        console.error('Error fetching job details:', error.response.data.error);
        setIsSearching(false);
        setErrorVal(error.response.data);
        // Handle the error as needed, e.g., show a user-friendly message
      }
    };

    fetchData();
  }, [location.pathname]);
  const [SearchMemberClicked, setSearchMemberClicked] = useState(false);
  
  return (
    <>
    <div className="bg-[rgb(226,232,240)] h-screen w-full overflow-clip">
    
      <div className="flex">
        <div className="h-[calc(100vh-64px)]">
        </div>
        <div className={`p-[15px]  grow bg-green  max-md:p-0`}>
          {!errorVal ? (
            <div className="w-full h-full bg-white shadow-2xl rounded-xl overflow-clip">
              <progress className={`progress w-full h-[1px] ${!isSearching ? 'hidden' : ''}`}></progress>
              <div className={`${isSearching ? 'hidden' : ''}`}>
                <div className="bg-[#ffe39c] flex justify-between pl-3 pr-3 pt-3 pb-1">
                  {/* Left Section */}
                  <div className="grid w-[50%] justify-start ">
                    <div className="flex items-start gap-2">
                      <div className="grid  gap-2  justify-items-start ">
                        <p className='max-md:text-[14px]'>Name:</p>
                        <p className='max-md:text-[14px]'>Postion:</p>
                      </div>
                      <div className='grid'>

                        {!editableBttn ? (
                          <div className='grid gap-3 justify-items-start '>
                            <p className='font-bold max-md:text-[12px] h-5  overflow-y-auto'>{jobInfo.jobName}</p>
                            <p className='font-bold max-md:text-[12px]'>{jobInfo.openings}</p>
                          </div>
                        ):(
                          <div className='grid gap-2 mt-1'>
                          <input
                            type="text"
                            className="rounded-md outline-none h-6 p-1 pl-2 pr-2 w-[100%] max-w-[11.5rem] border bg-transparent border-black"
                            onChange={handleInputChange}
                            value = {inputs.jobName}
                            name = "jobName"
                          />
                            <input
                        type="number"
                        className="rounded-md outline-none h-6 p-1 pl-2 pr-2 w-[100%] max-w-[11.5rem] border bg-transparent border-black"
                        value = {inputs.openings}
                        name = "openings"
                        onChange={handleInputChange}

                      />

                        </div>
                        )}

                      </div>
                      <img src={blackPencil} onClick={() => setEditableBttn(!editableBttn) } className='cursor-pointer w-4 mt-1' />
                   
                      
                    
                    </div>
                  </div>
                  {/* Right Section */}
                  <div className="flex flex-col items-end justify-start gap-3 w-[50%]">
                    <div className="flex items-center gap-2">
                     
                      <button 
                        className="h-[32px] w-[100px] flex gap-1 items-center justify-center bg-[#ff6f3c] text-slate-50 font-bold p-2 rounded hover:bg-[#bd4f27] transition-all duration-300 "
                        onClick={save}>
                          {isEditing?(
                          <span className="loading loading-spinner loading-sm"></span>):(
                        <p>SAVE</p>)}
                      </button>
                    </div>
                    <button
                      className={`border-2 w-[100px] border-[#ff6f3c] rounded pl-1 pr-1 font-bold text-[#ff6f3c] hover:bg-[#ff6f3c] hover:text-white  transition-all duration-300 h-[32px] `}
                      onClick={deleteFunc}
                    >
                     {isDeleting?(
                          <span className="loading loading-spinner loading-sm bg-[#ff6f3c]"></span>):(
                        <p>DELETE</p>)}
                    </button>
                    
                  </div>
                </div>
                {/* Job Detail Section */}
                <div className="h-full p-5   grid md:grid gap-2 ">
                <div className='flex gap-5'>
                  <div className="flex flex-col shadow-md w-[90%] rounded-md overflow-clip border">
                    <div className="bg-[#fce9bd] h-[2rem] flex items-center justify-between p-2">
                      <div className = 'flex items-center gap-2'>
                        <h1 className="font-bold text-[17px] flex pl-3">Job Detail</h1>
                        <img src={blackPencil} onClick={() => setEditableBttn1(!editableBttn1) } className='cursor-pointer w-4' />
                      </div>
                      {/* <button className='bg-[#ee8660] hover:bg-[#ff6f3c] rounded text-white pl-1 pr-1 ml-1' disabled = {!editableBttn1}>Save</button> */}
                    </div>
                    <div className="flex gap-5 p-3 ">
                      <div className="grid justify-items-start gap-2">
                        <p className="text-[12px]">Client Name</p>
                        <p className="text-[12px]">Status</p>
                        <p className="text-[12px]">Salary From</p>
                        <p className="text-[12px]">Salary To</p>
                        <p className="text-[12px]">Salary Remarks</p>
                      </div>
                      {!editableBttn1?
                      (<div className="grid justify-items-start gap-2">
                        <p className="text-[12px] font-bold">{jobInfo.clientName}</p>
                        <p className={`text-[12px] font-bold ${jobInfo.status == 'Active'?"text-green-500":'text-red-500'}`}>{jobInfo.status}</p>
                        <p className="text-[12px] font-bold">{jobInfo.salaryFrom}</p>
                        <p className="text-[12px] font-bold">{jobInfo.salaryTo}</p>
                        <p className="text-[12px] font-bold">{jobInfo.salaryRemark}</p>
                      </div>):
                      (
                    <div className="grid justify-items-start gap-2">
                      <input
                        type="text"
                        className="rounded-md outline-none text-[12px]  h-5 border pl-2 pr-2 w-full max-w-[10rem]  border-[#155263]"
                        onChange={handleInputChange}
                        // value = {jobInfo.clientName}
                        value = {inputs.clientName}
                        name = "clientName"
                      />
                      <select
                        className={`rounded-md outline-none text-[12px]  h-5 border pl-2 pr-2 w-full max-w-[10rem]  border-[#155263] `}
                        onChange={handleInputChange}
                        value={inputs.status}
                        name="status"
                      >
                        <option selected disabled>{jobInfo.status}</option>
                        <option value="Active">Active</option>
                        <option value="Passive">Passive</option>
                      </select>


                      <input
                        type="number"
                        className="rounded-md outline-none text-[12px]  h-5 border pl-2 pr-2 w-full max-w-[10rem]  border-[#155263]"
                        onChange={handleInputChange}
                        value = {inputs.salaryFrom}
                        name = "salaryFrom"
                      /> 
                      <input
                        type="number"
                        className="rounded-md outline-none text-[12px]  h-5 border pl-2 pr-2 w-full max-w-[10rem]  border-[#155263]"
                        onChange={handleInputChange}
                        value = {inputs.salaryTo}
                        name = "salaryTo"
                      />
                      <input
                        type="text"
                        className="text-[12px] rounded-md outline-none h-5 border pl-2 pr-2 w-full max-w-[10rem]  border-[#155263]"
                        onChange={handleInputChange}
                        value = {inputs.salaryRemark}
                        name = "salaryRemark"
                      />
                    </div>)
                      
                      }
                    </div>
                  </div>
                  {/* Additional Information Section */}
                  <div className="grid shadow-md w-[90%] rounded-md overflow-clip border">
                  <div className="bg-[#fce9bd] h-[2rem] flex items-center justify-between p-2">
                        <div className = 'flex items-center gap-2'>
                      <h1 className="font-bold text-[17px] flex pl-3">Additional Information</h1>
                      <img src={blackPencil} onClick={() => setEditableBttn2(!editableBttn2) } className='cursor-pointer w-4' />
                    </div>
                    {/* <button className='bg-[#ee8660] hover:bg-[#ff6f3c] rounded text-white pl-1 pr-1 ml-1' disabled = {!editableBttn2} onClick={save}>Save</button> */}
                    </div>
                    <div className="flex gap-5 p-3 ">
                      <div className="grid justify-items-start gap-2">
                        <p className="text-[12px]">Mandatory Skills</p>
                        <p className="text-[12px]">Optional Skills</p>
                        <p className="text-[12px]">Remarks</p>
                       
                      </div>
                      
                      {!editableBttn2?(<div className="grid justify-items-start gap-2 ">
                        <p className="text-[12px] overflow-y-auto h-5  font-bold">{jobInfo.mandatorySkills}</p>
                        <p className="text-[12px] overflow-y-auto h-5 font-bold">{jobInfo.optionalSkills}</p>
                        <p className="text-[12px] overflow-y-auto h-5 font-bold">{jobInfo.remarks}</p>
                       
                      </div>):(
                      <div className="grid justify-items-start gap-2">
                     <input
                    type="text"
                    className="rounded-md outline-none text-[12px]  h-5 border  border-[#155263] pl-2 pr-2 w-full max-w-[13rem]"
                    onChange={handleInputChange}
                    value = {inputs.mandatorySkills}
                    name = "mandatorySkills"
                  /><input
                  type="text"
                  className="rounded-md outline-none text-[12px]  h-5 border  border-[#155263] pl-2 pr-2 w-full max-w-[13rem]"
                  onChange={handleInputChange}
                  value = {inputs.optionalSkills}
                  name = "optionalSkills"
                /><input
                type="text"
                className="rounded-md outline-none text-[12px]  h-5 border  border-[#155263] pl-2 pr-2 w-full max-w-[13rem]"
                onChange={handleInputChange}
                value = {inputs.remarks}
                name = "remarks"
              />
                    </div>)}
                    </div>
                  </div>
                  </div>
                <div className='flex gap-5'>

                  {/* Description Section */}
                  <div className="grid shadow-md w-[90%] rounded-md overflow-clip border">
                  <div className="bg-[#fce9bd] h-[2rem] flex items-center justify-between p-2">
                        <div className = 'flex items-center gap-2'>
                      <h1 className="font-bold text-[17px] flex pl-3">Description</h1>
                      <img src={blackPencil} onClick={() => setEditableBttn3(!editableBttn3) } className='cursor-pointer w-4' />
                    </div>
                    </div>
                    <div className="p-2 ">
                      {!editableBttn3?(<p className="mb-2 text-black dark:text-gray-400 text-left p-3 text-[12px] font-bold">
                        {jobInfo.jobDescription}
                      </p>):(
                        <textarea 
                        type= 'text'
                        className="rounded-md outline-none  border pl-2 pr-2 w-[100%] h-[100%]  border-[#155263]"
                        onChange={handleInputChange}
                        value = {inputs.jobDescription}
                        name = "jobDescription"
                        
                        />
                      )}
                    </div>
                </div>
                <div className='w-[90%]'></div>
                </div>
                </div>
              </div>
            </div>
          ) : (
            <JobNotFound />
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default JobDetail;
