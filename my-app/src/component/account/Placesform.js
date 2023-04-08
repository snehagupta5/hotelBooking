import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Heading from './Heading';
import Perks from './Perks';
import Photodwnld from './Photodwnld';
import AccountNav from '../AccountNav';
import axios from 'axios';

function Placesform() {
  // add new place 
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addphoto, setAddphoto] = useState([])
  const [perks, setPerks] = useState([])
  const [description, setDescription] = useState('')
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuest, setMaxGuest] = useState('1')
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState();



  function handleform(ev) {
    ev.preventDefault();
    axios.post('/places/new', {
      title, address, addphoto, perks, description, extraInfo, checkIn, checkOut, maxGuest, price
    }).then(() => {
      setRedirect(true);
    }).catch(err => {
      alert(err);
    })
  }
  if (redirect) {
    return <Navigate to={'/Account/Accommodation'} />
  }

  return (
    <>
      <AccountNav />
      <div className='mx-3 '>
        <form action="post" onSubmit={handleform}>
          <Heading title='Title' para='Title for your place should be short and effective in advertisement' />
          <input type="text" placeholder='title' value={title} onChange={evt => setTitle(evt.target.value)} />

          <Heading title='Address' para='Address to this place' />
          <input type="text" placeholder='address' value={address} onChange={evt => setAddress(evt.target.value)} />

          <Photodwnld addphoto={addphoto} setAddphoto={setAddphoto} />
          <Heading title='Description' para='description of the place' />
          <textarea className='w-full border-2 rounded-2xl' name="" id="" cols="15" rows="5" value={description} onChange={evt => setDescription(evt.target.value)}></textarea>


          <Perks perk={perks} setPerks={setPerks} />

          <Heading title='Extra Info' para='house rule , etc' />
          <textarea className='w-full border-2 rounded-2xl' name="" id="" cols="15" rows="5" value={extraInfo} onChange={evt => setExtraInfo(evt.target.value)}></textarea>

          <Heading title='Check in & out times' para='Add check in and out, remerber to have some time window for cleaning the room' />
          <div className="grid gap-2 grid-cols-2  mb-5">
            <div>
              <h3>Check in time</h3>
              <input type="text" placeholder='13' value={checkIn} onChange={evt => setCheckIn(evt.target.value)} />
            </div>
            <div>
              <h3>Check out time</h3>
              <input type="text" placeholder='12' value={checkOut} onChange={evt => setCheckOut(evt.target.value)} />
            </div>
            <div>
              <h3>Price per night</h3>
              <input type="Number" value={price} onChange={evt => setPrice(evt.target.value)} placeholder='500' />
            </div>
            <div>
              <h3>Max guest</h3>
              <input type="Number" value={maxGuest} onChange={evt => setMaxGuest(evt.target.value)} />
            </div>

          </div>

          <button type='submit' className='primary mb-10 '>Save</button>
        </form>
      </div>
    </>
  )
}

export default Placesform
