import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SESSION_API_ENDPOINT } from '../utils/constants'
import { UserType } from '../../types/users';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import BookedServices from '../components/user/bookedServices';
import { toast } from 'react-toastify';
import { ServiceSession } from '../../types/services';

function UserBookedSessions() {
    const user:UserType =useSelector((store:RootState)=>store.auth.user);
    // console.log(user);
    const navigate = useNavigate();
    const [bookedService,setBookedService] = useState<ServiceSession[]>([]);
    console.log("State",bookedService)
    useEffect(()=>{
        async function fetchSessionData(){
            try{
                const resp = await axios.post(SESSION_API_ENDPOINT+"/getSessions",{
                    id:user?._id
                },{withCredentials:true});
                setBookedService(resp.data.data)
            }catch(error){
                toast.error("Something went wrong.")
                console.log("Error",error);
            }

        }
        fetchSessionData()
    },[])
    useEffect(()=>{
        if(user.role !='user'){
            navigate('/')
        }
    },[user, navigate])

  return (
    <div className='max-w-7xl mx-auto px-5 py-10'>
        <div>
            {bookedService && bookedService?.length>0? <BookedServices bookedService={bookedService} setBookedService={setBookedService}/>:<h2>Booked Service List is Emptuy,Please book new Service</h2>}

        </div>
    </div>
  )
}

export default UserBookedSessions