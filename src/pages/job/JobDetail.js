import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { backEndLink } from '../../utils/Links.js';
import CommentSection from '../../components/listingJobs/CommentSection.js';
import upload from '../../assets/upload.svg';
import copy from '../../assets/copy.svg';
import download from '../../assets/download.svg';
import UsersTable from '../../components/listingJobs/usersTable.js';
import CandidateForm from '../../components/Forms/CandidateForm.js';
import JobNotFound from '../notFound/JobNotFound.js';
import pencil from '../../assets/pencil.svg' ;
import CandidateTable from '../../components/tables/CandidateTable.js';
import SendEmailForm from '../../components/Forms/SendEmailForm.js';

const JobDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [JobInfo, setJobInfo] = useState({});
  const [activeTab, setActiveTab] = useState('');
  const [navigateTab, setNavigateTab] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isMapClicked,setIsMapClicked] = useState(false);
  const [errorVal, setErrorVal] = useState('');
  const [userRole,setUserRole] = useState('');

  const [candidates,setCandidates] = useState([])
  const jobId = location.pathname.split('/').pop();
  const [searchInput,setSearchInput] = useState('');
  const [user,setUser] = useState('Recruiter');

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname])
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobId = location.pathname.split('/').pop();
        console.log(jobId);
        const token = localStorage.getItem('token');
        setIsSearching(true);

        const response = await axios.get(`${backEndLink}/jobs/getdetail?JobId=${jobId}&token=${token}`);

        setJobInfo(response.data.job);
        setIsSearching(false);
      } catch (error) {
        console.error('Error fetching job details:', error.response.data.error);
        setIsSearching(false);
        setErrorVal(error.response.data)
      }
    };

    fetchData();
  }, [location.pathname]);
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        // Retrieve the token from localStorage
        const jobId = location.pathname.split('/').pop();
        console.log(jobId);
        const token = localStorage.getItem('token');
        // Make the API request to get the user role
        const userRoleResponse = await axios.get(`${backEndLink}/jobs/retrieveUserRole?JobId=${jobId}&token=${token}`);
        
        // Update state with the received user role
        setUserRole(userRoleResponse.data.role);
        setUser(userRoleResponse.data.role)

      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    const fetchData = async () => {
      try {
        // Fetch user role first
        await fetchUserRole();

        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // Make the API request using axios with the token and user role in the query parameters
        const response = await axios.get(`${backEndLink}/${user === 'Recruiter' ? 'get-candidates' : 'get-all-candidates'}`, {
          params: {
            jobId: jobId,
            token: token,
            Name: searchInput
          },
        });

        // Update state with the received data
        setCandidates(response.data.candidates);

      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchData();
  }, [searchInput,user]);

  const handleSearchInputChange = (event)=>{

    setSearchInput(event.target.value)
  
  }

  return (
    <>
      <div className={` h-screen w-full overflow-clip `}>
        

        <div className='flex'>
          <div className='h-[calc(100vh-64px)]'>
          </div>

          <div className={`p-[15px]  grow bg-green  `}>
            {!errorVal?(
            <div className='w-full h-full bg-white shadow-2xl rounded-xl overflow-clip'>
              <progress className={`progress w-full h-[1px] ${!isSearching ? 'hidden' : ''}`}></progress>
              <div className={`${isSearching ? 'hidden' : ''}`}>
                <div className='bg-[#E9F0FD] flex justify-between pl-3 pr-3 pt-3 pb-1'>
                  <div className='grid w-[50%] justify-start '>
                    <div className='grid gap-2 justify-items-start'>
                      <div className='flex items-center gap-2'>
                        <h1 className='text-[20px] font-bold max-md:text-[14px] '>{JobInfo.jobName}</h1>
                        <p
                         className={`font-bold transition-all duration-300 cursor-pointer hover:text-[#376875] text-[#155263] max-md:hidden flex gap-2 underline underline-offset-4  ${ userRole !== "Admin" ? 'hidden':''}`}
                         onClick={()=>document.getElementById('my_modal_5').showModal()}
                         
                         >Notify Client</p>
                      
                      </div>
                      <div className='grid justify-items-start items-center'>
                        <p>position 2</p>
                        <p>PAN {JobInfo.addedBy}</p>
                      </div>
                      <div className='flex gap-4 justify-start h-[20px] items-center w-full pb-1 max-md:justify-center max-md:max-w-[100%]'>
                        <div
                          className={`max-md:hidden group flex justify-between  cursor-pointer hover:border-b-2 ${
                            activeTab === '6' ? 'border-b-2 border-b-blue-400 ' : ''
                          }`}
                          onClick={() => navigateTab({ 'tab': 6 })}
                        >
                          <p
                            className={`text-[#575d63] group-hover:text-[#2b3a49] max-lg:text-[0.8rem] ${
                              activeTab === '6' ? 'text-blue-400' : ''
                            }`}
                          >
                            Job
                          </p>
                        </div>

                        <div
                          className={`max-md:hidden group flex justify-between  cursor-pointer hover:border-b-2 ${
                            activeTab === '7' ? 'border-b-2 border-b-blue-400' : ''
                          }`}
                          onClick={() => navigateTab({ 'tab': 7 })}
                        >
                          <p
                            className={`text-[#575d63] group-hover:text-[#2b3a49] max-lg:text-[0.8rem] ${
                              activeTab === '7' ? 'text-blue-400' : ''
                            }`}
                          >
                            Candidates
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col items-end justify-start gap-3 w-[50%]'>
                    <div className='flex items-center gap-2'>
                      <div 
                        className = ''
                        onClick={()=>document.getElementById('my_modal_3').showModal()}
                      >
                        <p className='font-bold transition-all duration-300 cursor-pointer hover:text-[#376875] text-[#155263] max-md:hidden flex gap-2 '><p>{candidates.length}</p>Resumes Required</p>
                      </div>
                      <button className='h-[32px]  w-[156px] flex gap-1 items-center bg-[#6290e6] hover:bg-[#3770da] text-slate-50 font-bold p-2 rounded  transition-all duration-300 '
                          onClick={()=>document.getElementById('my_modal_2').showModal()}
                      >
                        <img src={upload} alt='upload-icon' /> Upload Resume
                      </button>
                    </div>
                      {/* <button className='border-2 border-[#2cadd1] rounded p-1 font-bold text-[#2cadd1] hover:bg-[#2cadd1] hover:text-white  transition-all duration-300 '> */}
                      <button className= {`h-[32px] w-[156px] flex gap-2 items-center justify-center bg-[#6290e6] text-slate-50 font-bold p-2 rounded hover:bg-[#3770da] transition-all duration-300   ${ userRole !== "Admin" ? 'hidden':''}`} onClick={()=>navigate(`/jobs/edit/${JobInfo.JobId}`)} >
                        Edit <img src={pencil} />
                      </button>
                      <button className= {`border-2 w-[156px] border-[#6290e6] rounded pl-1 pr-1 font-bold text-[#6290e6] hover:bg-[#3770da] hover:border-[#3770da] hover:text-white  transition-all duration-300 h-[32px]  ${ userRole !== "Admin" ? 'hidden':''}`} onClick={()=>setIsMapClicked(true)} >
                        Map User
                      </button>
                      { userRole !== "Recruiter" ? (<div className={` ${!isMapClicked?'hidden':''} `}><UsersTable isMapClicked={isMapClicked} userRole = {userRole} className={` ${!isMapClicked?'hidden':''} `}/></div>):(<h1></h1>) }
                              

                          
                  </div>
                </div>
                <div className='flex h-full '>
                  <div className='w-[50%] h-[408px] overflow-hidden  border-[#5f473e] '>
                    <CommentSection />
                  </div>
                  <div className='w-[50%] h-[408px] overflow-y-scroll p-5 border-l border-[#5f473e]'>
                    <div className="  collapse collapse-arrow bg-base-200 shadow-2xl rounded-none rounded-t-xl "  >
                      <input type="radio" name="my-accordion-2" checked="checked" />
                      <div className="collapse-title text-[17px] font-medium bg-[#E9F0FD] flex items-center justify-start">
                        Job Details
                      </div>
                      <div className="collapse-content bg-white  ">
                        <div className="flex gap-5 p-3 ">
                          <div className="grid justify-items-start gap-2">
                            <p className="text-[12px]">Client Name</p>
                            <p className="text-[12px]">Domain</p>
                            <p className="text-[12px]">Accepted</p>
                            <p className="text-[12px]">Status</p>
                            <p className="text-[12px]">Salary</p>
                          </div>
                          <div className="grid justify-items-start gap-2">
                            <p className="text-[12px] font-bold">{JobInfo.clientName}</p>
                            <p className="text-[12px] font-bold">{JobInfo.addedBy}</p>
                            <p className="text-[12px] font-bold">Time Stamp</p>
                            <p className="text-[12px] font-bold">Active</p>
                            <p className="text-[12px] font-bold">{JobInfo.salaryFrom}-{JobInfo.salaryTo}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className=" collapse collapse-arrow bg-base-200 rounded-none shadow-xl">
                      <input type="radio" name="my-accordion-2" />
                      <div className="collapse-title text-[17px] font-medium bg-[#E9F0FD] flex gap-2 items-center justify-start">
                        Description
                        <img src={copy} />
                      </div>
                      <div className="collapse-content bg-white">
                        <div className="p-4">
                          <p className="mb-2 text-black dark:text-gray-400 text-left p-3">
                            {JobInfo.jobDescription}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className=" collapse collapse-arrow bg-base-200 rounded-none shadow-xl">
                      <input type="radio" name="my-accordion-2" />
                      <div className="collapse-title text-[17px] font-medium bg-[#E9F0FD] flex gap-2 items-center justify-start">
                        Client Description
                      </div>
                      <div className="collapse-content bg-white">
                        <div className="p-4">
                          <p className="mb-2 text-black dark:text-gray-400 text-left">
                            {/* Client Description content goes here */}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className=" collapse collapse-arrow bg-base-200 rounded-none shadow-md rounded-b-xl">
                      <input type="radio" name="my-accordion-2" />
                      <div className="collapse-title text-[17px] font-medium bg-[#E9F0FD] flex gap-2 items-center justify-start">
                        Sourcing Guidelines
                        <img src={download} />
                      </div>
                      <div className="collapse-content bg-white">
                        <div className="p-4">
                          <p className="mb-2 text-black dark:text-gray-400 text-left">
                            {/* Sourcing Guidelines content goes here */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>):(<JobNotFound/>)}
          </div>
        </div>
      </div>
            
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box  w-11/12 max-w-5xl h-full overflow-clip">

          <div className='p-5 h-full overflow-y-scroll'>
              <CandidateForm jobId = {jobId} />
          </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box  w-11/12 max-w-5xl h-full overflow-clip">
          <div>
          <input
            type="text"
            value={searchInput}  
            placeholder='Search'
            className="p-3 pl-[2rem]  h-8  w-full border-b border-b-gray-400 focus:outline-none focus:border-blue-500  bg-transparent"

            onChange={handleSearchInputChange}  
          />
          </div>
          <div className='p-5 h-full overflow-y-auto overflow-x-clip'>

            <CandidateTable candidates = {candidates} />
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <dialog id="my_modal_5" className="modal ">
          <div className="modal-box  w-11/12 max-w-2xl h-full overflow-clip bg-gray-50">
         
          <div className='p-5 h-full overflow-y-auto overflow-x-clip'>
            <SendEmailForm jobId = {jobId} />
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
         
        </dialog>
  </>
  );
};

export default JobDetail;
