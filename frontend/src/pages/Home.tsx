import React, { useEffect } from 'react'
import HeroSection from '../components/home-page/HeroSection'
import ServicesSection from '../components/home-page/ServicesSection'
import FaqSection from '../components/home-page/FaqSection'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WhyChooseUsSection from '../components/home-page/whyChooseUs';

function Home() {
  const user = useSelector((state)=>state.auth.user);
  console.log("Homesection",user);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user && user?.role =="manager"){
      navigate('/manage/sessions')
    }
    if(user && user?.role == "serviceProvider"){
      navigate('/serviceProvider/sessions')
    }
  })
  return (
    <div>
        <HeroSection/>
        <ServicesSection/>
        <FaqSection/>
        <WhyChooseUsSection/>
    </div>
  )
}

export default Home