import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAsyncError, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { backEndLink } from '../../utils/Links.js';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const EditprofileFormForUser = (props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        phoneNumber: '',
        name: '',
        password:'',
      
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [Submit, setSubmit] = useState(true);

    const schema = yup.object().shape({
        email: yup.string().email('Invalid email format'),
        name:yup.string(),
        password:yup.string(),


    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(() => {
        const isFormEmpty = Object.values(formData).every((value) => value === '');
        setIsEmpty(isFormEmpty);
    }, [formData]);
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmit = () => {
        if (Submit) {
            setIsSubmitting(true);
            const token = localStorage.getItem('token')
            formData.token = token
            console.log(formData);
            
            axios
            .post(`${backEndLink}/update`, formData)
            .then((res) => {
                const token = res.data.token;
                console.log(res.data);
                console.log("saved1");
                setIsSubmitting(false);
                setSubmit(false);
        setFormData({   email: '',
                        phoneNumber: '',
                        name: '',
                        password:'',}); // Clear form fields
                        window.location.reload()


            })
            .catch((error) => {
                console.error('Error:', error);

                if (error.response && error.response.data && error.response.data.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('An error occurred. Please try again.');
                }
                
                setIsSubmitting(false);
                setSubmit(false);

            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 w-[]  ">
        <button
            type='submit'
            disabled = {isEmpty||isSubmitting} 
            className={`h-[32px] w-[80px] bg-blue-500 flex items-center justify-center rounded-[0.6rem] font-bold text-white justify-self-end ${isEmpty ? 'bg-[rgb(226,232,240)]' : ''}`}
          >
            {isSubmitting?<span className="loading loading-spinner loading-sm bg-white"></span>:'save'}
         </button>
        
        <div className="text-black grid justify-items-start">
        <label>Name<span className="text-red-600">{errors.name?.message}</span></label>
        <input
        type="text"
        name="name"
        placeholder={props.data.name}
        
        {...register("name")}
        value={formData.name}
        onChange={handleChange}
        className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
        />
    </div>
    

        <div className="text-black grid justify-items-start">
            <label>Email ID<span className="text-red-600">{errors.email?.message}</span></label>
            <input
            type="text"
            placeholder={props.data.email}
            {...register("email")}
            value={formData.email}
            onChange={handleChange}
            className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
            />
        </div>
    
        <div className="text-black grid justify-items-start">
            <label>Password<span className="text-red-600">{errors.email?.message}</span></label>
            <input
            type="password"
            placeholder={'.........'}
            {...register("password")}
            value={formData.password}
            onChange={handleChange}
            className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
            />
        </div>
    

        <div className="text-black grid justify-items-start">
            <label>Phone Number<span className="text-red-600">{errors.phoneNumber?.message}</span></label>
            <PhoneInput
            placeholder={props.data.phoneNumber}

            inputStyle={{
                height: '45px',
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: '5px',
            }}
            value={formData.phoneNumber}
            onChange={(value) => setFormData({ ...formData, phoneNumber: value })}
            />
        </div>
    
        </form>
    );
    }
    
    export default EditprofileFormForUser;
    