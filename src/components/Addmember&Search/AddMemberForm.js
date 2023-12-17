import React, { useState } from 'react';
import chevronRight from "../../assets/chevronRight.svg"
import plusSvg from '../../assets/plusWhite.svg';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { backEndLink } from '../../utils/Links.js';

const Addmember = (props) => {
    const [isEmpty, setIsEmpty] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [sentEmail, setSentEmail] = useState(false);

    const schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setIsEmpty(formData.email == ""&&formData.name == ""?true:false)

    };

    const onSubmit = () => {
        setIsSubmitting(true);

        const token = localStorage.getItem("token");
        formData.token = token;
        formData.compId = props.compId

        axios.post(`${backEndLink}/adduser`, formData)
            .then((res) => {
                setSentEmail(true);
                setIsSubmitting(false);
                window.location.reload();
            })
            .catch((error) => {
                console.log("error", error);
                setIsSubmitting(false);
            });
    };

    

    return (
        <div className=" w-full max-w-[512px] rounded-md" onClick={(e) => e.stopPropagation()}>
            <div className=' flex gap-[15px] pl-[15px] items-center justify-center font-bold rounded-t-md'>
               
                <p>Add Team Member</p>
            </div>
            <form className='bg-white m-[15px] p-[15px] grid gap-10 rounded-md' onSubmit={handleSubmit(onSubmit)}>
                <div className="text-black grid justify-items-start">
                    <label>Enter name <span className="text-red-600">* {errors.email?.message} </span><span className='text-green-600'>{sentEmail ? "Invitation Email Sent" : ""}</span></label>
                    <input
                        type="text"
                        {...register("name")}
                        value={formData.name}
                        onChange={handleChange}
                        className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
                    />
                </div>

                <div className="text-black grid justify-items-start">
                    <label>Enter Email <span className="text-red-600">* {errors.email?.message} </span><span className='text-green-600'>{sentEmail ? "Invitation Email Sent" : ""}</span></label>
                    <input
                        type="text"
                        {...register("email")}
                        value={formData.email}
                        onChange={handleChange}
                        className="p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
                    />
                </div>
                
                <button 
                    disabled = {isSubmitting}
                className='font-bold text-xl text-white flex items-center justify-center h-[42px] bg-blue-500 rounded' type="submit">
                    {isSubmitting ? (
                        <span className="loading loading-spinner loading-md"></span>
                    ) : (
                        <>
                            <img src={plusSvg} alt="Add Member" />
                            <p>Add Member</p>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default Addmember;
