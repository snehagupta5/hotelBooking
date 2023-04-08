import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../context/user/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { user,setUser } = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const {data} = await axios.post('/login', { email, password });
      setUser(data);
      alert('login successful');
      console.log(data);
      setRedirect(true);
    } catch (error) {
      alert('login failed');
    }
  };

  if (redirect) {
    return <Navigate to={'/Tour'} />
  }
  return (
    <div className='mt-4 h-96 grow flex flex-col items-center justify-center'>
      <div className='text-4xl text-center my-4' >
        <h1>Login</h1>
      </div>
      <form action="" className='max-w-md mx-auto' onSubmit={handleLogin}>
        <input type="email"
          placeholder='your@email.com'
          value={email}
          onChange={e => setEmail(e.target.value)} />
        <input type="password"
          placeholder='password'
          value={password}
          onChange={e => setPassword(e.target.value)} />
        <button className='primary' type='submit'>Login</button>
      </form>
      <div className='text-gray-500 '>
        Don't have account yet?
        <Link className='underline' to={'/Signup'} >Register</Link>
      </div>
    </div>
  )
}

export default Login
