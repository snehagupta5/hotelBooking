import React from 'react'

function Heading( props) {
  return (
    <div>
       <h2 className='text-2xl mt-4'>{props.title}</h2>
            <p className='text-gray-500 text-sm'>{props.para}</p>
    </div>
  )
}

export default Heading
