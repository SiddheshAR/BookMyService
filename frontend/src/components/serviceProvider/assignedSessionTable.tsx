import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ConfirmationModal from './confirmationModal';
import EditStatusModal from './EditStatusModal';
import { ServiceSession } from '../../../types/services';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

function AssignedSessionTable() {
    const [modalToggle,setModalToggle] = useState<boolean>(false);
    const [sessionStatus,setSessionStatus]=useState<string | null>(null);
    const {assignedServices,loadingAssignedServices,errorLoadAssignedServices} = useSelector(state=>state.assignedServices);
    const [selectedItem,setSelectedItem]= useState(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 7;
    const [SessionItems,setSessionItems] =useState<ServiceSession[]>(assignedServices || []);
    const [filterStatus,setFilterStatus] = useState<'none' | 'confirmed' | 'completed' | 'started'>("none");
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortField, setSortField] = useState<'time' | 'price' | null>(null);

    useEffect(() => {
      function handleFilter() {
          let filteredItems = assignedServices;
          if (filterStatus !== "none") {
              filteredItems = assignedServices.filter(e => e.status === filterStatus);
          }
          setSessionItems(filteredItems);
      }
      if (assignedServices) {
          handleFilter();
      }
  }, [filterStatus, assignedServices]);

  useEffect(() => {
    function handleSort() {
        if (sortField) {
            const sortedItems = [...SessionItems].sort((a, b) => {
                const aValue = sortField === 'time' ? new Date(a.time).getTime() : a.totalPrice || a.basePrice;
                const bValue = sortField === 'time' ? new Date(b.time).getTime() : b.totalPrice || b.basePrice;
                return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
            });
            setSessionItems(sortedItems);
        }
    }
    handleSort();
}, [sortOrder, sortField]);

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
    const totalPages = Math.ceil(SessionItems?.length/itemsPerPage);
    // console.log("Total Pages:",totalPages)
    const currentItems =  SessionItems.slice((itemsPerPage*(currentPage-1)),(currentPage*itemsPerPage))
  return (
    <div>
                  <h2 className='text-xl'>Apply Filters</h2>

          <div className='flex flex-row gap-3 my-3 flex-wrap'>
            <button disabled={filterStatus=="none"} className='px-2 py-1  disabled:bg-gray-300 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>setFilterStatus("none")}>None</button>
            <button  disabled={filterStatus=="started"}  className='px-2 py-1 disabled:bg-gray-300 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>setFilterStatus("started")}>Started</button>
            <button disabled={filterStatus=="completed"} className='px-2 py-1  disabled:bg-gray-300 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>setFilterStatus("completed")}>Completed</button>
            <button  disabled={filterStatus=="confirmed"}  className='px-2 py-1 disabled:bg-gray-300 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>setFilterStatus("confirmed")}>Confirmed</button>
          </div>
          <div className="flex gap-4 mb-4">
                <button onClick={() => { setSortField('time'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }} className='px-2 py-1 bg-yellow-400 rounded'>
                    Sort by Time {sortOrder === 'asc' && sortField === 'time' ? <span className='inline-block mt-1'> <IoMdArrowDropup/></span> :<span className='inline-block mt-1'> <IoMdArrowDropdown /></span>}
                </button>
                <button onClick={() => { setSortField('price'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }} className='px-2 py-1 bg-yellow-400 rounded'>
                    Sort by Price {sortOrder === 'asc' && sortField === 'price' ?<span className='inline-block mt-1'> <IoMdArrowDropup/></span> : <span className='inline-block mt-1'> <IoMdArrowDropdown /></span>}
                </button>
            </div>
        <ConfirmationModal selectedItem={selectedItem} setModalToggle={setModalToggle} closeModal={closeModal} modalToggle={modalToggle}/>
        <EditStatusModal setSelectedItem={setSelectedItem} selectedItem={selectedItem}  sessionStatus={sessionStatus} setSessionStatus={setSessionStatus} />
                  <div className='mx-auto w-full overflow-x-auto'>
            <table className=' w-full '>
              <thead className='py-2'>
                <tr className=' text-gray-600 text-md text-[15px] border-b'>
                  <th className='text-left w- px-3 py-3'>Service Name</th>
                  <th className='text-left px-3 py-3'>Offerings</th>
                  <th  className='text-left px-3 py-3'>Location</th>
                  <th  className='text-left px-3 py-3'>Customer Name</th>
                  <th  className='text-left px-3 py-3'>Customer Phone</th>
                  <th  className='text-left px-3 py-3'>Price</th>
                  <th  className='text-left px-3 py-3'>Service Time</th>
                  <th  className='text-left px-3 py-3'>Status</th>
                </tr>
              </thead>
              <tbody >
                {assignedServices && assignedServices.length>0?(
                currentItems?.map((item,index)=>
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
                        <th className='text-left font-semibold px-2 py-2 text-gray-800'>{timeConverter(item?.time)}</th>
                        {item.status =="started"?<th  className='text-center font-semibold px-2 py-2 text-gray-800'>
                          <div className='flex flex-row gap-1'>
                          <button className='px-2 py-1 bg-blue-800 text-white rounded-md cursor-pointer' onClick={()=>{setSessionStatus("completed");setSelectedItem(item)}}>Finish</button>
                          <button className='px-2 py-1 bg-red-600 text-white rounded-md cursor-pointer' onClick={()=>{setSessionStatus("cancelled"); setSelectedItem(item)}}>Cancel</button>
                          </div>

                        </th>: item.status == "completed" || item.status == "cancelled"?<th>                                                <th  className='text-center font-semibold px-2 py-2 text-gray-800'><button className='px-2 py-1 bg-gray-200 text-gray-500 rounded-md cursor-pointer'>Service Finished</button></th></th>  :
                                                <th  className='text-center font-semibold px-2 py-2 text-gray-800'><button className='px-2 py-1 bg-yellow-400 text-gray-800 rounded-md cursor-pointer' onClick={()=>handleToggle(item)}>Confirm</button></th>
                        }

                    </tr>
                )
                ):(<tr>No Assigned Tasks yet.</tr>)}

              </tbody>
            </table>
            <div className='flex flex-row gap-3 my-3 justify-center'>
            <button   onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='px-2 py-1 disabled:bg-gray-200 disabled:text-gray-400 bg-gray-300 text-gray-800 rounded-md cursor-pointer' >Back</button>
            {/* <button           
            className='bg-gray-300 rounded-md px-2 m-1 py-2'>{currentPage}</button>
            
            <button  className='bg-gray-300 rounded-md px-2 m-1 py-2'>{totalPages}</button> */}
            <button             onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages} className='px-2 py-1 disabled:bg-gray-200 disabled:text-gray-300 bg-gray-300 text-gray-800 rounded-md cursor-pointer' >Next Page</button>
            </div>
          </div>
    </div>
  )
}

export default AssignedSessionTable