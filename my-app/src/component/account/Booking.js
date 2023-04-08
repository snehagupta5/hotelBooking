import React, { useEffect, useState } from 'react'
import AccountNav from '../AccountNav'
import axios from 'axios';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import {  format } from 'date-fns'


function Booking() {
  // showing all the user-booking 
  const[userbooking,setUserBooking]=useState();

useEffect(()=>{
  // fetching all the user's booking 
  axios.get('/User-Bookings').then((response)=>{
  setUserBooking(response.data);
  });
},[]);


  return (
    <div>
      <AccountNav />
      <div className='mt-16'>
      {userbooking && userbooking.length > 0 && userbooking.map(booking => {
          return (
            <div className='w-screen' key={userbooking._id}>
              <div className=' md:w-10/12 max-md:mx-5 relative border flex  m-auto my-4 rounded-2xl gap-x-2 bg-gray-200 '> 
              <img className='lg:w-[12%] max-lg:w-[25%] p-2 md:max-h-42 rounded-2xl' src={'http://localhost:4000/uploads/'+booking.place.photos[0]} alt='img'/>
              <div className=' w-[80%] flex flex-col p-2 '>
                <h2 className='text-2xl mb-2'>{booking.place.title}</h2>
                <div className='flex gap-1 text-gray-700'>
                  <p className=''><span className='mr-1' > <i class="fa-regular fa-moon"></i></span>
                    {(differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn)))}
                    <span>Nights</span>
                    </p >
                  <p className='ml-5'><span className='mr-1'><i class="fa-solid fa-calendar-days"></i></span>
                    {format(new Date(booking.checkIn),'yyyy-MM-dd')}
                    </p>
                  <p className='mx-2'> <i class="fa-solid fa-arrow-right"></i> </p>
                  <p><span className='mr-1'><i class="fa-solid fa-calendar-days"></i></span>{format(new Date(booking.checkOut),'yyyy-MM-dd')}</p>
                </div>
                <p className='text-sm truncate mt-2 font-medium'><span className='mr-2'><i class="fa-solid fa-wallet"></i></span> Total money:  &#8377;{booking.price}</p>
                <p className='text-sm mt-1'> By : {booking.name}</p>
              </div>
              </div>
            </div>)
        })}
        </div>
    </div>
  )
}

export default Booking
