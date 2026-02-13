import React from 'react'

export default function Footer() {
  return (
    <div className='mt-5'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm mt-40'>
        {/*left*/}
        <div>
            <h1 className='font-bold text-3xl text-blue-700'>Good<span className="text-green-500">Life</span></h1>
            <p className='mt-3 w-full md:w-2/3 text-gray-500 leading-6'>GoodLife helps patients connect with trusted doctors effortlessly. Book appointments, manage your visits, and experience a smoother, safer, and smarter healthcare journey with our intelligent and easy-to-use platform.</p>
        </div>

        {/*center*/}
        <div>
            <h1 className='text-xl font-medium mb-5'>COMPANY</h1>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        {/*right*/}
        <div>
            <h1 className='text-xl font-medium mb-5'>GET IN TOUCH</h1>
            <p className='text-gray-600 mb-2'>Doctor Registration Enquiries :-</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+91 6296469437</li>
                <li>+91 9832292610</li>
                <li>sahasandip763@gmail.com</li>
            </ul>
        </div>
        </div>

        {/*footer*/}
        <div className='text-gray-600'>
            <hr />
        <p className='text-center p-4 text-sm'>Copyright 2026 @ GoodLife - All Right Reserved.</p>
        </div>
        
    </div>
  )
}
