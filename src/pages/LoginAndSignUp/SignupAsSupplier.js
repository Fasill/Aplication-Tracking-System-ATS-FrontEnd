import logo from '../../assets/logo.png'
import SignupForm from '../../components/Forms/signupForm.js'

// import style from "./style.module.css";

const SignupAsSupplier = () => {
  return ( 
    <div className='flex justify-between w-full   '>
      <div className='bg-blue-950 w-full max-w-full h-screen max-md:hidden  grid p-8 '> 
        <img alt='logo' href = "/" className="w-[4rem]  m-0 justify-self-start transform hover:scale-[1.1] transition-transform duration-500 cursor-pointer" src= {logo}/>
        <div className='m-auto mt-[-5rem] w-full max-w-[30rem] grid gap-5'><h1 className='m-auto text-4xl font-bold text-[#BCBAC7]'>Welcome!</h1><p className='font-bold text-[#BCBAC7] text-[1.2rem]  '>Welcome to Seamless Job Matching, where your dream career meets its perfect match! ATS Login & Sign Up now to embark on your journey to professional success.</p></div>
      </div>
      <div className='bg-white w-full h-screen flex align-center justify-center items-center p-8 overflow-y-auto' ><  SignupForm tittle = "Sign up as Supplier" type = "Channel Partner" /></div>
    </div>
  );
}

export default SignupAsSupplier;
