import React, { useEffect, useState } from 'react'
import MultiSelect from '../common/multiSelect'
import { toast } from 'react-toastify';
import axios from 'axios';
import { SERVICEPROVIDER_API_ENDPOINT } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

function ProfileUpdateForm() {
    const userData = useSelector((state)=>state.auth.user);
    const dispatch = useDispatch();
    const [formData,setFormData] = useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        servicesLocation:[],
        ratings:"",
        servicesOffered:[],
        availability:[]
    });
    useEffect(()=>{
        setFormData({fullname:userData.fullname,
            email:userData.email,
            phoneNumber:userData.phoneNumber,
            servicesLocation:userData.servicesLocation,
            ratings:userData.ratings,
            servicesOffered:userData.servicesOffered
            ,
            availability:userData.availability})
            
    },[userData])
    const handleInputData = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const data = {
                skills:formData?.servicesOffered,
                phoneNumber:formData?.phoneNumber,
                locationsOffer:formData?.servicesLocation,
                availability:formData?.availability,
                fullname:formData.fullname
            }
        const resp = await axios.post(SERVICEPROVIDER_API_ENDPOINT+'/updateProfile',data,{withCredentials:true});
        if(resp){
            toast.success("Update Successfull.");
            dispatch(setUser({...userData,phoneNumber:formData?.phoneNumber,
                servicesLocation:formData?.servicesLocation,
                availability:formData?.availability,
                fullname:formData?.fullname,
                servicesOffered:formData?.servicesOffered
            }))
        }      
        }catch(error){
            toast.error("Something went wrong.")
            console.log(error)
        }
    }
    // console.log(formData)
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
                    {/* <div className='flex flex-col gap-2'>
                        <label className='text-[14px] font-semibold text-gray-700' htmlFor='address'>Address</label>
                        <input className='py-2 px-3 border border-gray-200 rounded-md  outline-gray-300 ' name="address" type="text" placeholder='Enter your Address'/>
                    </div>                                      */}
                    {/* Add Service Location */}
                    <div className='col-span-1 md:col-span-2'>
                        <div className=' '>
                            <MultiSelect field={"servicesLocation"} formData={formData} 
                            heading={"Add Service Locations"} setFormData={setFormData}  />
                        </div>
                        {/* Add Service Offered */}
                        <div className=' '>
                            <MultiSelect field={"servicesOffered"} formData={formData} 
                            heading={"Add your Offered services"} setFormData={setFormData}  />
                        </div>
                        {/* Add  Availability */}
                        <div className=' '>
                            <MultiSelect field={"availability"} formData={formData} 
                            heading={"Add your Availability"} setFormData={setFormData}  />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 md:col-span-2'>
                        <button 
                        onClick={(e)=>handleSubmit(e)}
                        className='bg-yellow-300 hover:bg-yellow-400 rounded-md text-[17px] py-2 text-[#0d2836] font-semibold ' 
                        >Update Details</button>
                    </div>
                </form>

    </div>
  )
}

export default ProfileUpdateForm