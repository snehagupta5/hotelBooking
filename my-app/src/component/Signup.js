import React, { useContext,useState } from 'react'
import { Link , Navigate} from 'react-router-dom'
import axios from 'axios';

import { UserContext } from '../context/user/UserContext';

function Signup() {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[name,setName]=useState('');
  const[redirect,setRedirect]=useState(false);
  const { user,setUser } = useContext(UserContext);

  async function handleRegistration(e) {
    e.preventDefault();
    try{
      const {data}= await axios.post('/register',{name,email,password});
    alert('registration successful');
    setUser(data);
    setRedirect(true);
    }catch(error){
      alert('registration failed');
    }

};
if(redirect){
  return <Navigate to={'/'} />
}
  return (
    <div>
     <div className='mt-4 h-96 grow flex flex-col items-center justify-center'>
    <div className='text-4xl text-center my-4' >
        <h1>Register</h1>
    </div>
    <form action="post" className='max-w-md mx-auto ' onSubmit={handleRegistration}>
        <input type="text" 
        placeholder='name' 
        value={name} 
        onChange={e => setName(e.target.value)} />
        <input type="email"
         placeholder='your@email.com'
         value={email} 
         onChange={e => setEmail(e.target.value)}  />
        <input type="password" 
        placeholder='password'
        value={password} 
          onChange={e=> setPassword(e.target.value)} />
        <button className='primary'
         type='submit'>Register</button>
    </form>
    <div className='text-gray-500 '>
        Already have an account?
        <Link className='underline' to={'/login'}>Login</Link>
    </div>
    </div>
    </div>
  )
}

export default Signup
