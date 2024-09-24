import React from 'react'
import { IoMdClose } from 'react-icons/io'

function ConfirmationModal({modalToggle,setModalToggle}) {

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

                    <input className='w-full border text-3xl text-center px-1 py-2 rounded-md' />
                    <button>Confim</button>
                    <div onClick={()=>setModalToggle(false)} className='absolute right-3 top-3 cursor-pointer'><IoMdClose/></div>
                </div>  
            </div>
        }
    </div>
  )
}

export default ConfirmationModal