import React,{useEffect,useState} from 'react';
import axios from 'axios';
import CandidateTable from '../../components/tables/CandidateTable.js';
import { backEndLink } from '../../utils/Links.js';

const CandidatesForClient = () => {
  
    const [searchInput,setSearchInput] = useState('');
    const [candidates,setCandidates] = useState([])
  
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSearchInputChange = (event) => {
      setSearchInput(event.target.value);
    };
    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            
          try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');
            // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhhd3VsdGllZmFzaWxAZ21haWwuY29tIiwiaWF0IjoxNzAyMTkyNzgxLCJleHAiOjE3MDIxOTYzODF9.mis4JRkd1y6N7tiMB7pU4frssbbfXwkieOi71AdVfXQ'
      
            // Make the API request using axios with the token in the query parameters
       
            const response = await axios.get(`${backEndLink}/client/Candidates`, {
              params: {
                token: token,
                status: searchInput
              },
            });
          
            setIsLoading(false)

            // Update state with the received data
            setCandidates(response.data.candidates);
          } catch (error) {
            console.error('Error fetching candidates:', error);
            setIsLoading(false)

          }
        };
      
        fetchData();
      }, [searchInput]); 
  return (
    <div className=' h-full pl-5 pr-5  '>
        <div className=' flex p-6  h-[105px] '>
      <h2 className='  max-xl:text-[1.8rem] xl:text-[2.5rem]'>Candidate Information</h2>

      </div>
          <div className="bg-[#E9F0FD] shadow-5xl rounded-xl w-[100%] max-w-full h-full overflow-clip">
          <div>
          <select
            value={searchInput}
            onChange={handleSearchInputChange}
            className="cursor-pointer p-3  h-11 max-w-96 w-full rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
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
          <div className='p-5 h-full overflow-y-auto overflow-x-clip'>

            {!isLoading?(<CandidateTable candidates = {candidates} isClient={true}/>):(<span className=" justify-self-center loading loading-ring loading-lg"></span>)}
            </div>
          </div>
         
    </div>
  )
}

export default CandidatesForClient