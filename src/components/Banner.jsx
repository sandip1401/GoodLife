import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate=useNavigate()
  return (
    <div className="bg-blue-500 flex rounded-lg px-6 sm:px-10 md:px-14 lg:px-20 my-20 md:max-10">
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold">
          Book Appointment
        </p>
        <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-5xl mt-4 font-semibold">
          With 100+ Trusted Doctors
        </p>
        <button onClick={()=>navigate('/login')} className="mt-6 cursor-pointer px-9 py-3 sm:text-base hover:scale-105 transition-all active:scale-95 duration-200 text-gray-600 text-sm bg-white rounded-full">
          Create account
        </button>
      </div>
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img className="w-full absolute bottom-0 right-0 max-w-md" src={assets.appointment_img} alt="" />
      </div>
    </div>
  );
}
