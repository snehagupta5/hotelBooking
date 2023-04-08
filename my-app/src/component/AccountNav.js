import React, { useContext } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { UserContext } from '../context/user/UserContext';

function Account() {
  // account section nav : onlyy for logged users 
  const { user, ready } = useContext(UserContext);
  const { pathname } = useLocation();
  let subpage = pathname.split('/')[2];
  if (subpage !== null) {
    if (subpage === undefined) { subpage = 'profile' }
  }
  if (!ready) {
    return 'loading...';
  }
  // 8EC3B0
  // 9ED5C5
  if (ready && !user) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <div className='w-full flex items-center justify-center gap-4 mt-7'>
        <Link to={'/account/Profile'} className={subpage === 'Profile' ? `border
      bg-primary rounded-2xl px-2 py-1  flex gap-2 justify-center items-center text-white max-md:flex-col text-center`: `border
      bg-gray-400 rounded-2xl px-2 py-1  flex gap-2 justify-center items-center text-white max-md:flex-col  text-center`}  ><i class="fa-regular fa-user"></i><span>My Profile</span> </Link>
        <Link to={'/account/Booking'} className={subpage === 'Booking' ? `border
      bg-primary rounded-2xl px-2 py-1 flex gap-2 justify-center items-center text-white max-md:flex-col text-center`: ` border
      bg-gray-400 rounded-2xl px-2 py-1  flex gap-2 justify-center items-center text-white max-md:flex-col text-center`} ><i class="fa-solid fa-location-pin"></i>My Bookings </Link>
        <Link to={'/account/Accommodation'} className={subpage === 'Accommodation' ? `border
      bg-primary rounded-2xl px-2 py-1 flex gap-2 justify-center items-center text-white max-md:flex-col text-center`: ` border
      bg-gray-400 rounded-2xl px-2 py-1  flex gap-2 justify-center items-center text-white max-md:flex-col text-center`} ><i class="fa-solid fa-hotel"></i>My Accommodations </Link>
      </div>
    </>
  )
}

export default Account
