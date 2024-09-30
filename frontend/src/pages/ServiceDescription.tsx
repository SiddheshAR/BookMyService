import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {Service} from "../../types/services";
import { GoStarFill } from "react-icons/go";
import { GoStar } from "react-icons/go";
import { ArrowLeft, MoveLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import {RootState} from '../redux/store';
import { UserType} from '../../types/users'
import { SESSION_API_ENDPOINT } from '../utils/constants';
import { toast } from 'react-toastify';
import ServiceBookingModal from '../components/user/serviceBookingModal';

function ServiceDescription() {
    const {id} =useParams();
    const user:UserType |null = useSelector((state:RootState)=>state.auth.user);
    console.log("user:",user)
    const [serviceData,setServiceData]=useState<Service|null>(null);
    const [basePrice,setBasePrice]=useState<number>();
    const [totalPrice,setTotalPrice] = useState<number>();
    const [offeringsList,setOfferingsList]=useState([]);
    const [bookingToggle,setBookingToggle] = useState(false);
    const [serviceTime,setServiceTime] = useState('');
    const [serviceDate,setServiceDate] = useState('');
    const [dateIndex,setDateIndex] = useState(null);
    const TimeConstant = ["14:00","15:30","17:00","18:00","19:00","20:00"];
    const location = useLocation();
    const navigate = useNavigate();
    // console.log("offeringsList",offeringsList)

    const getData = () =>{
        let dates = [];
        for(let i =0;i<8;i++){
            const date = new Date();
            date.setDate(date.getDate() + i);
            const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
            dates.push(utcDate.toISOString());
            // dates.push(date);
        }
        return dates
    }

    const DatesComponent = ({dates})=>{
        // console.log(dates);
        const DatesPart= ({dateItem,activeIndex})=>{
            // console.log(dateItem);

            const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const date = new Date(dateItem);
            const weekDay = weekdayNames[date.getDay()];
            const month = monthNames[date.getMonth()];
            const day = date.getDate();
            // console.log(weekDay);
            return(
                <div onClick={()=>setServiceDate(dateItem)} className='flex first:rounded-l-md flex-col items-center  cursor-pointer'>
                    <div className='bg-gray-100 px-2 text-center py-1 w-full text-[13px] md:text-[17px]'>
                        {weekDay}
                    </div>
                    <div className={`px-2  flex flex-col items-center ${activeIndex !== dateIndex?"text-blue-900 text-[12px] md:text-[15px] bg-white":"  text-white bg-blue-600" } py-2 `}>
                        <p>{day}</p>
                        <p>{month}</p>
                    </div>
                </div>
            )

        }
        
        return(<div className='max-w-[310px] md:min-w-[500px] md:max-w-[550px] rounded-md'>
            <div className='grid grid-cols-8  '>
            {dates.map((e,index)=><div className='rounded-md' onClick={()=>setDateIndex(index)} key={index}><DatesPart dateItem={e} activeIndex={index}/></div>)}
            </div>
        </div>)
    }

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[location])

    // Handle Price Increment
    useEffect(()=>{
        console.log(offeringsList);
        if ( basePrice == null || basePrice === undefined) {
            return;
        }
        else{
            if(basePrice){
                // const totalSum = offeringsList.reduce((accumulator,currentValue)=>
                //     accumulator+Number(currentValue[0]),0)+totalPrice;  
                const totalSum = offeringsList.reduce((accumulator, currentValue) => {
                    const price = Number(Object.values(currentValue)[0]);
                    return accumulator + price;
                }, basePrice);
                // console.log(totalPrice);
                console.log("Trigger")
                setTotalPrice(totalSum);
            }
        }

    },[offeringsList,basePrice])

    useEffect(()=>{
        const fetchServiceDetails = async()=>{
            try{
                const resData = await axios.get(`http://localhost:5001/api/v1/service/getServiceById/${id}`);
                console.log(resData?.data?.data);
                if(resData?.data?.success){
                    setServiceData(resData?.data?.data);
                    setTotalPrice(resData?.data?.data?.price)
                    setBasePrice(resData?.data?.data?.price)
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

    // Component for generating Ratings
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

    const handleOfferings = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(offeringsList.some((offering:{ [key: string]: number })=>offering[e.target.name])){
            setOfferingsList(offeringsList.filter((offering:{ [key: string]: string })=> !offering[e.target.name]   ))
        }else{
            setOfferingsList([...offeringsList,{[e.target.name]:e.target.value}])
        }
    }

    const handleSessionBooking = async(e)=>{
        // let {service,time,location,rating,status,duration,price,feedback,confirmationCode} = req.body;

        e.preventDefault();
        const payload: {
            service: string | undefined;
            time: string;
            location: string;
            duration: string | undefined;
            basePrice: number | undefined;
            offerings?:Record<string, string>[];
            totalPrice: number | undefined;
        } = {
            service:serviceData?.name,
            time:new Date().toISOString(),
            location:user?.address || "",
            duration:serviceData?.duration,
            basePrice:serviceData?.price,
            offerings:offeringsList,
            totalPrice:totalPrice ,
        }
        try{
            // console.log(payload);
            const resp = await axios.post(`${SESSION_API_ENDPOINT}/createSession`,payload,{
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if(!resp){
                console.log("Error")
            }else{
                toast.success("Service Booked!!");
            }
            setBookingToggle(false)
        }catch(error){
            console.log(error)
            setBookingToggle(false)
            toast.error("Something went wrong!")
        }
    }
    console.log(serviceTime)
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
                    
                    {/* <h2 className='text-[24px] md:text-[26px] font-bold text-[#2e2e2e] '>₹ {serviceData?.price} Rs</h2> */}
                    <h2 className='text-[24px] md:text-[26px] font-bold text-[#2e2e2e] '>₹ {totalPrice?totalPrice:"NA"} Rs</h2>

                    {/* Offerings */}
                    <p className='text-gray-600 text-[14px]'>{serviceData?.description}</p>
                    <div className='rounded-md border py-4 px-4 md:px-6 my-2'>
                        <h2 className='font-bold text-[18px] text-gray-800'>Service Addons:</h2>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 my-4'>
                        {serviceData?.offerings.map((e,index)=>(
                            <label>

                         <div className='flex flex-row cursor-pointer rounded-md p-2 border justify-between' key={index}>
                            <div className='flex flex-row gap-2'>
                                    <input
                                    type="checkbox"
                                    id="checkboxId"
                                    name={`${e.name}`}
                                    value={e.price}
                                    onChange={handleOfferings}
                                    />
                                    <div>{e.name}</div>
                               </div>
                                <div>{e.price} Rs</div>
                             </div>
                          </label>
                            // <div className='flex flex-row cursor-pointer rounded-md p-2 border justify-between' key={index}>
                            //     <div>{e.name}</div>
                            //     <div>{e.price}</div>
                            // </div>
                        ))}
                        </div>
                    </div>
                    <div className='flex flex-row gap-4 justify-center'>
                    <button onClick={()=>navigate("/")} className='bg-[#0d2836] py-2 px-6 inline-block rounded-md text-white font-semibold'>Cancel</button> 
                    <button onClick={()=>setBookingToggle(true)} className='bg-yellow-400 py-2 px-6 inline-block rounded-md text-[#0d2836] font-semibold'>Book service.</button>  
                </div>
                    <div className='my-8 flex flex-col gap-4 items-center'>
                        {/* Calendar */}
                        <h2 className='font-bold text-[18px] md:text-2xl text-gray-800'>Select a Date:</h2>

                        <DatesComponent dates={getData()}/>
                        {/* Time */}
                        <h2 className='font-bold text-[18px]  md:text-2xl text-gray-800'>Select a Time slot</h2>
                        <div className='flex flex-row items-center  gap-4'>
                            <h2>Pick a Custom Time:</h2>
                            <input className='border p-1 rounded-md' value={serviceTime} onChange={(e)=>setServiceTime(e.target.value)} type="time" />

                        </div>
                        <div className='flex flex-row flex-wrap gap-3'>
                                {TimeConstant.map((timeItems,index)=>
                                    <div onClick={()=>setServiceTime(timeItems)} key={index} className={`px-4 border cursor-pointer ${serviceTime==timeItems?"bg-blue-700 text-white":"bg-white text-blue-700"} py-2 rounded-md`}>{timeItems} </div>
                                    // serviceDate,setServiceDate
                                )}
                            </div>
                        <div>
                        {/* const [serviceTime,setServiceTime] = useState(''); */}

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
        <ServiceBookingModal offeringsList={offeringsList} user={user} totalPrice={totalPrice} serviceData={serviceData} bookingToggle={bookingToggle} setBookingToggle={setBookingToggle} handleSessionBooking={handleSessionBooking}/>
    </div>
  )
}

export default ServiceDescription    