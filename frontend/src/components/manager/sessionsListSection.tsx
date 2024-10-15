
import React, { useEffect, useState } from 'react'
import StatusModal from './StatusModal'
import { ServiceSession } from '../../../types/services';

function SessionsListSection({AllSessions,LoadingAllSession,ErrorAllSession

}:{AllSessions:ServiceSession[],LoadingAllSession:boolean,ErrorAllSession:boolean}) {
  const [modelToggle,setModalToggle] =useState<boolean>(false);
  const [activeItem,setActiveItem] = useState<ServiceSession | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 7;
  const [SessionItems,setSessionItems] =useState<ServiceSession[]>(AllSessions || []);
  const [filterStatus,setFilterStatus] = useState<'none' | 'confirmed' | 'cancelled' | 'pending'> ("none");
  console.log(AllSessions);
  useEffect(()=>{
    function handleFilter(){
      if(filterStatus=="none"){
        setSessionItems(AllSessions);
      }
      if(filterStatus == 'confirmed'){
        const filterItems = AllSessions.filter((e)=>e.status == "confirmed");
        setSessionItems(filterItems);
        // console.log(filterItems);
      }
      if(filterStatus == 'cancelled'){
        const filterItems = AllSessions.filter((e)=>e.status == "cancelled");
        setSessionItems(filterItems);
        // console.log(filterItems);
      }
      if(filterStatus == 'pending'){
        const filterItems = AllSessions.filter((e)=>e.status == "pending");
        setSessionItems(filterItems);
        // console.log(filterItems);
      }
    }
    handleFilter();
  },[filterStatus,AllSessions])

  const handleToggle = (item)=>{
    setActiveItem(item)
    setModalToggle(!modelToggle)
  }

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
  const timeConverter = (time) => {
    const newTime = new Date(time);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const serviceTime = `${newTime.getHours() % 12 || 12}:${newTime.getMinutes().toString().padStart(2, '0')}`;
    const ampm = newTime.getHours() >= 12 ? 'pm' : 'am';
    const serviceDate = `${newTime.getDate()} ${months[newTime.getMonth()]} ${newTime.getFullYear()}`
    return (
        <span className='flex flex-row justify-around text-[14px] text-gray-700'>
            <p>{serviceDate}</p>
            <p>{serviceTime}{ampm}</p>
        </span>
    )
}
  const StatusButton = (item)=>{
    switch(item.status){
        case "pending":
          return(
          <button className='px-2 py-1 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>handleToggle(item)}>Assign</button>)
        case "cancelled":
          return(
            <button className='px-2 py-1 bg-red-400 text-white rounded-md cursor-pointer'>Cancel</button>
          )
        case "started":
          return(
            <button className='px-2 py-1 bg-green-600 text-white rounded-md cursor-pointer'>Started</button>
          )
          case "completed":
            return(
              <button className='px-2 py-1 bg-gray-600 text-white rounded-md cursor-pointer'>Completed</button>
            )
            case "confirmed":
              return(
                <button className='px-3 py-2 text-[11px] bg-blue-800 text-white rounded-md cursor-pointer'>
                  <div className='flex flex-col'>
                    <p>Confirmed</p>
                    <p>Code:{item?.confirmationCode}</p>
                  </div>
                 
                </button>
              )
    }

  }
  if(SessionItems){
    const totalPages = Math.ceil(SessionItems?.length/itemsPerPage);
    const currentItems =  SessionItems.slice((itemsPerPage*(currentPage-1)),(currentPage*itemsPerPage))
    return (
      <div>
        <div>

          <div className='flex flex-row gap-3 my-3'>
          <h2 className='text-xl'>Apply Filters</h2>
          <button disabled={filterStatus=="none"} className='px-2 py-1  disabled:bg-gray-300 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>setFilterStatus("none")}>None</button>
          <button  disabled={filterStatus=="pending"}  className='px-2 py-1 disabled:bg-gray-300 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>setFilterStatus("pending")}>Pending</button>
          <button disabled={filterStatus=="cancelled"} className='px-2 py-1  disabled:bg-gray-300 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>setFilterStatus("cancelled")}>Cancelled</button>
          <button  disabled={filterStatus=="confirmed"}  className='px-2 py-1 disabled:bg-gray-300 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>setFilterStatus("confirmed")}>Confirmed</button>
          </div>
        </div>
        <StatusModal  toggle={modelToggle} setToggle={setModalToggle} activeItem={activeItem} setActiveItem={setActiveItem}/>
          <h2 className='text-3xl font-semibold text-gray-800 px-2'>Sessions List</h2>
          <div className='mx-auto w-full overflow-x-auto'>
            <table className=' w-full '>
              <thead className='py-5'>
                <tr className=' text-gray-600 text-md text-[14px] border-b'>
                  <th className='text-left px-3 py-3'>Service Name</th>
                  <th  className='text-left px-3 py-3'>Location</th>
                  <th  className='text-left px-3 py-3'>Customer Name</th>
                  <th  className='text-left px-3 py-3'>Customer Phone</th>
                  <th  className='text-left px-3 py-3'>Price</th>
                  <th  className='text-left px-3 py-3'>Scheduled Time</th>
                  <th className='text-left px-3 py-3'>Assigned Provider</th>
                  <th className='text-left px-3 py-3'>Service Provider Contact</th>
                  <th  className='text-left px-3 py-3'>Confirmation Code</th>
                </tr>
              </thead>
              <tbody >
                {currentItems?.map((item,index)=><tr className='cursor-pointer text-[14px] hover:bg-gray-100 border-b' key={index}>
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.service}</th>
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.location}</th>
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.userName}</th>
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.userPhoneNumber}</th>
                    {item?.totalPrice == 0 || null || undefined?<th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.basePrice}</th>:<th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.totalPrice}</th>}
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{timeConverter(item?.time)}</th>

                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item?.serviceProviderName || 'Not Assigned'}</th>
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.serviceProviderNumber || 'Not Available'}</th>
                    <th className='text-center font-semibold px-2 py-2 text-gray-800'>{StatusButton(item)}</th>
                </tr>)}
              </tbody>
            </table>
            <div className='flex flex-row gap-3 my-3 justify-center'>
            <button   onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='px-2 py-1 disabled:bg-gray-200 disabled:text-gray-400 bg-gray-300 text-gray-800 rounded-md cursor-pointer' >Back</button>
            <button             onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages} className='px-2 py-1 disabled:bg-gray-200 disabled:text-gray-300 bg-gray-300 text-gray-800 rounded-md cursor-pointer' >Next</button>
            </div>
          </div>
          
      </div>
    )
  }

}

export default SessionsListSection