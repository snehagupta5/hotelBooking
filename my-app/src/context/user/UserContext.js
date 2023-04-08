import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

 export const UserContext = createContext({});

 export  function UserState({children}){
    const[user,setUser]=useState(null);
    const [ready ,setReady]=useState(false);

useEffect(()=>{
  if (!user) {
    axios.get('/profile')
      .then(({ data }) => {
        setUser(data);
        setReady(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.log('User not found');
        } else {
          console.error(error);
        }
        setReady(true);
      });
  }
},[user]);


    return (
      <UserContext.Provider value={{user,setUser,ready}}>
       {children}
      </UserContext.Provider>
    )
  }
