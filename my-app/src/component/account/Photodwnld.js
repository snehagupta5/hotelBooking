import React, { useState } from 'react'
import Heading from './Heading'
import axios from 'axios';

function Photodwnld({ addphoto, setAddphoto }) {
  // Upload the photos section

  const [photolink, setPhotolink] = useState('')
  async function addphotobyLink(ev) {
//  uploading the photo from the link 
    ev.preventDefault();
    const { data } = await axios.post('/upload', { link: photolink });
    setAddphoto(prev => {
      return [...prev, data];
    });
    setPhotolink('');
  }


  function addphotobyFile(ev) {
    // uploading the photo from the files 
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios.post('/upload-by-Files', data, {
      headers: { 'Content-type': 'multipart/form-data' }
    }).then(response => {
      const { data: filenames } = response;
      setAddphoto(prev => {
        return [...prev, ...filenames];
      });
    })
  }

  return (
    <div>
      <Heading title='Photo' para='Add good quality images' />
      <div className='flex gap-1'>
        <input type="text" placeholder='add using link....jpg' value={photolink} onChange={evt => setPhotolink(evt.target.value)} />
        <button type='submit' className=' primary w-auto border
      bg-primary rounded-2xl px-2 py-1  text-white mt-2' onClick={addphotobyLink}>Add photo</button>
      </div>
      <div className="grid mt-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 gap-y-1">
        {addphoto.length > 0 && addphoto.map(imgUrl => (
          <div className=' h-32 flex' key={imgUrl}>
            <img className=' w-full rounded-2xl object-cover' src={'http://localhost:4000/uploads/' + imgUrl} alt='img' />
          </div>
        ))}
        <label className='cursor-pointer h-32 border bg-transparent flex justify-center items-center rounded-2xl' >
          <input type='file' className='hidden' onChange={addphotobyFile} multiple /><i class="fa-solid fa-file-arrow-up fa-xl "></i>upload </label>
      </div>
    </div>
  )
}

export default Photodwnld
