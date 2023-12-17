import {useState,useEffect} from 'react';
import bell from '../../assets/serivango2v/bell.svg';
import search from '../../assets/serivango2v/search.svg';

import stack from '../../assets/serivango2v/stack.svg'
import {NavBar2} from '../../components/navBar/SideNavbar.js'
export const Dashboard = () => {
    const [collapse,setCollapse] = useState(true);
 
    const handleClick = () => {
        setCollapse(!collapse);
    };
    
    
    return (
    <main className='flex overflow-clip relative'>
        
        <NavBar2/>
        <div className=' w-[100%] flex flex-col gap-28 '>
            <header className='flex  w-[100%] items-center justify-center h-[4rem] pl-6 pr-6'>
                <div className='flex  w-[94%] justify-between '>
                    {/* <h1 onClick={handleClick} >fcghjk</h1> */}
                <img src={stack} onClick={handleClick} className='cursor-pointer md:hidden'/>
                <div className='flex max-md:hidden'>
                    <h1 className='font-bold'>
                        Hello,
                    </h1>
                    <p className='mt-3'>jhon</p>
                </div>
                <div className={`flex  p-[1.5px] h-[45px] w-[100%] max-w-[633px] justify-between  `}>
                    <input type='text' className='rounded-l-3xl border border-[#377DFF] w-full outline-none p-3'/>
                    <img src ={search} className='mr-2 bg-[#377DFF] pr-3 pl-2 rounded-r-3xl'/>
                </div>
              
                {/* <div className='flex bg-blue-300 gap-4'> */}
                    <img src = {bell}  className='cursor-pointer'/>
                    <div className="avatar placeholder cursor-pointer">
                        <div className="bg-neutral text-neutral-content rounded-full w-12">
                            <span>MX</span>
                        </div>
                    {/* </div>  */}
                </div>
                </div>
            </header>
            <div className='flex bg-transparent w-[100%] justify-between pl-5 pr-5   p-3 max-md:grid gap-2 max-md:gap-5'>
                <div className='flex flex-col justify-center items-start p-6 text-[#999999] w-[100%] md max-w-[332px] h-[157px] bg-white rounded-tr-3xl rounded-bl-3xl rounded-lg shadow-[5px_8px_15px_1px_rgba(0,0,0,0.2)]'>
                    <h1 className='text-[18px]'>Total Application</h1>
                    <h1 className='text-[32px]'>521</h1>
                </div>
                <div className='flex flex-col justify-center items-start p-6 text-[#999999] w-[100%] max-w-[332px] h-[157px] bg-white rounded-tr-3xl rounded-bl-3xl rounded-lg shadow-[5px_8px_15px_1px_rgba(0,0,0,0.2)]'>

                    <h1 className='text-[18px]'>Rejected Application</h1>
                    <h1 className='text-[32px]'>425</h1>
              


                </div>
                <div className='flex flex-col justify-center items-start p-6 text-[#999999] w-[100%] max-w-[332px] h-[157px] bg-white rounded-tr-3xl rounded-bl-3xl rounded-lg shadow-[5px_8px_15px_1px_rgba(0,0,0,0.2)]'>

                <h1 className='text-[18px]'>Total Application</h1>
                    <h1 className='text-[32px]'>521</h1>
              

                </div>
            </div>
        </div>
       
    </main>
  )
}
