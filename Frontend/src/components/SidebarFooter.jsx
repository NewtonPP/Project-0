import React, { useState } from 'react'
import { IoIosLogOut } from "react-icons/io";
const SidebarFooter = () => {
   

    const HandleLogout = () =>{

    }
  return (

    <>
    <div className='h-10 w-full flex justify-end items-center'>
      <IoIosLogOut className='text-white text-2xl mr-2'
        onClick={()=>HandleLogout}
      />
    </div>

</>
  )
}

export default SidebarFooter
