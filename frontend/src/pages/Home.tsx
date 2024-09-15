import React from 'react'
import HeroSection from '../components/home-page/HeroSection'
import ServicesSection from '../components/home-page/ServicesSection'
import FaqSection from '../components/home-page/FaqSection'

function Home() {
  return (
    <div>
        <HeroSection/>
        <ServicesSection/>
        <FaqSection/>
    </div>
  )
}

export default Home