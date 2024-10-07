import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';

function ServiceBookingModal({serviceDateTime,user,offeringsList,totalPrice,serviceData,bookingToggle,setBookingToggle,handleSessionBooking}) {
// console.log("OfferingList:",offeringsList)
// console.log(user);
console.log("Service Date Time",serviceDateTime);

const navigate = useNavigate();
  return (
    <div>
        {bookingToggle &&    <div className='fixed  inset-0 z-10 flex flex-row justify-center items-center w-full h-full bg-gray-500 bg-opacity-80'>
        {user && user.role=="user" ?         <div className='bg-white rounded-md max-w-[290px] md:min-w-[450px] md:max-w-[500px] p-3 relative'>
           <div className='absolute right-2 top-2 cursor-pointer' onClick={()=>setBookingToggle(false)}><IoMdClose/></div> 
            <h1 className='text-2xl '>Confirm booking</h1>
            {/* <p>kokodksocksdafsdokf dksf ksad</p> */}
            <h2 className='text-gray-400'>Booking details:</h2>
            <div className='text-[14px] text-gray-600'>
                <p>Name: {serviceData?.name}</p>
                <p>Location: {user?.address}</p>
                <p>Date: 
                {serviceDateTime?.getDate()}/{serviceDateTime?.getMonth() + 1}/{serviceDateTime?.getFullYear()}
                </p>
                <p>Time: {serviceDateTime?.getHours()}:{serviceDateTime?.getMinutes().toString().padStart(2, '0')}</p>                
                <p>Total Price: {totalPrice}</p>  
                <p>Offerings:</p>
                <ul className='list-disc pl-2'>
                    {offeringsList && offeringsList.length> 0 ?
                    offeringsList.map((e)=>{
                        const [name,price] = Object.entries(e)[0];
                        return(<li className='ml-2'>{name}: {price} Rs</li>)
                    }):<p>No Offerings selected</p>
                }
                    
                </ul>
            </div>
            <div className='flex flex-row gap-2 my-3 justify-center'>
                    <button onClick={()=>setBookingToggle(false)} className='bg-[#0d2836] py-2 px-3 inline-block rounded-md text-white font-semibold'>Cancel</button> 
                    <button onClick={handleSessionBooking} className='bg-yellow-400 py-2 px-3 inline-block rounded-md text-[#0d2836] font-semibold'>Confirm Booking.</button>  
                </div>
        </div>:
        <div className='bg-white rounded-md max-w-[290px] md:min-w-[450px] md:max-w-[500px] p-3 relative'>
                       <div className='absolute right-2 top-2 cursor-pointer' onClick={()=>setBookingToggle(false)}><IoMdClose/></div> 

            <h2 className='text-xl text-center my-3'>Please Login or Register to Book Services</h2>
            <p className='text-center text-gray-500'>Your one-stop solution! Enjoy relaxing spa treatments, stylish hair salon sessions, home services, and more with certified professionals, competitive pricing, and hassle-free booking, all in one place.</p>
            <div className='flex flex-row gap-2 my-2 justify-center'>
                <button onClick={()=>navigate('/register')} className='bg-[#0d2836] py-2 px-3 inline-block rounded-md text-white font-semibold'>Register</button> 
                <button onClick={()=>navigate('/login/user')} className='bg-yellow-400 py-2 px-3 inline-block rounded-md text-[#0d2836] font-semibold'>Login</button>  
                </div>
        </div>}

    </div> }
    </div>

  )
}

export default ServiceBookingModal