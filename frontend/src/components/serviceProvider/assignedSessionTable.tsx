import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ConfirmationModal from './confirmationModal';

function AssignedSessionTable() {
    const [modalToggle,setModalToggle] = useState(false)
    const {assignedServices,loadingAssignedServices,errorLoadAssignedServices} = useSelector(state=>state.assignedServices);
    console.log(assignedServices,loadingAssignedServices,errorLoadAssignedServices);

    if(loadingAssignedServices){
        return(
            <div>
                <h2>Loading....</h2>
            </div>
        )
    }
    if(errorLoadAssignedServices){
        return(
            <div>
                <h2>Error Fetching Data.</h2>
            </div>
        )
    }

  return (
    <div>
        <ConfirmationModal setModalToggle={setModalToggle} modalToggle={modalToggle}/>
                  <div className='mx-auto w-full overflow-x-auto'>
            <table className=' w-full '>
              <thead className='py-5'>
                <tr className=' text-gray-600 text-md text-[15px] border-b'>
                  <th className='text-left px-3 py-3'>Service Name</th>
                  <th  className='text-left px-3 py-3'>Location</th>
                  <th  className='text-left px-3 py-3'>Customer Name</th>
                  <th  className='text-left px-3 py-3'>Customer Phone</th>
                  <th  className='text-left px-3 py-3'>Price</th>
                  <th  className='text-left px-3 py-3'>Created At</th>
                  <th  className='text-left px-3 py-3'>Confirm Code</th>
                </tr>
              </thead>
              <tbody >
                {assignedServices && assignedServices.length>0?(
                assignedServices?.map((item,index)=>
                    <tr className='cursor-pointer hover:bg-gray-100 border-b' key={index}>
                        <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.service}</th>
                        <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.location}</th>
                        <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.userName}</th>
                        <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.userPhoneNumber}</th>
                        {item?.totalPrice == 0 || null || undefined?<th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.basePrice}</th>:<th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.totalPrice}</th>}
                        <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.createdAt}</th>
                        <th  className='text-center font-semibold px-2 py-2 text-gray-800'><button className='px-2 py-1 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>setModalToggle(true)}>Assign</button></th>
                    </tr>
                )
                ):(<tr>No Assigned Tasks yet.</tr>)}

              </tbody>
            </table>
          </div>
    </div>
  )
}

export default AssignedSessionTable