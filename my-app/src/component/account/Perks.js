import React from 'react'
import Heading from './Heading';


function Perks({selected,setPerks}) {
  // perk selection from the add new-place-form 
  function handlePerk(ev){
    ev.preventDefault();
  const {checked,name }=ev.target;
  
  if(checked){
    setPerks(prev=>{
      return [...prev ,name]})
  }else{
    setPerks(prev=>{
      return [...prev.filter(selectedname=>selectedname!==name)];
    })
  }
  }
  return (
    <div>
      <Heading title='Perks' para='Select all the perks' />
            <div className='grid grid-cols-2 md:grid-col-3 lg:grid-cols-3 my-3 gap-y-5 text-lg gap-x-10 '>
              <label className='flex gap-1 items-center cursor-pointer border rounded-lg h-16 p-2 ' >
                <input type="checkbox" name='wifi' onChange={handlePerk} />
                <i class="fa-solid fa-wifi"  ></i>
                <span>Wifi</span>
              </label>
              <label className='flex gap-1 items-center cursor-pointer border rounded-lg h-16 p-2'>
                <input type="checkbox" name='car parking' onChange={handlePerk}  />
                <i class="fa-solid fa-car"></i>
                <span>Car Parking</span>
              </label>
              <label className='flex gap-1 items-center cursor-pointer border rounded-lg h-16 p-2' >
                <input type="checkbox" name='TV' onChange={handlePerk} />
                <i class="fa-solid fa-tv"></i>
                <span>TV</span>
              </label>
              <label className='flex gap-1 items-center cursor-pointer border rounded-lg h-16 p-2'>
                <input type="checkbox" name='Pets' onChange={handlePerk} />
                <i class="fa-solid fa-paw"></i>
                <span>Pets</span>
              </label>
              <label className='flex gap-1 items-center cursor-pointer border rounded-lg h-16 p-2'>
                <input type="checkbox" name='AC' onChange={handlePerk} />
                <i class="fa-solid fa-temperature-arrow-up"></i>
                <span>AC</span>
              </label>
            </div>
    </div>
  )
}

export default Perks
