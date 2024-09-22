import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import SessionsListSection from '../components/manager/sessionsListSection';
import { UserType } from '../../types/users';
import { RootState } from '../redux/store';
import { fetchAllSessions, fetchUserSessions } from '../redux/slices/sessionSlice';
import { fetchAllServiceProviders } from '../redux/slices/sessionProviderSlice';

function SessionsList() {
    const navigate = useNavigate();
    const user:UserType =useSelector((store:RootState)=>store.auth.user);
    const AllSessions = useSelector((store:RootState)=>store.session.allSessions);
    const LoadingAllSession = useSelector((store:RootState)=>store.session.loadingAllSessions);
    const ErrorAllSession = useSelector((store:RootState)=>store.session.errorAllSessions);
    // const ServiceProviderList = useSelector((store:RootState)=>store.serviceProvider.allServiceProviders);
    // const LoadServiceProviderList = useSelector((store:RootState)=>store.serviceProvider.loadingServiceProviders);
    // const ErrorServiceProviderList = useSelector((store:RootState)=>store.serviceProvider.errorServiceProviders);
    // console.log(sessions);
    // console.log(sessions);
    const dispatch = useDispatch();
   useEffect(()=>{
    if(user && user.role!== "manager"){
        navigate('/login/manager');
       }
    if(user && user.role =="manager"){
        dispatch(fetchAllSessions()); 
        dispatch(fetchAllServiceProviders());
        // dispatch(fetchUserSessions(user?._id)); 
    }
   },[]);

  return (
    <div className='max-w-6xl mx-auto px-6 my-4 md:my-10'>
      <SessionsListSection AllSessions={AllSessions} LoadingAllSession={LoadingAllSession} ErrorAllSession={ErrorAllSession} 
      />
    </div>
  )
}

export default SessionsList