import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAssignedServices } from '../../redux/slices/serviceProviderSessions';
import AssignedSessionTable from '../../components/serviceProvider/assignedSessionTable';

function AssignedSessions() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAssignedServices());
  },[])
  return (
    <div className='max-w-6xl mx-auto px-10'>
        <AssignedSessionTable/>
    </div>
  )
}

export default AssignedSessions
