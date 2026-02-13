import React from 'react'
import Header from '../components/Header'
import SpecilityMenu from '../components/SpecilityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <Header/>
      <SpecilityMenu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}
