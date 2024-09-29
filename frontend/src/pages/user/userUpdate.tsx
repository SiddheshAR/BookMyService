import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_ENDPOINT } from '../../utils/constants';
import { toast } from 'react-toastify';

function UserProfileUpdate() {
    const userData = useSelector((state)=>state.auth.user);
    const dispatch = useDispatch();
    const [formData,setFormData] = useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        address:""
    });
    const handleInputData = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
        try{
            e.preventDefault();
            const resp = await axios.post(USER_API_ENDPOINT+"/update",
                formData
            ,{withCredentials:true}); 
            if(resp){
                toast.success("Update Succesfull")
            } 
            // console.log(resp);
            // console.log(resp);
        }catch(error){
            console.log(error);
            toast.error("Update Fail")

        }
    }
    useEffect(()=>{
        setFormData({
            fullname:userData.fullname,
            email:userData.email,
            phoneNumber:userData.phoneNumber,
            address:userData.address,
            password:""
        });
    },[userData])
  return (
    <div className='max-w-[600px] mx-auto px-8 md:px-5 my-10'>
                        <h2 className='text-3xl my-4 font-semibold text-[#0d2836] '>
                  Update your Details  
                </h2>
                {/* <p className='text-[14px] text-gray-500 font-semibold my-4'>Good Day! Please Register yourself. To Continue.</p> */}
                <form className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    {/* UserName */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-[14px] font-semibold text-gray-700' htmlFor='fullname'>Name</label>
                        <input className='py-2 px-3 border w-full border-gray-200 rounded-md  outline-gray-300 ' name="fullname" type="text" placeholder='Enter your Name'  value={formData.fullname} onChange={handleInputData}/>
                    </div>
                    {/* Phone */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-[14px] font-semibold text-gray-700' htmlFor='phone'>Phone</label>
                        <input className='py-2 px-3  border border-gray-200 rounded-md  outline-gray-300 ' value={formData.phoneNumber}  onChange={handleInputData} name="phoneNumber" type="tel" placeholder='Enter your Phone Number'/>
                    </div>   
                    {/* Address */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-[14px] font-semibold text-gray-700' htmlFor='address'>Address</label>
                        <input  value={formData.address}  onChange={handleInputData} className='py-2 px-3 border border-gray-200 rounded-md  outline-gray-300 ' name="address" type="text" placeholder='Enter your Address'/>
                    </div>        
                    {/* Email */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-[14px] font-semibold text-gray-700' htmlFor='address'>Email</label>
                        <input  value={formData.email}  onChange={handleInputData} className='py-2 px-3 border border-gray-200 rounded-md  outline-gray-300 ' name="password" type="text" placeholder='Enter Password'/>
                    </div>                              
                    {/* Password */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-[14px] font-semibold text-gray-700' htmlFor='address'>Password</label>
                        <input  value={formData.password}  onChange={handleInputData} className='py-2 px-3 border border-gray-200 rounded-md  outline-gray-300 ' name="password" type="password" placeholder='Enter Password'/>
                    </div> 

                    <div className='flex flex-col gap-4 md:col-span-2'>
                        <button 
                        onClick={(e)=>handleSubmit(e)}
                        className='bg-yellow-300 hover:bg-yellow-400 rounded-md text-[17px] py-2 text-[#0d2836] font-semibold ' 
                        >Update Details</button>
                    </div>
                </form>
</div>  )
}

export default UserProfileUpdate