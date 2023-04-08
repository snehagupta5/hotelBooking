import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Tour() {
  // tour page for listing all the available places/hotels
  const [placeTour, setPlaceTour] = useState([]);

  useEffect(() => {
    // fetching all the hotels
    axios.get('/places').then(({ data }) => {
      setPlaceTour(data);
    })
  }, [])

  return (
    <div className='grid grid-cols-4 mt-16 gap-6 px-10 max-sm:grid-cols-2 max-md:grid-cols-3'>
      {placeTour.length > 0 && placeTour.map(place => {
        return (
          <Link to={'/Tour/' + place._id} key={place._id}>
            <div className=' rounded-2xl w-full flex flex-col 
            '>
              <img className='relative h-80 object-cover w-full rounded-2xl' src={'http://localhost:4000/uploads/' + place.photos[0]} alt='' />
              <h2 className=' mt-4 text-black font-semibold '>{place.title}</h2>
              <h4 className=' text-gray-500'>{place.address}</h4>
              <div className='text-black mt-1'><span className='font-bold mb-4 mr-1'>&#8377;{place.price}</span>
                <span>per night</span></div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Tour
