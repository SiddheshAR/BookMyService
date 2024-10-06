import React, { useEffect, useRef, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toast } from 'react-toastify';
import axios from 'axios';
const StatusModal = ({toggle,setToggle,activeItem,setActiveItem})=>{
    const ServiceProviderList = useSelector((store:RootState)=>store.serviceProvider.allServiceProviders);
    const LoadServiceProviderList = useSelector((store:RootState)=>store.serviceProvider.loadingServiceProviders);
    const ErrorServiceProviderList = useSelector((store:RootState)=>store.serviceProvider.errorServiceProviders);
    const [selectedOption, setSelectedOption]  = useState(null);
    // console.log(selectedOption)
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const handleClickOutside = (event:MouseEvent)=>{
        if(modalRef.current && !modalRef.current.contains(event.target as Node)){
            setToggle(false)
            setActiveItem(null)
        }
    }
    const handleDropdown = (event)=>{
        setSelectedOption(event.target.value);
    }

    const handleUpdateSession = async()=>{
        try{
            let optionData = selectedOption.split('|')
            const data = {
                sessionId: activeItem?._id,
                serviceproviderId: optionData?.[1],
                serviceproviderName: optionData?.[0]
            }
            console.log(data);
            const resp = await axios.put(`http://localhost:5001/api/v1/service/assignServiceProvider`,data,{withCredentials:true});
            console.log(resp);
            if(resp){
                toast.success("Assigned Succesfully.");
            }
        }catch(error){
            console.log(error)
            toast.error('Something went wrong.')
        }
    }

    // console.log("Active Item",activeItem);
    useEffect(()=>{
        if(toggle){
            document.addEventListener('mousedown',handleClickOutside);
        }else{
            document.removeEventListener('mousedown',handleClickOutside);
        }
    },[toggle])

    const ServiceProviderDropDown = ()=>{
        if(LoadServiceProviderList){
            return(<div>
                <h2>Fetching Server Provider Data.</h2>
            </div>)
        }
        if(ErrorServiceProviderList){
        return(<div>
            <h2>Error Loading Data.</h2>
        </div>)
        }    

        return(
            <div>
            <select
                id="dropdown"
                onChange={handleDropdown} 
                value={selectedOption}
                className="p-2 border rounded-lg bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent">
                <option value={""} disabled>
                Select a Suitable Service Provider
                </option>
                {ServiceProviderList.map((e,index)=>{
                    return(                
                    <option key={index} value={`${e?.fullname}|${e?._id}`}>
                        {e?.fullname}
                    </option>
                    )
                })}
            </select>
        </div>
        )
    }

    return(
        <div>
            {toggle && 
            <>
                <div className='fixed z-10 inset-0 flex bg-black bg-opacity-50 justify-center items-center'>
                    <div ref={modalRef} className='mx-4 p-3 md:p-6 max-w-lg min-w-[250px] md:min-w-[400px] bg-white relative z-40'>
                    <div onClick={()=>setToggle(false)} className='absolute cursor-pointer z-50 top-3 right-3'><IoMdClose/></div>

                        <div className='p-2 flex flex-col gap-1'>
                            <h2 className='text-2xl font-semibold text-gray-800'>Assign Service Provider</h2>
                            <p className='text-[13px] font-semibold text-gray-400'>Service Summary :</p>
                            <h2 className='font-semibold text-gray-800'>{`Service Name: ${activeItem?.service}`}</h2>
                            <h2 className='text-[16px] font-semibold text-gray-800'>{`Address: ${activeItem?.location}`}</h2>
                            <h2 className='text-[16px] font-semibold text-gray-800'>{`Total Price:${activeItem?.totalPrice}`}</h2>
                            <h2 className='text-[13px] font-semibold text-gray-400'>Offerings List:</h2>
                            <div className='flex flex-col'>
                                {activeItem?.offerings.length>0 ?activeItem?.offerings.map((e,index)=><p className='text-[15px] text-gray-800' key={index}>{e.name}</p>):<p>No Offerings Selected</p>}
                            </div>
                        </div>
                        <ServiceProviderDropDown/>
                        <button className='rounded-md border cursor-pointer px-3 py-1 my-2 bg-yellow-400' disabled={selectedOption===null} onClick={handleUpdateSession}>Assign</button>
                    </div>
                </div>
            </> 
             }
        </div>
    )
}

export default StatusModal