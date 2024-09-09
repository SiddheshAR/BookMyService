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
import { USER_API_ENDPOINT } from '../../utils/constants';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
function Navbar() {
   
    const dispatch = useDispatch();
    const user:UserType | null=useSelector((store:RootState)=>store.auth.user);
    const notify = (text:string) => toast.error(text);
    const [toggleMenu,setToggleMenu] = React.useState(false);
    const NavLinks = [
        {
            name:"Home",
            link:"/"
        },
        {
            name:"Services",
            link:"/",
            subNavbar:[
                            {
                                name:"XYZ",
                                link:"/"
                            },
                            {
                                name:"ABC",
                                link:"/"
                            },
                            {
                                name:"PQR",
                                link:"/"
                            },
                        ]
        },
        {
            name:"Track Services",
            link:"/",
        },
        {
            name:"Contact",
            link:"/",
        }]
//   let user = useSelector((store)=>store.auth.user);
//   let toggleMenu = useSelector((store)=>store.toggle.menu);
  // console.log(toggleMenu);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
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
  const handleLogout = async()=>{
    try{
        const res = await axios.get(`${USER_API_ENDPOINT}/logout`,{withCredentials: true});
        
        if(res){
            console.log("Logged out Succesfully");
            dispatch(setUser(null));
            notify("Logged out successfully.")
        }else{
            console.log("Something went wrong 1.")
        }
    }catch(error){
        console.log(error)
        console.log("Something went wrong.2")
    }
  }

  return (
    <div className='max-w-7xl  mx-auto mt-3 md:mb-3 h-14 md:h-16 relative  '>
      <div className='flex flex-row justify-between items-center px-4 md:px-8'>
                        {/* Logo Container */}
            <div className='w-28 md:w-32  h-12 md:h-16 overflow-hidden'>
                <Link to={"/"}>
                <img className='w-full h-full object-contain object-center' src={logo}/>
                </Link>
            </div>
            {/* Desktop Nav Links */}

            <div className='flex flex-row gap-4 items-center'>
                
                <div className='hidden md:flex  flex-row gap-4'>
                    {NavLinks.map((e,index)=>(<Link to={e.link} key={index}>
                    <div 
                    onMouseEnter={()=>{if(e?.subNavbar)
                        {
                            const dropdown = document.getElementById(`dropdown-${index}`);
                            if (dropdown) {
                            dropdown.style.display = 'block';
                            }
                        }
                    }}  
                    onMouseLeave={()=>{if(e?.subNavbar)
                        {
                            const dropdown = document.getElementById(`dropdown-${index}`);
                            if (dropdown) {
                            dropdown.style.display = 'none';
                            }
                        }
                    }} 
                        className=''>
                        <h2>{e.name}</h2>
                        <div className='absolute  '>
                            {e?.subNavbar ? 
                            <div id={`dropdown-${index}`}>
                                {e?.subNavbar.map((f,index) => (<h2 key={index}>{f.name}</h2>))}
                            </div>:null}
                        </div>
                    </div>
                    </Link>))}
                </div>
                {user? <button onClick={handleLogout} className='bg-yellow-300 hover:bg-yellow-400 rounded-md font-semibold py-1 px-2 md:py-2 md:px-5 text-[#123446]'  >Logout</button>:
                <div className='flex flex-row gap-2 items-center'>
                    <Link to="/login"><button className='bg-yellow-300 hover:bg-yellow-400 rounded-md font-semibold py-1 px-2 md:py-2 md:px-5 text-[#123446]'>Login</button></Link>
                    <Link to="/register"><button  className='py-1 px-2 md:py-2 md:px-5 text-gray-900 border rounded-md border-gray-200 hover:bg-gray-100 hover:text-sky-900'>SignUp</button></Link>
                    <div className='md:hidden' onClick={handleMenuToggle}><Menu/></div>
                </div>}
            </div>
            {/* Menu Toggle for Mobile*/}

      </div>
      {/* Mobile Sidebar NavLinks */}
      <div className={`absolute z-50 min-h-[1200px] bg-orange-50  transition-all duration-300 ${toggleMenu?`left-0`:`left-[-100%]`} w-[200px] `}>
            <div className='flex flex-col gap-2 mt-8 px-4 '>
                {NavLinks.map((e,index)=>(<Link to={"/"} key={index}>
                <div
                    className=''>
                    {!e?.subNavbar?
                        <div className='flex flex-row items-center gap-1 text-gray-700 font-semibold'><h2 className='text-[17px]'>{e.name}</h2></div>:
                        <div onClick={()=>handleSubToggle(`dropdownMob-${index}`)} className='flex flex-row items-center gap-1 text-gray-700 font-semibold'><h2 className='text-[17px]'>{e.name}</h2>  {e?.subNavbar?<span><ChevronDown className='mt-0.5 w-4 h-4'/></span>:null} </div>
                    }
                        {e?.subNavbar ? 
                        <div id={`dropdownMob-${index}`}>
                            {e?.subNavbar.map((f,index) => (<h2 className='text text-gray-500 font-semibold' key={index}>{f.name}</h2>))}
                        </div>:null}
                    
                </div>
                </Link>))}
            </div>
      </div>
    </div>
  )
}

export default Navbar