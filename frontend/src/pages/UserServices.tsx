import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSessions } from '../redux/slices/sessionSlice';

function UserServices() {
    const dispatch = useDispatch();
    const user = useSelector(store=>store.auth.user);

    useEffect(()=>{
        if(user && user.role=="user"){
            dispatch(fetchUserSessions(user?._id)); 
        }
    },[user])

  return (
    <div>UserServices</div>
  )
}

export default UserServices