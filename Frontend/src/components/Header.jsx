import React, { useContext, useEffect, useState } from 'react'
import { MessageDataContext } from '../../context/MEssageContext'
import { FaInfoCircle } from "react-icons/fa";
import axios from 'axios'

const Header = () => {
    const [User, setUser] = useState();
    const {ToUser} = useContext(MessageDataContext)
    const [clicked, setClicked] = useState(false)
    useEffect(()=>{
        if(ToUser){
        axios.get(`http://localhost:3000/auth/getuser/${ToUser}`,{
            withCredentials: true,
          })
          .then((response)=>setUser(response.data))
        }
    },[ToUser])
   
  return (
    <>
    <div className='h-14 w-full bg-black flex items-center justify-between'>
      <h1 className='text-white font-semibold text-xl mx-4'>{User?.FullName}</h1>
      <FaInfoCircle className='text-white mx-4 text-2xl'
      onClick={()=>{setClicked(!clicked)}}/>
    </div>
    {
    clicked &&
        <div className='h-[89.8%] w-[70%] bg-slate-200 z-10 absolute'>
        <h2 className='text-3xl font-bold mx-4'>User Profile</h2>
        <div className='flex gap-2 mx-4'>
        <h3 className='text-xl font-semibold'>Full Name: </h3>
        <p className='text-xl font-semibold'>{User.FullName}</p>
        </div>

        <div className='flex gap-2 mx-4'>
        <h3 className='text-xl font-semibold'>Email: </h3>
        <p className='text-xl font-semibold'>{User.Email}</p>
        </div>
    </div>
}
    </>
  )
}

export default Header
