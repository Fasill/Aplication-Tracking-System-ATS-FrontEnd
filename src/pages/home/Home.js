import { useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className='grid'>
            {/* Navigation bar with a dark blue background */}
            <div className="bg-[#172554] flex items-center justify-between h-[64px] pr-[5rem] pl-[5rem] gap-[3rem]">
                <a href='/home' className='text-white font-bold'>LOGO</a>

                {/* Search input with an avatar image */}
                <h1 className='text-white font-bold'>Welcome to Seamless Job Matching, </h1>
                <div className='flex gap-5'>
                    <button
                        className='text-[rgb(253,126,39)] font-bold border border-[rgb(253,126,39)] rounded p-1'
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>

                    <button
                        className='text-white bg-[rgb(253,126,39)] rounded p-1 font-bold'
                        onClick={() => navigate('/signup/supplier')}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
