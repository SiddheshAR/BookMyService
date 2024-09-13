import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import SessionsListSection from '../components/manager/sessionsListSection';
import { UserType } from '../../types/users';
import { RootState } from '../redux/store';
import { fetchAllSessions, fetchUserSessions } from '../redux/slices/sessionSlice';

function SessionsList() {
    const navigate = useNavigate();
    const user:UserType =useSelector((store:RootState)=>store.auth.user);
    const sessions = useSelector((store:RootState)=>store.session.allSessions);
    console.log(sessions);
    const dispatch = useDispatch();
   useEffect(()=>{
    if(user && user.role!== "manager"){
        navigate('/login/manager');
       }
    if(user && user.role =="manager"){
        dispatch(fetchAllSessions()); 
        dispatch(fetchUserSessions(user?._id)); 
    }
   },[user]);

  return (
    <div><SessionsListSection/></div>
  )
}

export default SessionsList