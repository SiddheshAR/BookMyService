import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SESSION_API_ENDPOINT } from '../utils/constants'
import { UserType } from '../../types/users';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import BookedServices from '../components/user/bookedServices';

function UserBookedSessions() {
    const user:UserType =useSelector((store:RootState)=>store.auth.user);
    console.log(user);
    const navigate = useNavigate();
    const [bookedService,setBookedService] = useState();
    console.log("State",bookedService)
    useEffect(()=>{
        if(user.role !='user'){
            navigate('/')
        }
        async function fetchSessionData(){
            const resp = await axios.post(SESSION_API_ENDPOINT+"/getSessions",{
                id:user?._id
            },{withCredentials:true});
            console.log(resp)
            setBookedService(resp.data.data)
        }
        fetchSessionData()
    },[])

  return (
    <div className='max-w-7xl mx-auto px-5 py-10'>
        <div>
            {bookedService && bookedService?.length>0? <BookedServices bookedService={bookedService} setBookedService={setBookedService}/>:<h2>Booked Service List is Emptuy,Please book new Service</h2>}

        </div>
    </div>
  )
}

export default UserBookedSessions