import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/user/UserContext';

function Logout() {
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(UserContext);

  async function handleClick(e) {
    // e.preventDefault();
    try {
      const { data } = await axios.post('/logout');
      alert('logout successful');
      setUser(null);
      console.log(data);
      setRedirect(true);
    } catch (error) {
      alert('logout failed');
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div className="bg-gray-100 py-20  mt-32 w-screen">
      <div className=" px-20 mx-auto">
        <div className="flex items-center justify-center">
        <button className='primary flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-white hover:bg-secondary focus:outline-none focus:ring-2  focus:ring-offset-2 transition-colors duration-300 w-14 h-14' type='submit' onClick={handleClick}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Logout
