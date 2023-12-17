import React, { useState, useEffect } from 'react';
import avatarImg from '../../assets/searchIconbig.svg';
import trash from '../../assets/trash.svg';
import axios from 'axios';

const SearchMember = (props) => {
  // State variables
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [members, setMembers] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isComp, setisComp] = useState(false);

  useEffect(() => {
    // Send the data to the backend when the component mounts
    // Set component flags based on user role
    setisComp(props.role === 'company' ? true : false);
    setIsAdmin(props.role === 'Admin' ? true : false);
    setIsOwner(props.role === 'Owner' ? true : false);

    if (searchText.length > 0) {
      sendDataToBackend(searchText);
    }
  }, [searchText]);

  // Handle role selection
  const handleRole = (event, index) => {
    const selectedRole = event.target.value;

    // Create a copy of the members array to avoid modifying the state directly
    const updatedMembers = [...members];

    // Update the role for the selected member
    updatedMembers[index].role = selectedRole;

    // Update the state with the new role
    setMembers(updatedMembers);

    // Create a data object to send to the backend
    const data = {
      email: updatedMembers[index].email, // You'll need to change this to the appropriate property
      role: selectedRole,
    };

    // Send a POST request to update the role
    const token = localStorage.getItem('token');
    axios.post('https://test-back-end-dszgwhplxa-el.a.run.app/updateMemberRole', { data, token })
      .then(response => {
        console.log('Role updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating role:', error);
      });
  };

  // Handle input change for member search
  const handleInputChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
  };

  // Send search data to the backend
  const sendDataToBackend = (searchText) => {
    setIsSearching(true);
    const token = localStorage.getItem('token');
    axios.post('https://test-back-end-dszgwhplxa-el.a.run.app/Searchmember', { name: searchText, token })
      .then(response => {
        console.log(response.data.members);
        setMembers(response.data.members);
        setIsSearching(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsSearching(false);
      });
  };


  // Delete a member
  const closeConfirmation = (email) =>{
    document.getElementById('my_modal_2').close()
    deleted(email);
    sendDataToBackend()
  }
  const deleted = (email) => {
    console.log(email);
    axios.get(`https://test-back-end-dszgwhplxa-el.a.run.app/deletemember?email=${email}`)
      .then(res => {
        console.log(res);
        sendDataToBackend(searchText);
      });
  };


  return (
    <div className="bg-white shadow-md rounded-lg h-[510px] w-full max-w-[50rem]" onClick={(e) => e.stopPropagation()}>
      <div className='bg-white border pl-4 pr-12 h-[56px] rounded-t-lg flex items-center'>
        {isSearching ?
          <span className="loading loading-spinner text-primary"></span> : <img src={avatarImg} alt="Avatar" />}
        <input
          disabled={!props.accessState}
          onChange={handleInputChange}
          value={searchText}
          type="text"
          className="bg-white w-full h-[28px] p-4 justify-self-center border-transparent focus:outline-none"
          placeholder="Search Member"
        />
      </div>
      <div>
      {members.map((member, index) => (
  <div key={index} className='border-gray shadow-md pl-2 pr-2 border bg-white m-1 rounded-md flex justify-between items-center'>
    <p>{member.name}</p>
    <p>{member.email}</p>
    <div className='flex gap-1'>
      <select
        className="select w-full max-w-[8rem]"
        value={member.role}
        onChange={(event) => handleRole(event, index)}
        disabled={member.role === 'Owner' && !isOwner && !isComp ? true : false} // Disable if member.role is "Owner"
      >
        <option value="Owner" disabled={isAdmin}>Owner</option>
        <option value="Admin">Admin</option>
        <option value="Recruiter">Recruiter</option>
      </select>
      <div className='flex items-center justify-center'>
        <img
        className={isComp || isAdmin || isOwner ? ` bg-transparent cursor-pointer hover:scale-110 ${member.role === 'Owner' && !isOwner && !isComp ?'cursor-not-allowed ':""}` : 'hidden'}
        src={trash}
        onClick={() =>  {if (!(member.role === 'Owner' && !isOwner && !isComp  )) {
          document.getElementById('my_modal_2').showModal()
        }
      }}
      />
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <p className="py-4">Are you sure you want to delete this item?</p>
          <button method="dialog" onClick={()=>closeConfirmation(member.email)}>Confirm</button>

        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog> 
      </div>
    </div>
  </div>
))}
      </div>
    </div>
  );
};

export default SearchMember;
