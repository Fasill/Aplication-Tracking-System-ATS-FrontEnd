import SignupForm from '../../components/Forms/signupForm.js'


const SignupAsSupplier = () => {
  return ( 
    <div className="bg-white  grid gap-5 items-center justify-center p-[2rem]  max-md:mt-[20rem] shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            <h1 className='font-bold text-[30px] '>REGISTRATION FORM</h1>
            <SignupForm tittle = "" type = "Channel Partner" />
    </div>
  );
}

export default SignupAsSupplier;
