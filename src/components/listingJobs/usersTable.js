import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backEndLink } from '../../utils/Links';
import { useLocation } from 'react-router-dom';

const UsersTable = (props) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    console.log(props.isMapClicked);
    if (props.isMapClicked) {
      const modal = document.getElementById('my_modal_4');
      if (modal) {
        modal.showModal();
      }
    }
  }, [props.isMapClicked]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            props.userRole !== 'Recruiter'
              ? `${backEndLink}/RetrieveAllUsers?token=${token}`
              : ''
          }`
        );
        setUsers(response.data.users !== undefined ? response.data.users : '');
        console.log('users', response.data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMapUsers = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const jobId = location.pathname.split('/').pop();

    try {
      await axios.post(`${backEndLink}/jobs/MapUsers`, {
        token: token,
        jobId: jobId,
        selectedUsers: selectedUsers.map((user) => ({
          email: user.email,
          role: user.role,
        })),
      });
      setSelectedUsers([]);
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.error('Error mapping users:', error);
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (user) => {
    const updatedSelectedUsers = selectedUsers.includes(user)
      ? selectedUsers.filter((selectedUser) => selectedUser !== user)
      : [...selectedUsers, user];
    setSelectedUsers(updatedSelectedUsers);
  };

  return (
    <dialog id="my_modal_4" className="modal ">
      <div className="modal-box w-11/12 max-w-5xl overflow-clip h-[90%] grid ">
        <div className="overflow-scroll">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Is Mapped</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <th>
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox"
                            onChange={() => handleCheckboxChange(user)}
                          />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="avatar placeholder">
                              <div className="bg-[#155263] text-neutral-content rounded-full w-12">
                              {user.name ? user.name.slice(0, 2).toUpperCase() : 'XX'}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <select className="badge badge-ghost badge-sm">
                          <option>Admin</option>
                          <option selected>Recruiter</option>
                        </select>
                      </td>
                      <td>{user.isMapped ? 'Yes' : 'No'}</td>
                      <th>
                        <button className="btn btn-ghost btn-xs">details</button>
                      </th>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No users available</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Is Mapped</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
          <button
            className="bg-[#ff6f3c] btn text-white hover:bg-[#c7603b] w-fit "
            onClick={handleMapUsers}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md bg-[#ff6f3c]"></span>
            ) : (
              'Map'
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UsersTable;
