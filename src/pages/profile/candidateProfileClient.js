import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import downloadSvg from '../../assets/download.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backEndLink } from '../../utils/Links';
const CandidateProfileClient = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const [candidateInfo, setCandidateInfo] = useState({});
  
  const notify = () => {
    toast.success('Candidate information updated successfully', {
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

  const location = useLocation();
  const { pathname } = location;

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = pathname.substring(pathname.lastIndexOf('/') + 1);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backEndLink}/client/get-candidates-by-email-client?EmailID=${email}&token=${token}`);
        const data = response.data;
        console.log(data)
        setCandidateInfo(data.candidatesData);

        setFormData({
          Name: data.candidatesData.Name || '',
          EmailID: data.candidatesData.EmailID || '',
          PhoneNumber: data.candidatesData.PhoneNumber || '',
          Remarks: data.candidatesData.Remarks || '',
          CurrentCTC: data.candidatesData.CurrentCTC || '',
          ExpectedCTC: data.candidatesData.ExpectedCTC || '',
          CurrentLocation: data.candidatesData.CurrentLocation || '',
          Education: data.candidatesData.Education || '',
          NoticePeriod: data.candidatesData.NoticePeriod || '',
          Skills: data.candidatesData.Skills || '',
          status: data.candidatesData.status || '',
          jobId:data.candidatesData.JobId.toString()|| '',
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching candidate data:', error);
      }
    };

    fetchData();
  }, [pathname]);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const token = localStorage.getItem('token');
      const email = pathname.substring(pathname.lastIndexOf('/') + 1);
      console.log(formData)
      await axios.put(`${backEndLink}/client/edit-candidates-client?email=${email}&token=${token}`, formData);

      navigate(`/client/CandidateProfileClient/${formData.EmailID}`);
      setIsSaving(false);
      notify();

    } catch (error) {
      console.error('Error saving candidate data:', error);
      setIsSaving(false);
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

export default CandidateProfileClient;
