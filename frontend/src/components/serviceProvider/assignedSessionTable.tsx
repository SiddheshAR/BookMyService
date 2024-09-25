import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ConfirmationModal from './confirmationModal';

function AssignedSessionTable() {
    const [modalToggle,setModalToggle] = useState(false)
    const {assignedServices,loadingAssignedServices,errorLoadAssignedServices} = useSelector(state=>state.assignedServices);

    const [selectedItem,setSelectedItem]= useState(null);
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
    const closeModal = ()=>{
      setModalToggle(false);
      setSelectedItem(null);
    }
    const handleToggle = (item)=>{
      console.log(item);
      setModalToggle(true);
      setSelectedItem(item)
    }
  return (
    <div>
        <ConfirmationModal selectedItem={selectedItem} setModalToggle={setModalToggle} closeModal={closeModal} modalToggle={modalToggle}/>
                  <div className='mx-auto w-full overflow-x-auto'>
            <table className=' w-full '>
              <thead className='py-5'>
                <tr className=' text-gray-600 text-md text-[15px] border-b'>
                  <th className='text-left w- px-3 py-3'>Service Name</th>
                  <th className='text-left px-3 py-3'>Offerings</th>
                  <th  className='text-left px-3 py-3'>Location</th>
                  <th  className='text-left px-3 py-3'>Customer Name</th>
                  <th  className='text-left px-3 py-3'>Customer Phone</th>
                  <th  className='text-left px-3 py-3'>Price</th>
                  <th  className='text-left px-3 py-3'>Confirm Code</th>
                </tr>
              </thead>
              <tbody >
                {assignedServices && assignedServices.length>0?(
                assignedServices?.map((item,index)=>
                    <tr className='cursor-pointer hover:bg-gray-100 border-b' key={index}>
                        <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.service}</th>
                        <td className='text-left font-semibold px-2 py-2 text-gray-800 '>
                          {item?.offerings.length<1 ? <p>NA</p>:                          <ul>
                            { item?.offerings.map((offering,index)=><li key={index} className='text-[13px]  overflow-clip  text-gray-500'>{index+1}. {offering.name}</li>)}
                          </ul>}

                        </td>
                        <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.location}</th>
                        <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.userName}</th>
                        <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.userPhoneNumber}</th>
                        {item?.totalPrice == 0 || null || undefined?<th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.basePrice}</th>:<th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.totalPrice}</th>}
                        <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.createdAt}</th>
                        {item.status =="started"?<th>
                          
                        </th>:
                                                <th  className='text-center font-semibold px-2 py-2 text-gray-800'><button className='px-2 py-1 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>handleToggle(item)}>Confirm</button></th>
                        }

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