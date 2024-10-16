import { PlugZap } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { GiVacuumCleaner } from "react-icons/gi";
import { GiHairStrands } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import { TbMassage } from "react-icons/tb";
import { FaBugSlash } from "react-icons/fa6";
function ServicesSection() {

    const data = [
        {
            name:"House Cleaning Service",
            desc:"Reliable and thorough cleaning for a sparkling home, tailored to your specific needs and preferences.",
            icon:<GiVacuumCleaner className='w-9 h-9'/>,
            color:"bg-purple-400",
            link:"/service/66db5784160a2e9fc7336ff8"
        },
        {
            name:"Salon Service",
            desc:"Expert hair and beauty treatments for a fresh new look, feel, and enhanced confidence always.",
            icon:<GiHairStrands className='w-9 h-9'/>,
            color:"bg-green-400",
            link:"/service/66db56d9160a2e9fc7336fdd"
        },
        {
            name:"AC Repair & Servicing",
            desc:"Fast and efficient air conditioner maintenance, repair, installation, and servicing for optimal performance.",
            icon:<TbAirConditioning className='w-9 h-9'/>,
            color:"bg-yellow-400",
            link:"/service/66db5725160a2e9fc7336fe3"
        },
        {
            name:"Massage Services",
            desc:"Soothing and rejuvenating massages for body and mind relaxation, wellness, and stress relief therapy.",
            icon:<TbMassage className='w-9 h-9'/>,
            color:"bg-blue-400",
            link:"/service/66db573c160a2e9fc7336fea"
        },
        {
            name:"Pest Control Services",
            desc:" Effective and safe elimination of unwanted pests, rodents, termites, and other unwanted creepy crawlies.",
            icon:<FaBugSlash className='w-9 h-9'/>,
            color:"bg-orange-400",
            link:"/service/66db5769160a2e9fc7336ff1"
        },
        {
            name:"Electrician Services",
            desc:"Professional and prompt electrical installations, repairs, maintenance, and upgrades for homes",
            icon:<PlugZap className='w-9 h-9'/>,
            color:"bg-red-400",
            link:"/service/66db57ad160a2e9fc7336fff"
        }
    ]
  return (
    <div className='bg-white'>
        <div className='max-w-5xl  mt-12 md:mt-12 pt-6 mx-auto flex flex-col  justify-center gap-4 px-5 md:px-8'>
            <div className='flex flex-col gap-2 items-center'>
                <h4 className=' bg-orange-100 w-fit py-1 px-3 text-orange-600 rounded-xl text-center'>Services</h4>
                <h2 className='text-2xl md:text-3xl font-semibold text-gray-800'>We offer wide range of service.</h2>
            </div>
                <div className='flex flex-row flex-wrap gap-6 justify-center mt-4'>
                    {data?.map((e,index)=>(<Link to={e.link}><div className='shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.20)] rounded-md max-w-[300px] p-7 md:p-8 flex flex-col items-center text-center gap-3' key={index}>
                        
                        <div className='relative '>
                            <div className={`rounded-full w-[60px] h-[60px] ${e.color}`}>
                            </div>
                            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                                <div className='text-white'>{e.icon}</div>
                            </div>
                        </div>
                        
                        <div className='font-bold text-gray-800 text-xl '>{e.name}</div>
                        <div className='text-gray-600 text-[14px]'>{e.desc}</div>
                        
                    </div></Link>))}
                </div>
        </div>
    </div>
  )
}

export default ServicesSection