
import React, { useState } from 'react'
import StatusModal from './StatusModal'

function SessionsListSection({AllSessions,LoadingAllSession,ErrorAllSession}) {
  const [modelToggle,setModalToggle] =useState(false);
  if(LoadingAllSession){
    return(
    <div>
        <h2>Sessions List</h2>
        <h2>Loading...Please wait.</h2>
    </div>)
  }
  if(ErrorAllSession){
    return(
      <div>
          <h2>Sessions List</h2>
          <h2>Sorry,We ran into a Error Please try again.</h2>
      </div>)
  }
  if(AllSessions){
    return (
      <div>
        <StatusModal toggle={modelToggle} setToggle={setModalToggle}/>
          <h2>Sessions List</h2>
          <p>desc desc desc desc desc desc desc desc desc desc</p>
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
                  <th  className='text-left px-3 py-3'>Confirmation Code</th>
                </tr>
              </thead>
              <tbody >
                {AllSessions.map((item,index)=><tr className='cursor-pointer hover:bg-gray-100 border-b' key={index}>
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.service}</th>
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.location}</th>
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.userName}</th>
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.userPhoneNumber}</th>
                    {item?.totalPrice == 0 || null || undefined?<th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.basePrice}</th>:<th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.totalPrice}</th>}
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.createdAt}</th>
                    <th  className='text-center font-semibold px-2 py-2 text-gray-800'><button className='px-2 py-1 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>setModalToggle(!modelToggle)}>Assign</button></th>
                </tr>)}
              </tbody>
            </table>
          </div>
          
      </div>
    )
  }

}

export default SessionsListSection