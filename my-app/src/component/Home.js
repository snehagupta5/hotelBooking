import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  // home page 
  return (
    <div>
      <div className="h-screen relative">
        <img className="h-[90%] w-screen object-cover absolute z-0 opacity-0.5" src="img.jpg" alt="img" />
        <div className="absolute inset-0 flex items-center justify-center z-10 text-white">
          <div className="text-center">
            <h2 className="text-2xl  font-bold mb-4">Come & enjoy the unforgettable nights</h2>
            <h1 className="text-5xl  font-bold mb-8">A Luxury Hotel</h1>
            <div className="primary">
              <Link to={'/Tour'} className="px-6 py-3 rounded-full bg-blue-600 text-white font-bold text-sm md:text-base lg:text-lg mr-4 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300">View detail</Link>
              <Link to={'/Tour'} className="px-6 py-3 rounded-full  text-white font-bold text-sm md:text-base lg:text-lg bg-orange-600 hover:bg-orange-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-300">Know more</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex  justify-center items-center max-md:pb-5">
        <div className='grid grid-cols-3  lg:pl-10 '>
          <div className='flex flex-col text-center  md:h-[20rem]  py-5 md:mx-4'>
            <p className='text-8xl text-gray-500'><i class="fa-solid fa-hotel"></i></p>
            <h2 className='text-3xl my-4 '>Fabulous Resort</h2>
            <p className='text-gray-700 line-clamp-10'>Experience the ultimate comfort<br />
              and style with our fabulous rooms, featuring modern amenitiesand breathtaking views."</p>
          </div>
          <div className='flex flex-col text-center  md:h-[20rem]  py-5 md:mx-4'>
            <p className='text-8xl text-gray-500'><i class="fa-sharp fa-solid fa-person-swimming"></i></p>
            <h2 className='text-3xl my-4'>Infinity Pool</h2>
            <p className='text-gray-700 line-clamp-10'>Take a dip in our infinite pool and<br />
              feel like you're floating above the world, surrounded by stunning panoramic views.</p>
          </div>
          <div className='flex flex-col text-center  md:h-[20rem]  p-5 md:mx-4'>
            <p className='text-8xl text-gray-500'><i class="fa-solid fa-landmark"></i></p>
            <h2 className='text-3xl my-4'>Luxury Rooms</h2>
            <p className='text-gray-700 line-clamp-10'>Indulge in a luxurious stay with our<br />
              fabulous rooms, designed to provide you with utmost comfort and relaxation."</p>
          </div>
        </div>
      </div>
      <div className=" mb-10">
        <div className='grid grid-cols-4 relative'>
          <img className='lg:w-[25rem]' src="gallery_1.jpg.webp" alt="" />
          <img className='lg:w-[25rem]' src="gallery_2.jpg.webp" alt="" />
          <img className='lg:w-[25rem]' src="gallery_3.jpg.webp" alt="" />
          <img className='lg:w-[25rem]' src="gallery_4.jpg.webp" alt="" />
        </div>
      </div>
      <div className='mt-10  relative h-[35rem]'>
        <img className='h-[30rem] w-screen object-cover absolute z-1 opacity-70' src="img2.jpg" alt="img" />
        <div className=" absolute inset-0 flex items-center justify-center z-10  text-white ">
          <div className="text-center ">
            <h1 className=" text-5xl  font-bold mb-5">Sign Up for a Newsletter</h1>
            <h2 className="text-xl  font-bold mb-4">Get A 50% Discounts in every Rooms, Book now!</h2>
          </div>
        </div>
      </div>
      <div className="">
        <footer className="bg-gray-800 pt-8 pb-6">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/4 lg:w-1/5 mb-4 md:mb-0 ml-5">
                <h5 className="text-lg mb-2 font-bold text-white">Quick Links</h5>
                <ul className="list-none">
                  <li><Link to={'/'} className="text-gray-400 hover:text-white">Home</Link></li>
                  <li><Link to={'/Tour'} className="text-gray-400 hover:text-white">Rooms</Link></li>
                </ul>
              </div>
              <div className="w-full md:w-1/4 lg:w-1/5 mb-4 md:mb-0 ml-5">
                <h5 className="text-lg mb-2 font-bold text-white">Account</h5>
                <ul className="list-none">
                  <li><Link to={'/login'} className="text-gray-400 hover:text-white">Login</Link></li>
                  <li><Link to={'/logout'} className="text-gray-400 hover:text-white">Logout</Link></li>
                  <li><Link to={'/signup'} className="text-gray-400 hover:text-white">Register</Link></li>
                </ul>
              </div>
              <div className="w-full md:w-1/4 lg:w-1/5 mb-4 md:mb-0 ml-5">
                <h5 className="text-lg mb-2 font-bold text-white">Tours</h5>
                <ul className="list-none">
                  <li><Link to={'/Tour'} className="text-gray-400 hover:text-white">Tours</Link></li>
                  <li><Link to={'/Account/Booking'} className="text-gray-400 hover:text-white">My Bookings</Link></li>
                  <li><Link to={'/Account/Accommodation'} className="text-gray-400 hover:text-white">My accomodation</Link></li>
                </ul>
              </div>
              <div className="w-full md:w-1/4 lg:w-1/5 mb-4 md:mb-0 ml-5">
                <h5 className="text-lg mb-2 font-bold text-white">Contact</h5>
                <ul className="list-none">
                  <li><Link className="text-gray-400 hover:text-white">1234 Main St.</Link></li>
                  <li><Link className="text-gray-400 hover:text-white">info@luxuryhotel.com</Link></li>
                  <li><Link className="text-gray-400 hover:text-white">(555) 555-5555</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-400">&copy; 2023 Luxury Hotel. All rights reserved.</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}

export default Home
