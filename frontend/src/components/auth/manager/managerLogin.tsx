import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import {toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { setUser } from '../../../redux/slices/userSlice';
import { MANAGER_API_ENDPOINT } from '../../../utils/constants';

function ManagerLogin() {
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
          const resp = await axios.post(`${MANAGER_API_ENDPOINT}/login`,input,{
              headers: {
                  "Content-Type": "application/json"
              },
              withCredentials: true,
          });
          if (resp?.data?.success === false) {
              notify(resp?.data?.message);
          } else {
            console.log(resp)
              dispatch(setUser(resp?.data?.data));
              navigate('/');
              toast.success('Login successful!');
          }
      }catch(error:any){
          if (error?.response) {
              // Server responded with a status other than 2xx
              notify(error.response.data.message || "Something went wrong on the server.");
          }
      }
  }
  return (
    <div className=' p-2 md:px-6 md:py-10 w-[100%] md:w-[45%] '>
        <h2 className='text-3xl font-semibold text-[#0d2836] '>
           Sign in as a Manager.
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
            <p className='text-gray-400 text-[15px] font-semibold'>Don't have an account? <Link to="/register"><span className='text-blue-700 hover:text-blue-800'>Register here</span></Link> </p>
        </form>
    </div>
)
}

export default ManagerLogin