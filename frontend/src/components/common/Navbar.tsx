import React,{useRef} from 'react'
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import {ChevronDown, Menu } from 'lucide-react';
// import { menuToggle } from '@/redux/slices/toggleSlice';
// import axios from 'axios';
// import { USER_API_END_POINT } from '@/utils/constant';
// import { setUser } from '@/redux/slices/authSlice';
import logo from "../../assets/logo_trim.png"
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../../redux/store';
import { UserType} from '../../../types/users'
import { setUser } from '../../redux/slices/userSlice';
import axios from 'axios';
import { MANAGER_API_ENDPOINT, SERVICEPROVIDER_API_ENDPOINT, USER_API_ENDPOINT } from '../../utils/constants';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
   
    const dispatch = useDispatch();
    const user:UserType =useSelector((store:RootState)=>store.auth.user);
    console.log("Navbar:",user);
    const [toggleMenu,setToggleMenu] = React.useState(false);
    const UserNavLinks = [
        {
            name:"Home",
            link:"/"
        },
        {
            name:"Services",
            link:"/",
            subNavbar:[
                            {
                                name:"House Cleaning Service",
                                link:"/service/66db5784160a2e9fc7336ff8"
                            },
                            {
                                name:"Pest Control Services",
                                link:"/service/66db5769160a2e9fc7336ff1"
                            },
                            {
                                name:"Electrician Services",
                                link:"/service/66db57ad160a2e9fc7336fff"
                            },
                            {
                                name:"Salon Services",
                                link:"/service/66db56d9160a2e9fc7336fdd"
                            },
                            {
                                name:"Massage Services",
                                link:"/service/66db573c160a2e9fc7336fea"
                            },
                            {
                                name:"AC Repairing",
                                link:"/service/66db5725160a2e9fc7336fe3"
                            },
                        ]
        },
        {
            name:"Track Services",
            link:"/user/booked_services",
        },
        {
            name:"Contact",
            link:"/",
        }]
    const ServiceProviderNavLinks = [
            {
                name:"Service Requests",
                link:"/serviceProvider/sessions"
            },
            // {
            //     name:"Service Requests",
            //     link:"/ServiceRequest"
            // },
        ]
        const ManagerNavLinks = [
            {
                name:"Home",
                link:"/"
            },
            {
                name:"Sessions",
                link:"/manage/sessions"
            },
            {
                name:"Providers",
                link:"/"
            }
        ]
        const GuestNavLinks = [
            {
                name:"Home",
                link:"/"
            },
            {
                name:"Services",
                link:"/",
                subNavbar:[
                                {
                                    name:"House Cleaning Service",
                                    link:"/service/66db5784160a2e9fc7336ff8"
                                },
                                {
                                    name:"Pest Control Services",
                                    link:"/service/66db5769160a2e9fc7336ff1"
                                },
                                {
                                    name:"Electrician Services",
                                    link:"/service/66db57ad160a2e9fc7336fff"
                                },
                                {
                                    name:"Salon Services",
                                    link:"/service/66db56d9160a2e9fc7336fdd"
                                },
                                {
                                    name:"Massage Services",
                                    link:"/service/66db573c160a2e9fc7336fea"
                                },
                                {
                                    name:"AC Repairing",
                                    link:"/service/66db5725160a2e9fc7336fe3"
                                },
                            ]
            },
            {
                name:"Contact",
                link:"/",
            }]

  const handleMenuToggle = ()=>{
    // dispatch(menuToggle());
    setToggleMenu(!toggleMenu);
  }
  const handleSubToggle = (e:string)=>{
    // console.log(e);
    const div= document.getElementById(e);
    if (div) {
        if (div.offsetHeight > 0) {
            div.style.display = 'none';
        } else {
          div.style.display = 'block';
        }
      }
  }
  const handleLogout = async(role:string)=>{
    try{
        if(role=="manager"){
            const res = await axios.get(`${MANAGER_API_ENDPOINT}/logout`,{withCredentials: true});
            if(res){
                console.log("Logged out Succesfully");
                dispatch(setUser({
                    address:"",
                    email:"",
                    fullname:"",
                    phoneNumber:0,
                    role:"",
                    _id:""
                }));
                toast.success("Logged out successfully.")
            }else{
                console.log("Something went wrong 1.")
            }
            }else if(role=="serviceProvider"){
                const res = await axios.get(`${SERVICEPROVIDER_API_ENDPOINT}/logout`,{withCredentials: true});
                if(res){
                    console.log("Logged out Succesfully");
                    dispatch(setUser({
                        address:"",
                        email:"",
                        fullname:"",
                        phoneNumber:0,
                        role:"",
                        _id:""
                    }));
                    toast.success("Logged out successfully.")
                }else{
                    console.log("Something went wrong 1.")
                }
            }else{
                const res = await axios.get(`${USER_API_ENDPOINT}/logout`,{withCredentials: true});
                if(res){
                    console.log("Logged out Succesfully");
                    dispatch(setUser({
                        address:"",
                        email:"",
                        fullname:"",
                        phoneNumber:0,
                        role:"",
                        _id:""
                    }));
                    toast.success("Logged out successfully.")
                }else{
                    console.log("Something went wrong 1.")
                }
            }
    }catch(error){
        console.log(error)
        console.log("Something went wrong.2")
    }
  }

  const ManageUserProfile = ()=>{
    return(<div className='relative group border'>
        <div className=''><FaUserCircle className='w-8 h-auto text-blue-950 cursor-pointer'/></div>
        <div className='absolute rounded-md -left-5  border p-3 hidden group-hover:flex flex-col gap-2 w-[150px] bg-white'>
            {user && user.role == "user"  ?<div><Link to="/user/updateProfile">Update Profile</Link></div>:
            user && user.role == "serviceProvider"?<div>
                <div><Link to="/serviceProvider/updateProfile">Update Profile</Link></div>
            </div>:<div>
                
                </div>}
            
            <div  onClick={()=>handleLogout(user.role)}  className='text-red-600 cursor-pointer'>Logout</div>
        </div>
    </div>)
  }

  return (
    <div className='max-w-7xl  mx-auto mt-3 md:mb-3 h-14 md:h-16  relative '>
      <div className='flex flex-row justify-between items-center px-4 md:px-8'>
                        {/* Logo Container */}
            <div className='w-28 md:w-32  h-12 md:h-16 overflow-hidden'>
                <Link to={"/"}>
                <img className='w-full h-full object-contain object-center' src={logo}/>
                </Link>
            </div>
            {/* Desktop Nav Links */}

            <div className='flex flex-row gap-4 items-center'>
                {user &&  user.role == "user"?UserNavLinks.map((item,index)=>
                <div className='group relative hidden md:block' key={index}>
                    <Link to={item.link}>{item.name}
                    </Link>
                    {item.subNavbar && <div className='absolute rounded-md -left-4 z-40 flex-col gap-3  hidden w-[150px] group-hover:flex bg-white px-3 py-2'>
                       {item.subNavbar.map((subItems,index)=><div className='border-b last:border-none' key={index}>
                        <a href={subItems.link} target="_blank" rel="noopener noreferrer">
                            <p className='hover:text-orange-500 text-[15px]'>{subItems.name}</p>   
                        </a>
                       </div>)}
                    </div> }

                </div>):user && user.role =="serviceProvider" ?ServiceProviderNavLinks.map((item,index)=>
                <div className='group relative  hidden md:block' key={index}>
                    <Link to={item.link}>{item.name}
                    </Link>
                    {item?.subNavbar && <div className='absolute -left-4 z-40 flex-col gap-3  hidden w-[150px] group-hover:flex bg-white px-3 py-2'>
                       {item?.subNavbar.map((subItems,index)=><div key={index}>
                        <a href={subItems.link} target="_blank" rel="noopener noreferrer">
                            <p className='hover:text-orange-500 text-[15px]'>{subItems.name}</p>   
                        </a>
                       </div>)}
                    </div> }

                </div>) : user && user.role =="manager" ? ManagerNavLinks.map((item,index)=>
                <div className='group relative  hidden md:block' key={index}>
                    <Link to={item.link}>{item.name}
                    </Link>
                    {item?.subNavbar && <div className='absolute -left-4 z-40 flex-col gap-3  hidden w-[150px] group-hover:flex bg-white px-3 py-2'>
                       {item?.subNavbar.map((subItems,index)=><div key={index}>
                        <a href={subItems.link} target="_blank" rel="noopener noreferrer">
                            <p className='hover:text-orange-500 text-[15px]'>{subItems.name}</p>   
                        </a>
                       </div>)}
                    </div> }
                    {/* GuestNavLinks */}
                </div>):GuestNavLinks.map((item,index)=> <div className='group relative  hidden md:block' key={index}>
                    <Link to={item.link}>{item.name}
                    </Link>
                    {item?.subNavbar && <div className='absolute -left-4 z-40 flex-col gap-3  hidden w-[150px] group-hover:flex bg-white px-3 py-2'>
                       {item?.subNavbar.map((subItems,index)=><div key={index}>
                        <a href={subItems.link} target="_blank" rel="noopener noreferrer">
                            <p className='hover:text-orange-500 text-[15px]'>{subItems.name}</p>   
                        </a>
                       </div>)}
                    </div> }
                    {/* GuestNavLinks */}
                </div>)}

                { user && user.role !== "" ?
                <div className='flex flex-row gap-1 items-center'>
                <ManageUserProfile/>
                <button onClick={()=>handleLogout(user.role)} className='bg-yellow-300 hover:bg-yellow-400 rounded-md font-semibold py-1 px-2 md:py-2 md:px-5 text-[#123446]'>Logout</button>
                <div className='md:hidden' onClick={handleMenuToggle}><Menu/></div>

                </div>
:
                <div className='flex flex-row gap-2 items-center'>
                    <Link to="/login/user"><button className='bg-yellow-300 hover:bg-yellow-400 rounded-md font-semibold py-1 px-2 md:py-2 md:px-5 text-[#123446]'>Login</button></Link>
                    <Link to="/register/user"><button  className='py-1 px-2 md:py-2 md:px-5 text-gray-900 border rounded-md border-gray-200 hover:bg-gray-100 hover:text-sky-900'>SignUp</button></Link>
                    <div className='md:hidden' onClick={handleMenuToggle}><Menu/></div>
                </div>}
            </div>
            {/* Menu Toggle for Mobile*/}

      </div>
      {/* Mobile Sidebar NavLinks */}
      <div className={`absolute z-50 min-h-screen bg-orange-50  transition-all duration-300 ${toggleMenu?`left-0`:`left-[-100%]`} w-[200px] `}>
            <div className='flex flex-col gap-2 mt-8 px-4 '>
                {user && user.role =="user" ? UserNavLinks.map((e,index)=>(<Link to={"/"} key={index}>
                <div className=''>
                    {!e?.subNavbar?
                        <div className='flex flex-row items-center gap-1 text-gray-700 font-semibold'><h2 onClick={()=>setToggleMenu(false)} className='text-[17px]'>{e.name}</h2></div>:
                        <div onClick={()=>handleSubToggle(`dropdownMob-${index}`)} className='flex flex-row items-center gap-1 text-gray-800 font-semibold'>
                            <h2 className='text-[17px]'>{e.name}</h2>  
                            {e?.subNavbar?<span><ChevronDown className='mt-0.5 w-4 h-4'/></span>:null} 
                            </div>
                    }
                        {e?.subNavbar ? 
                        <div id={`dropdownMob-${index}`}>
                            {e?.subNavbar.map((Subitem,index) => 
                                (<h2 onClick={()=>setToggleMenu(false)} className='text text-gray-700 ' key={index}>
                                    <Link to={Subitem.link}>
                                    {Subitem.name}
                                    </Link>
                                </h2>))}
                        </div>:null}
                    
                </div>
                </Link>)): 
                user.role == "serviceProvider" ? ServiceProviderNavLinks.map((e,index)=>(<Link to={"/"} key={index}>
                <div className=''>
                    {!e?.subNavbar?
                        <div className='flex flex-row items-center gap-1 text-gray-700 font-semibold'><h2 onClick={()=>setToggleMenu(false)} className='text-[17px]'>{e.name}</h2></div>:
                        <div onClick={()=>handleSubToggle(`dropdownMob-${index}`)} className='flex flex-row items-center gap-1 text-gray-800 font-semibold'>
                            <h2 className='text-[17px]'>{e.name}</h2>  
                            {e?.subNavbar?<span><ChevronDown className='mt-0.5 w-4 h-4'/></span>:null} 
                            </div>
                    }
                        {e?.subNavbar ? 
                        <div id={`dropdownMob-${index}`}>
                            {e?.subNavbar.map((Subitem,index) => 
                                (<h2 onClick={()=>setToggleMenu(false)} className='text text-gray-700 ' key={index}>
                                    <Link to={Subitem.link}>
                                    {Subitem.name}
                                    </Link>
                                </h2>))}
                        </div>:null}
                    
                </div>
                </Link>)): user.role == "manager" ?  ManagerNavLinks.map((e,index)=>(<Link to={"/"} key={index}>
                <div className=''>
                    {!e?.subNavbar?
                        <div className='flex flex-row items-center gap-1 text-gray-700 font-semibold'><h2 onClick={()=>setToggleMenu(false)} className='text-[17px]'>{e.name}</h2></div>:
                        <div onClick={()=>handleSubToggle(`dropdownMob-${index}`)} className='flex flex-row items-center gap-1 text-gray-800 font-semibold'>
                            <h2 className='text-[17px]'>{e.name}</h2>  
                            {e?.subNavbar?<span><ChevronDown className='mt-0.5 w-4 h-4'/></span>:null} 
                            </div>
                    }
                        {e?.subNavbar ? 
                        <div id={`dropdownMob-${index}`}>
                            {e?.subNavbar.map((Subitem,index) => 
                                (<h2 onClick={()=>setToggleMenu(false)} className='text text-gray-700 ' key={index}>
                                    <Link to={Subitem.link}>
                                    {Subitem.name}
                                    </Link>
                                </h2>))}
                        </div>:null}
                    
                </div>
                </Link>)): 
                 GuestNavLinks.map((e,index)=>(<Link to={"/"} key={index}>
                    <div className=''>
                        {!e?.subNavbar?
                            <div className='flex flex-row items-center gap-1 text-gray-700 font-semibold'><h2 onClick={()=>setToggleMenu(false)} className='text-[17px]'>{e.name}</h2></div>:
                            <div onClick={()=>handleSubToggle(`dropdownMob-${index}`)} className='flex flex-row items-center gap-1 text-gray-800 font-semibold'>
                                <h2 className='text-[17px]'>{e.name}</h2>  
                                {e?.subNavbar?<span><ChevronDown className='mt-0.5 w-4 h-4'/></span>:null} 
                                </div>
                        }
                            {e?.subNavbar ? 
                            <div id={`dropdownMob-${index}`}>
                                {e?.subNavbar.map((Subitem,index) => 
                                    (<h2 onClick={()=>setToggleMenu(false)} className='text text-gray-700 ' key={index}>
                                        <Link to={Subitem.link}>
                                        {Subitem.name}
                                        </Link>
                                    </h2>))}
                            </div>:null}
                        
                    </div>
                    </Link>))}
             
            </div>
      </div>
    </div>
  )
}

export default Navbar