import React, { useEffect } from 'react'
import HeroSection from '../components/home-page/HeroSection'
import ServicesSection from '../components/home-page/ServicesSection'
import FaqSection from '../components/home-page/FaqSection'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    </div>
  )
}

export default Home