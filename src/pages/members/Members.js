import plusSvg from '../../assets/plus.svg';
import Addmember from '../../components/Addmember&Search/AddMemberForm.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { backEndLink } from '../../utils/Links.js';
import MembersTable from '../../components/tables/MembersTable.js';

const Front = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const userInfo = useSelector((state) => state.user.value);

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      try {
        
          axios.get(`${backEndLink}/RetrieveAllUsers?token=${token}`)
        

          .then((allUsers) => {
            setIsLoading(false);
 
            setUsers(allUsers.data.users !== undefined ? allUsers.data.users : []);

       
          })
          .catch((error) => {
            navigate('/login');
            console.error('Error:', error);
            setIsLoading(false);
          });
      } catch (e) {
        console.error(e);
        navigate('/login');
        setIsLoading(false);
      }
    }
  }, [navigate]);

  return (
    <>
      <div className='flex flex-col bg-white w-[100%] h-full items-center justify-center '>
        {!isLoading ? (
          <div className='w-full p-[10px] pl-[2rem] pr-[2rem] grid gap-5 '>
            <div className={userInfo.haveAccess ? ` bg-white h-full m-full max-h-[52px] max-m-[15px]  rounded-md flex justify-between p-[10px] ` : `hidden`}>
              <div className='text-[34px]'>
                <h1>Members</h1>
              </div>
              <label
                htmlFor="my_modal_6"
                className='flex items-center cursor-pointer gap-2 rounded-md hover:bg-[#E1EBFF] p-[8px]'
              >
                <img src={plusSvg} alt="Plus Icon" />
                <p>Add Member</p>
              </label>
            </div>
            <MembersTable users={users} />

            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal " role="dialog">
              <div className="modal-box">
                <Addmember compId={userInfo.compId} />
                <div className="modal-action">
                  <label htmlFor="my_modal_6" className="btn">
                    Close!
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <span className="loading loading-ring loading-lg"></span>
        )}
      </div>
    </>
  );
};

export default Front;
