import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Account from '../AccountNav';
import axios from 'axios';

function Accommodation() {
  // showing the all my-accomation and can add more 

  const [AllPlaces, setAllPlaces] = useState('');
const[redirect , setRedirect]=useState(false);
useEffect(() => {
  // fetching all user added accomodation 
  axios.get('/User-place').then(({ data }) => {
    setAllPlaces(data);
  })
}, [redirect]); 

  function handleDelete(evt){ 
    // deleting all added user accomodation 
  evt.preventDefault();
  const buttonValue = evt.target.getAttribute("value");
    axios.delete('/deleteplace',{ data: { placeid: buttonValue } }).then(()=>{
    return setRedirect(true);
   });
 
 }


  return (
    <div>
      <Account />
      <div>
        <Link to={'/account/Accommodation/new'} className=' flex items-center justify-center gap-4 mt-7'>
          <button type='submit' className='border
      bg-primary rounded-2xl px-2 py-1  text-white mt-2'>
            <i class="fa-solid fa-plus "></i>
            <span> Add new Place </span></button>
        </Link>
        {AllPlaces.length > 0 && AllPlaces.map(place => {
          return (
            <div className='w-full' key={place.photos[0]}>
              <div className='md:w-10/12 max-md:mx-5 relative border flex  m-auto my-4 rounded-2xl gap-x-2 bg-gray-200'> 
              <img className='md:w-[12%] max-md:w-[20%] h-36 p-2 my-auto rounded-2xl' src={'http://localhost:4000/uploads/'+place.photos[0]} alt='img'/>
              <div className=' w-[80%] flex flex-col p-2  max-md:mr-4'>
                <h2 className='text-2xl mb-2'>{place.title}</h2>
                <p className='text-sm line-clamp-3'>{ place.description}</p>
              </div>
              <div className='absolute md:right-8 max-md:right-[5px] top-3 cursor-pointer'>
                <button type='submit' name="myButton">
                  <i class="fa-solid fa-trash-can" onClick={handleDelete} value={place._id} name='mydelete'></i></button>
                
              </div>
              </div>
            </div>)
        })}
      </div>
    </div>
  )
}

export default Accommodation
