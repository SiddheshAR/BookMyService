import React from 'react'
import heroImg from '../../assets/hero_img.png'
function HeroSection() {
  return (
    <div className=' bg-orange-100'>
        <div className='max-w-7xl mt-4 pt-8 mx-auto flex flex-col md:flex-row px-5 md:px-8 '>
          <div className='w-[90%] md:w-[50%] flex flex-col gap-6 justify-center'>
              <div>
                  <h1 className='text-4xl md:text-4xl lg:text-5xl font-bold text-gray-800 md:leading-[55px] justify-center'> <span className='text-[#075985] font-bold'>Professional </span>Services for your home.</h1>
              </div>
              <div>
                  <p className='text-gray-500'>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It was</p>
              </div>
              <div>
                  <div className='bg-yellow-400 py-2 px-6 inline-block rounded-md text-[#0d2836] font-semibold'>Book a service.</div>  
              </div>
              {/* <div className='flex flex-row gap-6 justify-center'>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-[29px] text-[#0d2836] font-bold'>2760+</p>
                         <p className='text-[13px] text-gray-700'>Total Customer</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-[29px] text-[#0d2836] font-bold'>25+</p>
                         <p className='text-[13px] text-gray-700'>Years Experience</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-[29px] text-[#0d2836] font-bold'>328+</p>
                         <p className='text-[13px] text-gray-700'>Team Members</p>
                    </div>
              </div>     */}
          </div>
        
          <div className='w-[90%] md:w-[50%] relative pt-4  flex flex-row pl-5 items-center justify-center'>
              <img className='z-[30] h-[320px] md:h-[420px]' src={heroImg}/>
              <div className=' absolute  w-[260px] h-[260px] md:w-[320px] md:h-[320px] z-[20] rounded-full bg-orange-300 '>
              </div>
              <div className=' absolute  w-[300px] h-[300px] md:w-[400px] md:h-[400px] z-[10] rounded-full bg-orange-200 '>
              </div>
          </div>  
        </div>
    </div>
  )
}

export default HeroSection