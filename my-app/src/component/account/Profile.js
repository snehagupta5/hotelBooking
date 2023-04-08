import React, {  useEffect, useState } from 'react'
import AccountNav from '../AccountNav'
import axios from 'axios';

function Profile() {
  //my profile page
  const [user,setUser]=useState();
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    //fetching user info 
    axios.get('/profile').then(({data}) => {
      setUser(data)
      setIsLoading(false);
    })
  }, []);
  
  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } 
  if (!user) {
    return (
      <div>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div>
      <AccountNav />
      <div className="bg-gray-100 pb-20 pt-10 mt-16 w-screen">
      <h2 class="text-3xl  font-bold text-gray-800 mb-4 lg:whitespace-nowrap max-lg:px-5 m-auto pb-10 text-center">Hey, welcome to LuxeHotel! We hope you have a wonderful vacation.</h2>
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-center">
            <img className="h-32 w-32 rounded-full object-cover" src="https://source.unsplash.com/random" alt=" Pic" />
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile
