import { useEffect, useState } from 'react';
import EditProfileForm from '../../components/Forms/EditProfileForm.js'
import EditprofileFormForUser from '../../components/Forms/EditprofileFormForUser.js'
import { useSelector } from 'react-redux';

const Profile = () => {
    const userInfo = useSelector((state) => state.user.value);
    const [name,setName] = useState("");
    const [isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
      setName(userInfo.info.name)
    },[])

  const nameParts = name.split(" ");
  const firstName = nameParts[0]; 
  const lastName = nameParts[nameParts.length - 1]; 
  const firstInitial = firstName.charAt(0); 
  const lastInitial = lastName.charAt(0); 
  

  return (
    <div className={`bg-white h-full w-full overflow-auto `}>
      <div className = 'flex' >

        <div className='p-[15px] grid gap-[6px] grow '>
          <div className='p-[17px] w-[50%] max-md:w-[75%] h-[50px] bg-white rounded-[0.6rem] shadow-md flex items-center justify-between'>
            <h1 className='text-[1.6rem]'>Profile Details</h1>

          </div>
          <div className='bg-white rounded-[0.6rem] w-[75%] shadow-md grid max-md:w-[100%]'>
              <div className='flex gap-6 items-center p-[17px] rounded-[0.6rem] bg-white shadow-md'>
                  <div className="avatar placeholder flex items-center  ">
                  <div className=" text-neutral-content bg-[#525d83] rounded-full w-[9rem] max-sm:w-[5rem] ">
                      <span className="text-3xl">{firstInitial}{lastInitial}</span>
                  </div>
                  </div> 
                  {!isLoading?
                  <div className='grid gap-2 items-center justify-start'>
                      <h1 className = ' max-sm:text-[0.8rem]'>{userInfo.info.email}</h1>
                      <div><button className='border border-blue-600 text-blue-600 rounded-[0.3rem] p-1 '>Edit</button> <button className='border border-blue-600 text-blue-600 rounded-[0.3rem] p-1'>View Agreement</button></div>
                  </div>:
                <span className="loading loading-dots loading-lg bg-[#2f458d]"></span>
                  }
              </div>
              <div className= {userInfo.isCompany?`p-[17px]`:'hidden'}>
                  <EditProfileForm data = {userInfo.info}  />
              </div>
              <div className= {!userInfo.isCompany?`p-[17px]`:'hidden'}>
                  <EditprofileFormForUser data = {userInfo.info}  />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
 