import axios from 'axios';
import React from 'react'
import { IoMdClose } from 'react-icons/io';
import { SESSION_API_ENDPOINT } from '../../utils/constants';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchAssignedServices } from '../../redux/slices/serviceProviderSessions';

function EditStatusModal({sessionStatus,setSessionStatus,setSelectedItem,selectedItem}) {
  const dispatch = useDispatch();

  const handleCloseModal = ()=>{
    setSessionStatus(null);
  }
  const handleStatusChange = async()=>{
    try{
      const data = {
        sessionId:selectedItem._id,
        UpdatedStatus:sessionStatus
      }
      console.log(data);
      const resp = await axios.post(SESSION_API_ENDPOINT+"/updateStatus",data,{
        withCredentials:true
      });
      if(resp){
        toast.success("Update Successfull.");
        dispatch(fetchAssignedServices());
        setSessionStatus(null);
        setSelectedItem(null);
      }
    }catch(error){
      console.log(error)
    }
  }

  const handleStatusClose = ()=>{
    setSelectedItem(null);
    setSessionStatus(null);
  }

  return (
    <div>
    {sessionStatus && <div className='fixed z-20 flex flex-row items-center justify-center inset-0 bg-black min-w-full h-full bg-opacity-25'>
        <div className='bg-white relative  md:p-4 flex flex-col gap-3 z-40 max-w-[250px] md:max-w-[350px] rounded-md '>
            <div className='flex flex-col gap-1 px-3 md:px-1 py-4 md:py-2'>
              <h2 className='text-xl md:text-2xl font-semibold'>
              {sessionStatus=="cancelled"?"Confirm Session Cancellation":"Confirm Completion"}
              </h2>
              <p className='text-gray-600 text-[13px] md:text-[15px]'>
              {sessionStatus=="cancelled"?" Are you sure you want to cancel this session? ":"Your progress has been saved. Confirm completion to mark this session as finished."}
              </p>
                <div className='mt-4 flex flex-row gap-2   md:gap-3 justify-center'>
                    <button onClick={handleStatusClose} className='px-1.5 md:px-3  py-1.5 bg-gray-800  text-[12px] md:text-[15px]  text-white rounded-md cursor-pointer'>Close</button>
                    {sessionStatus=="cancelled"?<button onClick={handleStatusChange} className='px-1.5 md:px-3  py-1.5 bg-red-700 text-white rounded-md cursor-pointer text-[12px] md:text-[15px]'>Confirm Session Cancellation</button>: <button  onClick={handleStatusChange}  className='px-1.5 md:px-3 py-1.5 bg-green-700 text-white rounded-md cursor-pointer  text-[12px] md:text-[15px]'>Confirm Session Completion</button>}


                </div>
            </div>
            <div onClick={handleCloseModal} className='absolute right-3 top-3 cursor-pointer'><IoMdClose/></div>
        </div>
    </div> }
  </div>
  )
}

export default EditStatusModal