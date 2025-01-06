import axios from 'axios';
import React, { useContext, useState } from 'react'
import { IoIosLogOut } from "react-icons/io";
import { AuthDataContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const SidebarFooter = () => {
  const navigate = useNavigate()
  const {setAuthData} = useContext(AuthDataContext)
    const HandleLogout = () =>{
      axios.get("http://localhost:3000/auth/logout",{withCredentials:true})
      .then((response)=>{
        localStorage.removeItem("ChatUser")
        setAuthData(localStorage.getItem("ChatUser"))
        navigate("/")
      })
    }
  return (

    <>
    <div className='h-10 w-full flex justify-end items-center '>
      <IoIosLogOut className='text-white text-2xl mr-2 hover:cursor-pointer'
        onClick={HandleLogout}
      />
    </div>

</>
  )
}

export default SidebarFooter
