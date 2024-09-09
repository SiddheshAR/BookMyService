import React, { useState } from 'react'
import polkaLight from '../assets/polkabig.svg'
import stars from '../assets/stars.svg'
import loginPic1 from '../assets/login/login1.jpg'
import loginPic2 from '../assets/login/login2.jpg'
import loginPic3 from '../assets/login/login3.jpg'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../utils/constants'
import {toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { setUser } from '../redux/slices/userSlice'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
    function Login() {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const notify = (text:string) => toast.error(text);
        const [input,setInput]=useState({
            email:"",
            password:""
        })

        const inputHandle = (e)=>{
            setInput({...input,[e.target.name]:e.target.value})
        }   
        const handleSubmit = async(e)=>{
            e.preventDefault();
            try{
                const resp = await axios.post(`${USER_API_ENDPOINT}/login`,input,{
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                });
                if (resp?.data?.success === false) {
                    notify(resp?.data?.message);
                } else {
                    dispatch(setUser(resp?.data?.user));
                    navigate('/');
                    toast.success('Login successful!');
                }
            }catch(error:any){
                if (error.response) {
                    // Server responded with a status other than 2xx
                    notify(error.response.data.message || "Something went wrong on the server.");
                }
            }
        }
  return (
    <div className=''>
        <div className='max-w-6xl mx-auto py-10 px-10 flex flex-col md:flex-row '>
            <div className='hidden md:block md:w-[45%] relative overflow-hidden'>
                <div className='absolute w-[16%] h-[16%]  z-10 top-1 left-5 opacity-40'>
                    <img src={polkaLight}  className='object-cover rounded-full w-full h-full'/>
                </div>
                <div className='absolute w-[30%] h-[25%] bottom-4 right-10 z-40 opacity-70'>
                    <img src={polkaLight}  className='object-contain w-full h-full'/>
                </div>
                <div className='absolute w-[12%] h-[12%] top-0 right-20 z-40 opacity-80'>
                    <img src={stars}  className='object-contain w-full h-full'/>
                </div>
                <div className='absolute w-[12%] h-[12%]  bottom-0 left-2 z-40 opacity-80'>
                    <img src={stars}  className='object-contain w-full h-full'/>
                </div>
                <div className='absolute w-[40%] h-[60%] top-10 left-52 rounded-lg z-30'>
                    <img className='object-cover  w-full h-full rounded-xl border-[14px] border-white ' src={loginPic1}/>
                </div>
                 <div className='absolute w-[110px] h-[110px]   top-6 left-16'>
                    <img className='object-cover w-full h-full rounded-xl' src={loginPic2}/>
                </div>
                <div className='absolute  w-[35%] h-[55%] z-20 top-40 left-20'>
                    <img className='object-cover w-full h-full rounded-xl -rotate-12' src={loginPic3}/>
                </div>     
            </div>

            <div className=' p-4 md:px-6 md:py-10 w-[100%] md:w-[45%] '>
                <h2 className='text-3xl font-semibold text-[#0d2836] '>
                    Sign-in
                </h2>
                <p className='text-[14px] text-gray-500 font-semibold my-4'>Welcome back! Please enter your credentials.</p>
                <form className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-[14px] font-semibold text-gray-700' htmlFor='email'>Email</label>
                        <input className='py-2 px-3 border border-gray-200 rounded-md  outline-gray-300 ' name="email" type="text" value={input.email} onChange={inputHandle} placeholder='Enter your Email'/>

                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-[14px] font-semibold text-gray-700' htmlFor='password'>Password</label>
                        <input  className='py-2  px-3 border border-gray-200 rounded-md  outline-gray-300 '  name="password" type="password" value={input.password}  onChange={inputHandle} placeholder='Enter Password'/>
                    </div>
                    <button onClick={handleSubmit} className='bg-yellow-300 hover:bg-yellow-400 rounded-md text-[17px] py-2 text-[#0d2836] font-semibold ' >Log in</button>
                    <p className='text-gray-400 text-[15px] font-semibold'>Don't have an account? <Link to="/"><span className='text-blue-700 hover:text-blue-800'>Register here</span></Link> </p>
                </form>
            </div>
        </div>

    </div>
  )
}

export default Login