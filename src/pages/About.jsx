import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

export default function About() {
  return (
    <div>
      <div className='flex items-center justify-center text-2xl gap-1.5 mt-16'>
      <p className='text-gray-500'>ABOUT</p>
      <p>US</p>
      </div>

      <div className='flex flex-col md:flex-col md:gap-10 lg:flex-row mt-12 gap-6 lg:gap-0'>
        <div className='w-full lg:w-1/3 flex justify-center lg:justify-start'>
          <img className='w-full max-w-xs md:max-w-sm lg:max-w-[360px]' src={assets.about_image} alt="" />
        </div>

        <div className='w-full md:max-w-[90%] mx-auto lg:w-2/3 lg:mx-8 flex flex-col justify-center text-gray-600'>
            <div className='lg:w-4/5'><p>Welcome to GoodLife, your trusted partner in simplifying healthcare appointments and improving patient experiences. At GoodLife, we understand the challenges people face when booking doctor visits and managing consultation schedules.</p>


        <p className='mt-3'>GoodLife is committed to building smart and reliable healthcare solutions. We continuously improve our platform to make appointment booking, queue management, and clinic coordination seamless for patients and doctors. Whether you're scheduling your first visit or managing care, GoodLife supports you at every step.</p>

            <p className='mt-3 text-black font-semibold'>Our Vison</p>

        <p className='mt-0.5'>Our vision at GoodLife is to create an organized healthcare system where patients and doctors connect easily. We aim to reduce waiting time, remove confusion, and make quality healthcare accessible when needed.</p>
            </div>
        </div>
        
      </div>
      
      <div className='mt-15'>
        <p className='mb-4 text-2xl'>WHY <span className='text-gray-600 font-semibold'>CHOOSE US</span></p>
        <div className='flex flex-col lg:flex-row'>
          <div className='border border-gray-300 px-10 md:px-16 py-6 sm:py-16 flex flex-col text-[15px] gap-3 hover:bg-blue-500 hover:[&_p]:text-white transition-all duration-300 cursor-pointer'>
            <p className='text-gray-700 group-hover:text-white font-bold'>EFFICIENCY:</p>
            <p className='text-gray-600 group-hover:text-white'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className='border border-gray-300 px-10 md:px-16 py-6 sm:py-16 text-[15px] flex flex-col gap-3 hover:bg-blue-500 hover:[&_p]:text-white transition-all duration-300 cursor-pointer'>
            <p className='text-gray-700 font-bold'>CONVENIENCE:</p>
            <p className='text-gray-600'>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className='border border-gray-300 px-10 md:px-16 py-6 sm:py-16 text-[15px] flex flex-col gap-3 hover:bg-blue-500 hover:[&_p]:text-white transition-all duration-300 cursor-pointer'>
            <p className='text-gray-700 group-hover:text-white font-bold'>PERSONALIZATION:</p>
            <p className='text-gray-600 group-hover:text-white'>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>

    </div>
  )
}
