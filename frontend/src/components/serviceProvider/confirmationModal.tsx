import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { SESSION_API_ENDPOINT } from '../../utils/constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchAssignedServices } from '../../redux/slices/serviceProviderSessions';

function ConfirmationModal({selectedItem,modalToggle,setModalToggle,closeModal}) {
    const [input,setInput] = useState("");
    const dispatch = useDispatch();
    // console.log(selectedItem);
    const handleConfirmCode = async(e)=>{
        try{
            e.preventDefault();
            if(input.length<4){
                toast.error("Enter Correct Code")
                return
            }
            const resp =await axios.post(SESSION_API_ENDPOINT+"/confirmcode",{
                code:input,
                sessionId:selectedItem._id
            },{withCredentials:true});
            if(resp){
                toast.success("Code Confirmed!");
                console.log("Check")
                dispatch(fetchAssignedServices());
                closeModal();
            }
        }catch(error){
            console.log(error);
            toast.error(error?.response?.data?.message || "An Error Occured")
        }
    }


  return (
    <div>
        {modalToggle && 
            <div className='fixed z-20 flex flex-row items-center justify-center inset-0 bg-black min-w-full h-full bg-opacity-25'>
                <div className='bg-white relative p-2 md:p-4 flex flex-col gap-3 z-40 max-w-[250px] md:max-w-[400px] rounded-md '>
                    
                    <div>
                        <h2 className='text-2xl font-semibold text-gray-700 text-center pt-3'>
                            <span className=''>Enter</span> Verification Code
                        </h2>
                        <p className='text-gray-600 text-[13px] mt-1'>Ask Customer to share Verification Code to begin service.</p>
                    </div>

                    <input value={input} onChange={(e)=>setInput(e.target.value)} maxLength={4} className='w-full border text-3xl text-center px-1 py-2 rounded-md' />
                    <button onClick={handleConfirmCode}>Confim</button>
                    <div onClick={closeModal} className='absolute right-3 top-3 cursor-pointer'><IoMdClose/></div>
                </div>  
            </div>
        }
    </div>
  )
}

export default ConfirmationModal