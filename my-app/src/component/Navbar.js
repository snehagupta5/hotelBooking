import React ,{useContext} from 'react';
import { Link} from 'react-router-dom';
import { UserContext } from '../context/user/UserContext';
function Navbar() {
  const {user} = useContext(UserContext);
  return (
    <>
      <nav className='min-w-full flex justify-between bg-secondary items-center h-11 md:pl-10 max-md:pl-5 text-white sticky top-0 z-50'>
        <Link to={'/Tour'} className='' >
            <h2>LUXEHOTEL</h2>
        </Link>
        <ul className='flex gap-3 lg:ml-40 md:ml-40 cursor-pointer rounded-2xl items-center justify-center text-white  p-1 w-70' >
        <li> <Link to={'/'}>Home</Link></li>
        <div className="border-r-white border-s-2 h-4"></div>
        <li><Link to={'/tour'}>Tour</Link></li>
        <div className="border-r-white border-s-2 h-4"></div>
        <li><Link to={'/account'}>Account</Link></li>
        </ul>
        <Link to={user ?'/logout':'/Login'} className='rounded-full cursor-pointer flex items-center justify-center text-white border border-white p-1  md:mr-16 max-md:mr-5 md:gap-2 max-md:gap-1'>
        <div className=' rounded-full cursor-pointer border-gray-100 flex items-center justify-center h-6 w-6 bg-gray-500 text-white  '>
        <i className="fa-solid fa-user"></i></div>
        {user!=null&&<span className=' md:mr-1 items-center font-semibold'>{user.name}</span>}
    </Link>
      </nav>
      </>
  )
}

export default Navbar
