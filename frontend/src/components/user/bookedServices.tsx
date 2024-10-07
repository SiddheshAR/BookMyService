import React, { useEffect, useState } from 'react'

function BookedServices({bookedService,setBookedService}) {
    // console.log(bookedService);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const [SessionItems,setSessionItems] =useState(bookedService || []);
    const [filterStatus,setFilterStatus] = useState("none");
    useEffect(()=>{
      function handleFilter(){
        if(filterStatus=="none"){
          setSessionItems(bookedService);
        }
        if(filterStatus == 'confirmed'){
          const filterItems = bookedService.filter((e)=>e.status == "confirmed");
          setSessionItems(filterItems);
          // console.log(filterItems);
        }
        if(filterStatus == 'completed'){
          const filterItems = bookedService.filter((e)=>e.status == "completed");
          setSessionItems(filterItems);
          // console.log(filterItems);
        }
        if(filterStatus == 'started'){
          const filterItems = bookedService.filter((e)=>e.status == "started");
          setSessionItems(filterItems);
          // console.log(filterItems);
        }
        if(filterStatus == 'pending'){
          const filterItems = bookedService.filter((e)=>e.status == "pending");
          setSessionItems(filterItems);
          // console.log(filterItems);
        }
      }
      if(SessionItems){
        handleFilter();        
      }
    },[filterStatus]);

    const timeConverter = (time)=>{
      const newTime = new Date(time);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const serviceTime = `${newTime.getHours()}:${newTime.getMinutes()}`;
      const ampm = newTime.getHours() >= 12 ? 'pm' :'am';
      const serviceDate = `${newTime.getDay()} ${months[newTime.getMonth()-1]} ${newTime.getFullYear()%100}`
  
      return<span className='flex flex-row justify-around text-[14px] text-gray-700'> 
      <p>{serviceDate}</p> 
      <p>{serviceTime}{ampm}</p>
       </span>
    }
    // useEffect(()=>{

    // }[currentPage])
    const totalPages = Math.ceil(SessionItems?.length/itemsPerPage);
    // console.log("Total Pages:",totalPages)
    const currentItems =  SessionItems.slice((itemsPerPage*(currentPage-1)),(currentPage*itemsPerPage))

  return (
    <div>
        <h2 className='text-3xl font-semibold text-gray-800 px-2 my-4'>List of Booked Sessions</h2>

        <div className='flex flex-row gap-3 my-3 flex-wrap'>
        <h2 className='text-[19px]'>Filters</h2>
            <button disabled={filterStatus=="none"} className='px-2 py-1  disabled:bg-gray-300 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>setFilterStatus("none")}>None</button>
            <button  disabled={filterStatus=="pending"}  className='px-2 py-1 disabled:bg-gray-300 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>setFilterStatus("pending")}>Pending</button>
            <button  disabled={filterStatus=="started"}  className='px-2 py-1 disabled:bg-gray-300 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>setFilterStatus("started")}>Started</button>
            <button disabled={filterStatus=="completed"} className='px-2 py-1  disabled:bg-gray-300 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>setFilterStatus("completed")}>Completed</button>
            <button  disabled={filterStatus=="confirmed"}  className='px-2 py-1 disabled:bg-gray-300 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>setFilterStatus("confirmed")}>Confirmed</button>
          </div>
          <div className='mx-auto w-full overflow-x-auto'>
            <table className=' w-full '>
              <thead className='py-5'>
                <tr className=' text-gray-600 text-md text-[15px] border-b'>
                  <th className='text-left px-3 py-3'>Service Name</th>
                  <th  className='text-left px-3 py-3'>Service Provider Name
                  </th>
                  <th  className='text-left px-3 py-3'>Service Provider Contact
                  </th>
                  <th  className='text-left px-3 py-3'>Customer Name</th>
                  <th  className='text-left px-3 py-3'>Service Time</th>
                  <th  className='text-left px-3 py-3'>Price</th>
                  <th  className='text-left px-3 py-3'>Created At</th>
                  <th  className='text-left px-3 py-3'>Confirmation Code</th>
                </tr>
              </thead>
              <tbody >
                {currentItems?.map((item,index)=><tr className='cursor-pointer hover:bg-gray-100 border-b' key={index}>
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.service}</th>
                    {item?.serviceProviderName ? <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item?.serviceProviderName
                    }</th>:<th className='text-left font-semibold px-2 py-2 text-gray-800'>NA</th> }
                      <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.serviceProviderNumber ? item.serviceProviderNumber:"NA"}</th>
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.userName}</th>
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{timeConverter(item.time)}</th>
                    {item?.totalPrice == 0 || null || undefined?<th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.basePrice}</th>:<th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.totalPrice}</th>}
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item?.status}</th>
                    {item?.confirmationCode ? <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item?.confirmationCode
                    }</th>:<th className='text-left font-semibold px-2 py-2 text-gray-800'>NA</th> }
                </tr>)}
              </tbody>
            </table>
            <div className='flex flex-row gap-3 my-3 justify-center'>
            <button   onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='px-2 py-1 disabled:bg-gray-200 disabled:text-gray-400 bg-gray-300 text-gray-800 rounded-md cursor-pointer' >Back</button>
            <button   onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages} className='px-2 py-1 disabled:bg-gray-200 disabled:text-gray-300 bg-gray-300 text-gray-800 rounded-md cursor-pointer' >Next</button>
            </div>
          </div>
    </div>
  )
}

export default BookedServices