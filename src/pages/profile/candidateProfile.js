import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { info } from '../../store/CandidateInfo.js';
import { backEndLink } from '../../utils/Links.js';
import { useLocation,useNavigate } from 'react-router-dom';
import downloadSvg from '../../assets/download.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CandidateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const collapseStatus = useSelector((state) => state.candidate.value);
  const [candidateInfo, setCandidateInfo] = useState({});
  const [role,setRole] = useState('')
  const [formData, setFormData] = useState({
    Name: candidateInfo.Name || "",
    EmailID: candidateInfo.EmailID || "",
    PhoneNumber: candidateInfo.PhoneNumber || "",
    Remarks: candidateInfo.Remarks || "",
    CurrentCTC: candidateInfo.CurrentCTC || "",
    ExpectedCTC: candidateInfo.ExpectedCTC || "",
    CurrentLocation: candidateInfo.CurrentLocation || "",
    Education: candidateInfo.Education || "",
    NoticePeriod: candidateInfo.NoticePeriod || "",
    Skills: candidateInfo.Skills || "",
    status: candidateInfo.status || "",

  });

  const notify = () => {
    toast.success('candidate Information updated Successfully', {
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

  const location = useLocation();
  const { pathname } = location;

  const handleIframeLoad = () => {
    setIsPdfLoading(false);
  };
  useEffect(() => {
    const email = pathname.substring(pathname.lastIndexOf('/') + 1);
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${backEndLink}/get-candidates-by-email?EmailID=${email}&token=${token}`);
        const data = response.data;
        console.log(data)
        setIsLoading(false);
        setCandidateInfo(data.candidatesData);
        dispatch(info(data.candidatesData));
  
        // Initialize formData using the candidate data
        setFormData({
          Name: data.candidatesData.Name || "",
          EmailID: data.candidatesData.EmailID || "",
          PhoneNumber: data.candidatesData.PhoneNumber || "",
          Remarks: data.candidatesData.Remarks || "",
          CurrentCTC: data.candidatesData.CurrentCTC || "",
          ExpectedCTC: data.candidatesData.ExpectedCTC || "",
          CurrentLocation: data.candidatesData.CurrentLocation || "",
          Education: data.candidatesData.Education || "",
          NoticePeriod: data.candidatesData.NoticePeriod || "",
          Skills: data.candidatesData.Skills || "",
          status: data.candidatesData.status || "", // Change this line to use status from the data
  
        });
      retrieveUserRole(data.collapseStatus.JobId)


        
      } catch (error) {
        console.error('Error fetching candidate data:', error);
      }
    };
    
    if (Object.keys(collapseStatus).length === 0) {
      fetchData();
    } else {
      // Use collapseStatus directly to initialize formData
      setCandidateInfo(collapseStatus);
      retrieveUserRole(collapseStatus.JobId)
      setFormData({
        Name: collapseStatus.Name || "",
        EmailID: collapseStatus.EmailID || "",
        PhoneNumber: collapseStatus.PhoneNumber || "",
        Remarks: collapseStatus.Remarks || "",
        CurrentCTC: collapseStatus.CurrentCTC || "",
        ExpectedCTC: collapseStatus.ExpectedCTC || "",
        CurrentLocation: collapseStatus.CurrentLocation || "",
        Education: collapseStatus.Education || "",
        NoticePeriod: collapseStatus.NoticePeriod || "",
        Skills: collapseStatus.Skills || "",
        status: collapseStatus.status || "", // Use status from collapseStatus
  
      });
    }
  }, [collapseStatus, pathname]); // Add collapseStatus and pathname to the dependency array
    const retrieveUserRole = async(JobId)=>{
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backEndLink}/jobs/retrieveUserRole?JobId=${JobId}&token=${token}`);
        
        // Do something with the response, for example:
        
        setRole(response.data.role);
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
  
  };
  


  const handleSave = async () => {

    setIsSaving(true)
    for (const key in formData) {
      if (formData[key] === "") {
        console.error(`${key} cannot be empty`);
        return;
      }
    }
    const token = localStorage.getItem('token')
    formData.token = token
    formData.jobId = candidateInfo.JobId
    const email = pathname.substring(pathname.lastIndexOf('/') + 1);
    

    console.log(formData)
    try {
      axios.put(`${backEndLink}/edit-candidates?email=${email}`, formData, )
      .then((response)=>{
        navigate(`/Candidate/${formData.EmailID}`);
        setIsSaving(false);
        notify();


      })


    } catch (error) {
      console.error('Error saving candidate data:', error);
      setIsSaving(false)
    }

  };
  

  return (
    <div className='h-full overflow-auto '>
     <ToastContainer/>

      <div className='border-b flex p-6  h-[105px]'>
      <h2 className='  max-xl:text-[1.8rem] xl:text-[2.5rem]'>Candidate Information</h2>

      </div>
      {!isLoading ? (
        <div className='flex h-full '>
          <ul className='w-full flex items-center justify-center p-10'>
            <div className='h-full w-full  grid gap-2'>
              <li className='text-[18px] flex gap-3 items-center '>
                <p className='font-bold'>Name:</p>
                <input
                  value={formData.Name}
                  onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                  className='bg-transparent overflow-auto p-1 focus:outline-none focus:border rounded-md  focus:border-blue-500  w-full max-w:3rem '
                  />
              </li>
              <li className='text-[18px] flex gap-3 items-center '>
                <p className='font-bold'>Status:</p>
                <select
                  disabled={role !== 'Admin' ? true : false}
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className='bg-transparent overflow-auto p-1 focus:outline-none focus:border rounded-md  focus:border-blue-500  w-full max-w:3rem'
                >
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
                  {/* Add more status options as needed */}
                </select>
              </li>

              <li className='text-[18px] flex gap-3 items-center '>
                <p className='font-bold'>Email:</p>
                <input
                  value={formData.EmailID}
                  onChange={(e) => setFormData({ ...formData, EmailID: e.target.value })}
                  className='bg-transparent overflow-auto p-1 focus:outline-none focus:border rounded-md  focus:border-blue-500  w-full max-w:3rem '
                />
              </li>

              <li className='text-[18px] flex gap-3 items-center '>
                <p className='font-bold'>Phone:</p>
                <input
                  value={formData.PhoneNumber}
                  onChange={(e) => setFormData({ ...formData, PhoneNumber: e.target.value })}
                  className='bg-transparent overflow-auto p-1 focus:outline-none focus:border rounded-md  focus:border-blue-500  w-full max-w:3rem '
                />
              </li>

              <li className='text-[18px] flex gap-3 items-center '>
                <p className='font-bold'>Remark:</p>
                <input
                  value={formData.Remarks}
                  onChange={(e) => setFormData({ ...formData, Remarks: e.target.value })}
                  className='bg-transparent overflow-auto p-1 focus:outline-none focus:border rounded-md  focus:border-blue-500  w-full max-w:3rem '
                />
              </li>

              <li className='text-[18px] flex gap-3 items-center '>
                <p className='font-bold'>CurrentCTC:</p>
                <input
                  value={formData.CurrentCTC}
                  onChange={(e) => setFormData({ ...formData, CurrentCTC: e.target.value })}
                  className='bg-transparent overflow-auto p-1 focus:outline-none focus:border rounded-md  focus:border-blue-500  w-full max-w:3rem '
                />
              </li>

              <li className='text-[18px] flex gap-3 items-center '>
                <p className='font-bold'>ExpectedCTC:</p>
                <input
                  value={formData.ExpectedCTC}
                  onChange={(e) => setFormData({ ...formData, ExpectedCTC: e.target.value })}
                  className='bg-transparent overflow-auto p-1 focus:outline-none focus:border rounded-md  focus:border-blue-500  w-full max-w:3rem '
                />
              </li>

              <li className='text-[18px] flex gap-3 items-center '>
                <p className='font-bold'>CurrentLocation:</p>
                <input
                  value={formData.CurrentLocation}
                  onChange={(e) => setFormData({ ...formData, CurrentLocation: e.target.value })}
                  className='bg-transparent overflow-auto p-1 focus:outline-none focus:border rounded-md  focus:border-blue-500  w-full max-w:3rem '
                />
              </li>

              <li className='text-[18px] flex gap-3 items-center '>
                <p className='font-bold'>Education:</p>
                <input
                  value={formData.Education}
                  onChange={(e) => setFormData({ ...formData, Education: e.target.value })}
                  className='bg-transparent overflow-auto p-1 focus:outline-none focus:border rounded-md  focus:border-blue-500  w-full max-w:3rem '
                />
              </li>

              <li className='text-[18px] flex gap-3 items-center '>
                <p className='font-bold'>NoticePeriod:</p>
                <input
                  value={formData.NoticePeriod}
                  onChange={(e) => setFormData({ ...formData, NoticePeriod: e.target.value })}
                  className='bg-transparent overflow-auto p-1 focus:outline-none focus:border rounded-md  focus:border-blue-500  w-full max-w:3rem '
                />
              </li>

              <li className='text-[18px] flex gap-3 items-center '>
                <p className='font-bold'>Skills:</p>
                <input
                  value={formData.Skills}
                  onChange={(e) => setFormData({ ...formData, Skills: e.target.value })}
                  className='bg-transparent overflow-auto p-1 focus:outline-none focus:border rounded-md  focus:border-blue-500  w-full max-w:3rem '
                />
              </li>
              <li className='text-[18px] flex gap-3 items-center '>
                <p className='font-bold'>Resume:</p>
                <div 
                  className='flex gap-1 cursor-pointer '
                  onClick={() => window.open(candidateInfo.resumeUrl, '_blank')}

                  >
                  <p className=''>Download</p>
                  <img src={downloadSvg}/>
                </div>
              </li>

              <li>
                <button
                  type='button'
                  onClick={handleSave}
                  className={`h-[32px] w-[80px] bg-[#ff6f3c] flex items-center justify-center rounded-[0.6rem] font-bold text-white justify-self-end `}
                >
                  {isSaving?(<span className="loading loading-spinner loading-md"></span>):(<p>Save</p>)}
                </button>
              </li>
            </div>
          </ul>

      

          <iframe
            title="PDF Viewer"
            className='skeleton w-[100%] m-10 max-md:hidden'
            src={candidateInfo.resumeUrl}
            onLoad={handleIframeLoad}
            loading="lazy" 
          ></iframe>
        </div>
      ) : <span className="justify-self-center loading loading-ring loading-lg"></span>}
    </div>
  );
};

export default CandidateProfile;
