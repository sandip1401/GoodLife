import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

export default function Contact() {
  return (
    <div>
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
          <p>Email: sahasandip763@gmail.com</p>
          <p className='mt-6 mb-6 text-gray-800 font-semibold'>CAREERS AT GOODLIFE</p>
          <p>Learn more about our teams and job openings.</p>
          <button className='border mt-5 px-8 text-sm text-black py-3.5 w-fit hover:bg-black hover:text-white transition-all duration-200 cursor-pointer'>Explore Jobs</button>
        </div>
      </div>


    </div>
  )
}
