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
import { setUser } from '../redux/slices/userSlice'


import { useDispatch } from 'react-redux'
import { Check, X } from 'lucide-react'
    function Register() {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const notify = (text:string) => toast.error(text);
        let passCheckConstants = ["Lowercase letters","Uppercase letter.","Number.","Special characters.","Atleast 8 characters"]
        const [input,setInput]=useState({
            fullname:"",
            phoneNumber:0,
            address:"",
            email:"",
            password:""
        })
        const [passError,setPassError]=useState<string[]>([]);
        const inputHandle = (e)=>{
            setInput({...input,[e.target.name]:e.target.value})
        }
        console.log("Pass Error",passError);
        const passCheck = (password:string)=>{
            const errors:string[] =[];
            if(!/[a-z]/.test(password)){
                errors.push("Lowercase letters")
            }
            if(!/[A-Z]/.test(password)){
                errors.push("Uppercase letter.")
            }
            if(!/\d/.test(password)){
                errors.push("Number.")
            }
            if (!/[@$!%*?&]/.test(password)) {
                errors.push("Special characters.");
              }
              if (password.length < 8) {
                errors.push("Atleast 8 characters");
              }
              if(errors.length>0){
                setPassError(errors)
                return false
              }else{
                return true
              }
        }   
        const handleSubmit = async(e)=>{
            e.preventDefault();
            // try{
            //     const resp = await axios.post(`${USER_API_ENDPOINT}/login`,input,{
            //         headers: {
            //             "Content-Type": "application/json"
            //         },
            //         withCredentials: true,
            //     });
            //     if (resp?.data?.success === false) {
            //         notify(resp?.data?.message);
            //     } else {
            //         dispatch(setUser(resp?.data?.user));
            //         navigate('/');
            //         toast.success('Login successful!');
            //     }
            // }catch(error:any){
            //     if (error.response) {
            //         // Server responded with a status other than 2xx
            //         notify(error.response.data.message || "Something went wrong on the server.");
            //     }
            // }
            try{
                console.log(input);
                const passValidator = passCheck(input.password);
                if(!passValidator){
                    return null;
                }
                const resp = await axios.post(`${USER_API_ENDPOINT}/register`,input,{
                    headers:{
                        "Content-Type":"application/json"
                    },
                    withCredentials:true
                });
                if(resp){
                    toast.success("User Registered Successfully.");
                    navigate('/login')
                }
            }catch(error){
                console.log(error);
                toast.error("Something went wrong.")
            }
        }
  return (
    <div className=''>
        <div className='max-w-7xl mx-auto py-10 px-5 md:px-10 flex flex-col md:flex-row '>
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

            <div className=' p-2 md:px-6 md:py-10 w-[100%] md:w-[45%] '>
                <h2 className='text-3xl font-semibold text-[#0d2836] '>
                    Register User
                </h2>
                <p className='text-[14px] text-gray-500 font-semibold my-4'>Good Day! Please Register yourself. To Continue.</p>
                <form className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    {/* UserName */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-[14px] font-semibold text-gray-700' htmlFor='fullname'>Name</label>
                        <input className='py-2 px-3 border border-gray-200 rounded-md  outline-gray-300 ' name="fullname" type="text" value={input.fullname} onChange={inputHandle} placeholder='Enter your Name'/>
                    </div>
                    {/* Email */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-[14px] font-semibold text-gray-700' htmlFor='email'>Email</label>
                        <input className='py-2 px-3 border border-gray-200 rounded-md  outline-gray-300 ' name="email" type="text" value={input.email} onChange={inputHandle} placeholder='Enter your Email'/>
                    </div>
                    {/* Phone */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-[14px] font-semibold text-gray-700' htmlFor='phone'>Phone</label>
                        <input className='py-2 px-3  border border-gray-200 rounded-md  outline-gray-300 ' name="phoneNumber" type="tel" value={input.phoneNumber} onChange={inputHandle} placeholder='Enter your Phone Number'/>
                    </div>   
                    {/* Address */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-[14px] font-semibold text-gray-700' htmlFor='address'>Address</label>
                        <input className='py-2 px-3 border border-gray-200 rounded-md  outline-gray-300 ' name="address" type="text" value={input.address} onChange={inputHandle} placeholder='Enter your Address'/>
                    </div>                                     
                    {/* Password */}
                    <div className='flex flex-col md:col-span-2 gap-2'>
                        <label className='text-[14px] font-semibold text-gray-700' htmlFor='password'>Password</label>
                        <input  className='py-2  px-3 border border-gray-200 rounded-md  outline-gray-300 '  name="password" type="password" value={input.password}  onChange={inputHandle} placeholder='Enter Password'/>
                    </div>

                        {passError && passError.length>0 ? 
                        <div className='flex gap-2 flex-col md:col-span-2' >
                        <h2 className='text-[16px]  text-gray-800'>Password must contain:</h2>
                        <div className='grid grid-cols-1  md:grid-cols-2 gap-1'>
                        {passCheckConstants.map((e,index)=>
                        (<div className=' text-gray-600 text-[14px]' key={index}>{passError.includes(e)?<div className='flex flex-row items-center text-[12px] md:text-[16px]'><X className='text-red-500 w-4 h-4 md:w-6 md:h-6'/><p>{e}</p></div>:<div  className='flex flex-row items-center text-[12px] md:text-[16px]' ><Check className='text-green-500 w-4 h-4 md:w-6 md:h-6'/><p>{e}</p></div>}</div>)) }
                        </div>
                        </div>
                        :null}

                    <div className='flex flex-col gap-4 md:col-span-2'>
                        <button onClick={handleSubmit} className='bg-yellow-300 hover:bg-yellow-400 rounded-md text-[17px] py-2 text-[#0d2836] font-semibold ' >Register user.</button>
                        <p className='text-gray-400 text-[15px] font-semibold'>Have an account? <Link to="/login"><span className='text-blue-700 hover:text-blue-800'>Sign-in here</span></Link> </p>
                    </div>
                </form>
            </div>
        </div>

    </div>
  )
}

export default Register