import React from 'react'

// Images
import Img1 from '../../assets/home-assets/why-choose-us/cleaning-first.jpg'
import Img2 from '../../assets/home-assets/why-choose-us/eco-friendly.jpg'
import Img3 from '../../assets/home-assets/why-choose-us/customer-support.jpg'
import Img4 from '../../assets/home-assets/why-choose-us/electrician.jpg'

// Icons
import Img1Icon from '../../assets/home-assets/why-choose-us/iconsPng/rated.png'
import Img2Icon from '../../assets/home-assets/why-choose-us/iconsPng/eco.png'
import Img3Icon from '../../assets/home-assets/why-choose-us/iconsPng/support.png'
import Img4Icon from '../../assets/home-assets/why-choose-us/iconsPng/verify.png'


function WhyChooseUsSection() {

    const contentData = [
        {
            name:"Satisfaction Guarenteed",
            img:Img1,
            position:'right',
            icons:Img1Icon,
            para:"Lorem Ipsum passages, and more recently with desktop publishing"
        },
        {
            name:"Expereince & Expertise",
            img:Img2,
            position:'left',
            icons:Img2Icon,
            para:"Lorem Ipsum passages, and more recently with desktop publishing"
        },
        {
            name:"Eco Friendly Practices",
            img:Img3,
            position:'right',
            icons:Img3Icon,
            para:"Lorem Ipsum passages, and more recently with desktop publishing"
        },
        {
            name:"Exceptional Service",
            img:Img4,
            position:'left',
            icons:Img4Icon,
            para:"Lorem Ipsum passages, and more recently with desktop publishing"
        }
    ]

  return (
    <div className='max-w-6xl my-14 mx-auto px-3 md:px-2 '>
        <div className=' px-4 relative'>
            <h2 className='text-3xl md:text-4xl text-gray-800 text-center font-semibold my-4'>Why Choose Us</h2>
            <p className='text-center text-[16px] md:text-[18px]'>Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It was,PageMaker including versions of Lorem Ipsum.It was,Aldus PageMaker including versions of Lorem Ipsum.It was</p>
            <img />
        </div>
        <div className='my-8 grid grid-cols-2 gap-4 md:grid-cols-4 '>
            {contentData.map((e,index)=><div key={index} className={`flex flex-col md:p-5 ${e.position=="left"?"flex-col-reverse":""} gap-3`}>
                <div className='flex flex-col gap-2'>
                    <div>
                        <img className='w-12 h-12 md:w-16 md:h-14' src={e.icons}/>
                    </div>
                    <h3 className='font-semibold text-gray-800 text-[16px] md:text-[14px]'>{e.name}</h3>
                    <p className='text-[13px]'>{e.para}</p>
                </div>
                <div className=''>
                    <img className='rounded-2xl' src={e.img}/>
                </div>
            </div>)}
        </div>
    </div>
  )
}

export default WhyChooseUsSection