import React from 'react';
import { useDispatch } from 'react-redux';
import { info } from '../../store/CandidateInfo.js'; // Import your action to delete a candidate
import { useNavigate } from 'react-router-dom';

const CandidateTable = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMoreClick = (index) => {
    dispatch(info(props.candidates[index]));
    console.log(props.candidates)
    navigate(`${props.isClient?'/client/CandidateProfileClient':'/Candidate'}/${props.candidates[index].EmailID}`)
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th className='max-md:hidden'>Status</th>
            <th className='max-md:hidden'>JobId</th>


            <th>{}</th>
          </tr>
        </thead>
        <tbody>
          {/* map through candidates */}
          {props.candidates.map((candidate, index) => (
            <tr 
            key={index} 
            className='cursor-pointer overflow-hidden'
            onClick={() => handleMoreClick(index)}
              >
              <th>{index + 1}</th>
              <td>{candidate.Name}</td>
              <td>{candidate.EmailID}</td>
              <td className='max-md:hidden'>{candidate.status}</td>
              <td className='max-md:hidden'>{candidate.JobId}</td>


             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTable;
