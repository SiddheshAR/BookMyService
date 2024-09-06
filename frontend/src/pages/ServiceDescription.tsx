import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Service} from "../../types/services";

function ServiceDescription() {
  const {id} =useParams();
//   console.log(id);
  const [serviceData,setServiceData]=useState<Service|null>(null);
    useEffect(()=>{
        const fetchServiceDetails = async()=>{
            try{
                const resData = await axios.get(`http://localhost:5001/api/v1/service/getServiceById/${id}`);
                console.log(resData?.data?.data);
                if(resData?.data?.success){
                    setServiceData(resData?.data?.data)
                }
            }catch(error){
                console.log("Error Fetching Data.",error)
            }

        }
        fetchServiceDetails();
    },[])
    if(!serviceData){
        <div>
            <div className='max-w-7xl px-10 border'>
                <h2 className='text-2xl text-gray-800 text-center'>Error Fetching Data.</h2>
            </div>
        </div>
    }
  return (
    <div>
        <div className='max-w-7xl px-10 border'>
            <div>
                {/* Product Details */}
                <div>
                    <h2>{serviceData?.name}</h2>
                    <div></div>
                    <h2></h2>
                    {/* Offerings */}
                    
                    <div>

                    </div>
                    <div>
                        {/* Calendar */}
                        <div>

                        </div>
                        {/* Time */}
                        <div>

                        </div>
                    </div>
                </div>
                {/* Product Images */}
                <div>

                </div>
            </div>
            <div></div>
        </div>
    </div>
  )
}

export default ServiceDescription    