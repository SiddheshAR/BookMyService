import { PlugZap } from 'lucide-react'
import React from 'react'

function ServicesSection() {
    const data = [
        {
            name:"Service 1",
            desc:"Lorem ipsum sdfs dsff sdfsjdf sdfs ij dfisd fjs sdis f is fsdfs sdfd sdfdfsd sdf fs",
            icon:<PlugZap className='w-9 h-9'/>,
            color:"bg-green-400",
            link:""
        },
        {
            name:"Service 1",
            desc:"Lorem ipsum sdfs dsff sdfsjdf sdfs ij dfisd fjs sdis f is fsdfs sdfd sdfdfsd sdf fs",
            icon:<PlugZap className='w-9 h-9'/>,
            color:"bg-yellow-400",
            link:""
        },
        {
            name:"Service 1",
            desc:"Lorem ipsum sdfs dsff sdfsjdf sdfs ij dfisd fjs sdis f is fsdfs sdfd sdfdfsd sdf fs",
            icon:<PlugZap className='w-9 h-9'/>,
            color:"bg-blue-400",
            link:""
        },
        {
            name:"Service 1",
            desc:"Lorem ipsum sdfs dsff sdfsjdf sdfs ij dfisd fjs sdis f is fsdfs sdfd sdfdfsd sdf fs",
            icon:<PlugZap className='w-9 h-9'/>,
            color:"bg-orange-400",
            link:""
        },
        {
            name:"Service 1",
            desc:"Lorem ipsum sdfs dsff sdfsjdf sdfs ij dfisd fjs sdis f is fsdfs sdfd sdfdfsd sdf fs",
            icon:<PlugZap className='w-9 h-9'/>,
            color:"bg-purple-400",
            link:""
        },
        {
            name:"Service 1",
            desc:"Lorem ipsum sdfs dsff sdfsjdf sdfs ij dfisd fjs sdis f is fsdfs sdfd sdfdfsd sdf fs",
            icon:<PlugZap className='w-9 h-9'/>,
            color:"bg-red-400",
            link:""
        }
    ]
  return (
    <div className='bg-white'>
        <div className='max-w-5xl mt-4 pt-6 mx-auto flex flex-col  justify-center gap-4 px-5 md:px-8'>
            <div className='flex flex-col gap-2 items-center'>
                <h4 className=' bg-orange-100 w-fit py-1 px-3 text-orange-600 rounded-xl text-center'>Services</h4>
                <h2 className='text-2xl md:text-3xl font-semibold text-gray-800'>We offer wide range of service.</h2>
            </div>
                <div className='flex flex-row flex-wrap gap-6 justify-center mt-4'>
                    {data?.map((e,index)=>(<div className='shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-md max-w-[300px] p-7 md:p-10 flex flex-col items-center text-center gap-3' key={index}>
                        <div className='relative '>
                            <div className={`rounded-full w-[60px] h-[60px] ${e.color}`}>
                            </div>
                            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                                <div className='text-white'>{e.icon}</div>
                            </div>
                        </div>
                        <div className='font-bold text-gray-900 text-xl'>{e.name}</div>
                        <div className='text-gray-700 text-[14px]'>{e.desc}</div>
                    </div>))}
                </div>
        </div>
    </div>
  )
}

export default ServicesSection