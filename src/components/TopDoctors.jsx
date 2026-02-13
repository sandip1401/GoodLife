import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    const navigate=useNavigate()
    const {doctors}=useContext(AppContext)
  return (
    <div className='flex flex-col items-center gap-4 my-10 text-gray-900 mx-6'>
        <h1 className='text-center font-semibold text-3xl'>Top Doctors to Book</h1>
        <p className='text-center text-sm mb-4'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-3 gap-y-4'> 
            {doctors.slice(0,10).map((item,index)=>(
                <div key={item._id} onClick={()=>navigate(`/appoinment/${item._id}`)} className='border border-blue-200 rounded-lg overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                    <img className='bg-blue-50' src={item.image} alt="" />
                    <div className='p-2'>
                        <div className='flex items-center gap-2 text-sm text-green-500 text-center font-normal'>
                        <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p></div>
                        <p className='text-lg font-medium text-gray-900'>{item.name}</p>
                        <p className='text-sm text-gray-600'>{item.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='cursor-pointer text-gray-600 bg-blue-100 px-12 py-3 rounded-full mt-10 hover:scale-105 active:scale-95 transition duration-300'>more</button>
    </div>
  )
}

export default TopDoctors