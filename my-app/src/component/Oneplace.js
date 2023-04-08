import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

function Oneplace() {
//  show all the detail of one place 
    const { id } = useParams();
    const [oneplace, setOneplace] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [redirect1, setRedirect1] = useState(false);
    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckOut] = useState();
    const [maxGuest, setMaxGuest] = useState();
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState( );

   let numberOfnights = 0;
    if(checkIn&&checkOut){
         numberOfnights=(differenceInCalendarDays(new Date(checkOut), new Date(checkIn)));
    }

    async function handleBooking(evt){
        evt.preventDefault();
        // Booking the place 
        try{
          await axios.post('/Bookings' , {
            checkIn: new Date(checkIn),
         checkOut: new Date(checkOut),
         maxGuest,
         name,
         mobile,
         place: oneplace._id,
         price: numberOfnights * oneplace.price,
        });
        setRedirect1(true);
    }catch (error) {
        if (error.response && error.response.status === 401) {
            alert("please login");
        } else {
          console.error(error);
        }
      }
    }
    useEffect(() => {
        // fetching the details of the place using the id of that place
        axios.get(`/places/${id}`).then(({ data }) => {
            setOneplace(data);
        })
    }, [id]);

if(redirect1){
    return <Navigate to={'/Account/Booking'} />
}






    function showAllPhoto(evt) {
        evt.preventDefault();
        setRedirect(true);
    }

    if (redirect) {
        return (
            <div className='absole min-h-screen bg-black md:px-48 max-md:px-5' >
                <div className=' py-5 flex justify-between sticky top-0 bg-black '>
                    <h2 className='text-white text-2xl'>{oneplace.title}</h2>
                    <button type='submit' className='border rounded-2xl bg-white px-3 py-1' onClick={() => setRedirect
                        (false)}><i class="fa-solid fa-xmark"></i> <span>close</span></button>
                </div>
                <div className="grid gap-4 pt-5 ">
                    {oneplace.photos && oneplace.photos.length > 0 && oneplace.photos.map(photo => {
                        return (
                            <div className=''>
                                <img src={'http://localhost:4000/uploads/' + photo} alt="img" />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }


    return (
        <div className=''>
            <div className='bg-gray-100 pt-8 md:px-48 max-md:px-5 mb-10'>
                <h1 className='text-2xl font-semibold'>{oneplace.title}</h1>
                <p className='mt-2'><i class="fa-solid fa-location-dot"></i>
                    <span className='ml-2 underline' ><a target='_blank' rel="noopener noreferrer" href={'https://maps.google.com/maps?q=' + oneplace.address}> {oneplace.address}</a></span></p>
                <div className='relative '>
                    <div className='grid grid-cols-[2fr,1fr] gap-2 mt-10 rounded-3xl relative '>
                        <div className='overflow-hidden '>
                            {oneplace.photos?.[0] && <img className='h-[25rem] w-[100%] object-cover rounded-l-lg cursor-pointer' src={'http://localhost:4000/uploads/' + oneplace.photos[0]} alt='img' onClick={showAllPhoto} />}
                        </div>
                        <div className='grid grid-rows-2 rounded-2xl  gap-2  w-[100%]'>
                            {oneplace.photos?.[1] && <img className='h-[12rem] w-[100%] object-cover rounded-tr-lg cursor-pointer ' src={'http://localhost:4000/uploads/' + oneplace.photos[1]} alt='img' onClick={showAllPhoto} />}
                            {oneplace.photos?.[2] && <div className='relative'><img className='h-[12rem] w-[100%] object-cover rounded-br-lg cursor-pointer' src={'http://localhost:4000/uploads/' + oneplace.photos[2]} alt='img' onClick={showAllPhoto} />
                                <div className='absolute right-5 border bg-white bottom-4 py-1  px-2 rounded-xl cursor-pointer shadow-black shadow-md'>
                                    <button type='submit' onClick={showAllPhoto}> <i class="fa-solid fa-image"></i> show img </button>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='grid lg:grid-cols-[2fr,1fr]  mt-12 w-[100%]  '>
                    <div>
                        <div >
                            <h2 className='text-2xl font-semibold mb-2'>Description</h2>
                            <p className='tracking-tight'>{oneplace.description}</p>
                        </div>
                        <div className='flex flex-col mt-7 mb-5 text-lg'>
                            <p><span className='font-medium mr-1'>Check-in:</span>{oneplace.checkIn}</p>
                            <p><span className='font-medium mr-1'>Check-out:</span>{oneplace.checkOut}</p>
                            <p><span className='font-medium mr-1'>Max number of guest:</span>{oneplace.maxGuest}</p>
                        </div>
                        <hr />
                        <div className=' my-7'>
                            <h2 className='font-semibold text-2xl mb-2'>What this place offers</h2>
                            <div className='grid grid-cols-2 gap-y-2'>
                                {oneplace.perks && oneplace.perks.length > 0 ? oneplace.perks.map(perk => {
                                    return (
                                        <div className='text-xl' key={perk}>
                                            {(perk === 'car parking' && <i class="fa-solid fa-car"></i>)}
                                            {(perk === 'TV' && <i class="fa-solid fa-tv"></i>)}
                                            {(perk === 'Pets' && <i class="fa-solid fa-paw"></i>)}
                                            {(perk === 'AC' && <i class="fa-solid fa-temperature-arrow-up"></i>)}
                                            {(perk === 'wifi' && <i class="fa-solid fa-wifi"  ></i>)}
                                            <span className='ml-2'>{perk}</span></div>
                                    )
                                }) : <div className='text-xl '>Food</div>}
                            </div>
                        </div>
                        <div className='mb-20 ' >
                            <h2 className='font-semibold text-2xl mb-2'>Extra Info</h2>
                            <p>{oneplace.extraInfo}</p>
                        </div>
                    </div>
                    <div className='  sticky top-10 right-0 max-lg:mb-10 '>
                        <div className="bg-white p-4 rounded-2xl">
                        <div className="text-center font-bold text-xl ">
                            &#8377;{oneplace.price}/night
                        </div>
                        <form action="">
                            <div className='my-4' >
                                <div className="flex ">
                                    <div className="py-3 px-4 border">
                                        <label >Check in:</label>
                                        <input value={checkIn} onChange={(evt) => setCheckIn(evt.target.value)} type="date" />
                                    </div>
                                    <div className="py-3 px-4 border ">
                                        <label >Check out:</label>
                                        <input value={checkOut} onChange={(evt) => setCheckOut(evt.target.value)} type="date" />
                                    </div>
                                </div>
                                <div className="py-3 px-4 border">
                                    <label >Max guest</label>
                                    <input value={maxGuest} onChange={(evt) => setMaxGuest(evt.target.value)} type="number" />
                                </div>
                                {numberOfnights > 0 && (
                               <div>
                                 <div className="py-3 px-4 border">
                                    <label>Name</label>
                                    <input value={name} onChange={(evt) => setName(evt.target.value)} type="text" />
                                </div> 
                                <div className="py-3 px-4 border">
                                    <label >Contact No</label>
                                    <input value={mobile} onChange={(evt) => setMobile(evt.target.value)} type="tel" />
                                </div>
                                </div>
                                )}
                            </div>
                            <button className='primary' type='submit' onClick={handleBooking}>Book Now</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Oneplace
