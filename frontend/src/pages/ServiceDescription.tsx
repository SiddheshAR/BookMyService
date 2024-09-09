import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {Service} from "../../types/services";
import { GoStarFill } from "react-icons/go";
import { GoStar } from "react-icons/go";
import { ArrowLeft, MoveLeft } from 'lucide-react';
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

    const RatingComponent = ({rating}:{rating:number}):JSX.Element=>{
        if(!rating){
            return(
            <div>
                <h2>Error Loading.</h2>
            </div>)
        }
        const ratingIndex =[1,2,3,4,5]
        return(
            <div className='flex flex-row  text-[19px]  items-center'>
                {ratingIndex.map((e,index)=>(<div key={index} >{e<=rating?<GoStarFill className='text-yellow-400' />:<GoStar className='text-yellow-400' />}</div>))}<span className='ml-1 text-[15px] text-gray-800'> ({rating})- Based on average rating.</span>
            </div>
        )
    }

  return (
    <div>
        <div className='max-w-6xl mx-auto my-10 px-5 md:px-10 '>
            <div className='my-4'>
            <Link to="/"><button  className='bg-[#0d2836] py-2 px-3  rounded-md text-white font-semibold flex flex-row items-center gap-1'><ArrowLeft className='w-4 h-4' /> Back</button> </Link>

            </div>
            <div className='flex flex-col md:flex-row gap-10'>
                {/* Product Details */}
                <div className='flex flex-col gap-2'>
                    <h2 className='text-3xl md:text-4xl font-semibold text-[#15465f] '>{serviceData?.name}</h2>
                    <div>
                    <RatingComponent rating={4}/>
                    </div>
                    
                    <h2 className='text-[24px] md:text-[26px] font-bold text-[#2e2e2e] '>₹ {serviceData?.price} Rs</h2>
                    {/* Offerings */}
                    <p className='text-gray-600 text-[14px]'>{serviceData?.description}</p>
                    <div className='rounded-md border py-4 px-4 md:px-6 my-2'>
                        <h2 className='font-bold text-[18px] text-gray-800'>Service Addons:</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
                        {serviceData?.offerings.map((e,index)=>(
                            <div className='flex flex-row cursor-pointer rounded-md p-2 border justify-between' key={index}>
                                <div>{e.name}</div>
                                <div>{e.price}</div>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className='flex flex-row gap-4 justify-center'>
                    <button className='bg-[#0d2836] py-2 px-6 inline-block rounded-md text-white font-semibold'>Cancel</button> 
                    <button className='bg-yellow-400 py-2 px-6 inline-block rounded-md text-[#0d2836] font-semibold'>Book service.</button>  
                </div>
                    <div>
                        {/* Calendar */}

                        {/* Time */}
                        <div>

                        </div>
                    </div>
                </div>
                {/* Product Images */}
                <div className='flex flex-row justify-center'>
                    <div className='w-[80%] md:min-w-[280px] md:max-w-[320px] lg:min-w-[340px] lg:max-w-[400px] md:w-auto my-5'>
                        <img className='object-contain' src={serviceData?.img} />
                    </div>   
                </div>
            </div>
            <div>
                

            </div>
        </div>
    </div>
  )
}

export default ServiceDescription    