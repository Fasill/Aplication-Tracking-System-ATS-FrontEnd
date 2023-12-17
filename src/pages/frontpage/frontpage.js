import plusSvg from '../../assets/plus.svg';
import NavBar from '../../components/navBar/NavBar.js';
import Addmember from '../../components/Addmember&Search/AddMemberForm.js';
import SearchMember from '../../components/Addmember&Search/SearchMember.js';
import style from './style.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {info} from  '../../store/user.js'
import {backEndLink} from '../../utils/Links.js'

const Front = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [AddmemberClicked, setAddmemberClicked] = useState(false);
  const [SearchMemberClicked, setSearchMemberClicked] = useState(false);
  const [Role, setRole] = useState("");
  const [haveAccess, setHaveAccess] = useState(false);
  const [name,setName] = useState("")
  const [compId,setCompId] = useState("")
  // Receive data from NavBar component
  const receiveDataFromNavBar = (Data) => {
    // Update the state with the received data
    setSearchMemberClicked(Data);
  };

  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token is found, navigate to the login page
      navigate('/login');
    } else {
      try {
        // Create an array of promises for the two requests
        const requests = [
          axios.post(`${backEndLink}/verify`, { token: token }),
          axios.post(`${backEndLink}/allInfo?token=${token}`)
        ];

        // Execute both requests concurrently
        Promise.all(requests)
          .then(([verifyResponse, allInfoResponse]) => {
            // Handle both responses
            console.log('Verification Response:', verifyResponse);
            console.log('allInfo Response:', allInfoResponse.data);
            setHaveAccess(allInfoResponse.data.type === 'company' || allInfoResponse.data.info.role !== 'Recruiter');
            setRole(allInfoResponse.data.type === "user" ? allInfoResponse.data.info.role : "company");
            setName(allInfoResponse.data.info.name)
            setCompId(allInfoResponse.data.type !== 'company'?allInfoResponse.data.info.company:"")
            dispatch(info({"infos":allInfoResponse.data }))
            console.log(compId)
            
            
      
                        // Check if the verification response is not as expected
            if (!verifyResponse.data || !verifyResponse.data.someProperty === 'expectedValue') {
              navigate('/login');
            }
          })
          .catch((error) => {
            navigate('/login');
            console.error('Error:', error);
          });
      } catch (e) {
        console.log(e);
        navigate('/login');
      }
    }
  }, [navigate]);
  const nameParts = name.split(" ");
  const firstName = nameParts[0]; 
  const lastName = nameParts[nameParts.length - 1]; 
  const firstInitial = firstName.charAt(0); 
  const lastInitial = lastName.charAt(0); 
  return (

      <>        
      <div className='flex flex-col bg-white w-[100%]  '>
          
          {/* <div className='h-[calc(100vh-64px)]  '>< SideNavbar className='' /></div> */}

        </div>
      
     
      <div className={SearchMemberClicked ? 'absolute top-0 h-screen w-screen bg-gray-900 bg-opacity-50 flex items-center justify-center z-[40]' : 'hidden'}
        onClick={() => setSearchMemberClicked(false)}>
        <div className={style.bg_blur + ` p-[38px]  w-full h-full flex items-center justify-center`}  >
          <SearchMember role={Role} accessState={haveAccess} />
        </div>
      </div>
      </>

  );
}

export default Front;
