import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { Helmet } from "react-helmet-async";

export default function Contact() {
  return (
    <div>
      <Helmet>
        <title>Contact Doctor In City | Rampurhat Medical Help</title>
        <meta
          name="description"
          content="Contact Doctor In City for doctor appointments, clinic information, and blood donor support in Rampurhat. Reach our team for urgent medical help."
        />
        <meta
          name="keywords"
          content="contact doctor in city, Rampurhat medical help, doctor appointment support, blood donor contact, clinic inquiry"
        />
        <meta property="og:title" content="Contact Doctor In City | Rampurhat Medical Help" />
        <meta
          property="og:description"
          content="Get in touch with Doctor In City for doctor appointments, clinic information, and blood donor support in Rampurhat."
        />
        <meta property="og:url" content="https://www.doctorincity.com/contact" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className='flex items-center justify-center text-2xl gap-1.5 mt-16 mb-12'>
      <p className='text-gray-500'>CONTACT</p>
      <p>US</p>
      </div>

      <div className='flex flex-col lg:flex-row gap-12 justify-center'>
        <div className='w-full md:max-w-[360px]'>
            <img src={assets.contact_image} alt="" />
        </div>
        <div className='flex flex-col justify-center text-gray-500 text-[15px]'>
          <p className='mb-5 text-gray-700 font-semibold'>OUR OFFICE</p>
          <p>ACTION AREA I</p>
          <p className='mb-6'>DD 252, NEWTOWN, KOLKATA</p>
          <p>Tel: +91 6296469437</p>
          <p>Tel: +91 9832292610</p>
          <p>Email: doctorinmycity@gmail.com</p>
          <p className='mt-6 mb-6 text-gray-800 font-semibold'>CAREERS AT DOCTOR IN CITY</p>
          <p>Learn more about our teams and job openings.</p>
          <button className='border mt-5 px-8 text-sm text-black py-3.5 w-fit hover:bg-black hover:text-white transition-all duration-200 cursor-pointer'>Explore Jobs</button>
        </div>
      </div>


    </div>
  )
}
