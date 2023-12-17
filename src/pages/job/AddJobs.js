import React ,{useState} from 'react'

import JobForm from '../../components/Forms/JobForm.js'


function AddJobs() {
  return (
    <>
      <div className=' grid  w-full'>
        <div className={`p-[15px] mb-[10rem] grow  flex  gap-1 h-screen overflow-y-auto  `}>
          <JobForm className=''/>
        </div>
      </div>
     
  </>
  )
}

export default AddJobs