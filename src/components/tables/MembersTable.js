import React from 'react';

const MembersTable = (props) => {
  return (
    <div className='bg-[#E1EBFF] rounded-xl shadow-md p-1'>
      <div className="h-[28rem] overflow-y-auto">
        <table className="table">
          {/* Head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(props.users) && props.users.length > 0 ? (
              props.users.map((user, index) => (
                /* Row */
                <tr key={index}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-12">
                            {/* Replace 'MX' with user's avatar or initials */}
                            <span>{user.name ? user.name.slice(0, 2).toUpperCase() : 'XX'}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user.email}
                    <br />
                  </td>
                  <td>
                    {user.role}
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">Details</button>
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users available</td>
              </tr>
            )}
          </tbody>

          {/* Foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default MembersTable;
