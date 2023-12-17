import React,{useEffect,useState} from 'react';
import axios from 'axios';
import CandidateTable from '../../components/tables/CandidateTable.js';
import { backEndLink } from '../../utils/Links.js';

const Candidates = () => {
    const [searchInput,setSearchInput] = useState('');
    const [candidates,setCandidates] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    
  const handleSearchInputChange = (event)=>{
    setSearchInput(event.target.value)
  }

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
          try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');
      
            // Make the API request using axios with the token in the query parameters
       
            const response = await axios.get(`${backEndLink}/RetrieveCandidatesForAdminOrRecruiter`, {
              params: {
                token: token,
                Name: searchInput
              },
            });
            setIsLoading(false)
            // Update state with the received data
            setCandidates(response.data.data.candidates);
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
          <input
            type="text"
            value={searchInput}  
            placeholder='Search'
            className="p-3 pl-[2rem]  h-8  w-full border-b border-b-gray-400 focus:outline-none focus:border-blue-500  bg-transparent"

            onChange={handleSearchInputChange}  
          />
          </div>
          <div className='p-5 h-full overflow-y-auto overflow-x-clip'>

            {!isLoading?(<CandidateTable candidates = {candidates} isClient={false}/>):(<span className=" justify-self-center loading loading-ring loading-lg"></span>)}
            </div>
          </div>
         
    </div>
  )
}

export default Candidates