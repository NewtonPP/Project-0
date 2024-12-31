import React from 'react'
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
    const navigate = useNavigate();
  return (
    <div className='flex items-center justify-center flex-col h-screen w-full gap-4'>
      <h1 className='text-2xl font-semibold'>Welcome to the Craxxy Chat app</h1>
      <button className='bg-black text-white h-14 w-22 p-4 rounded-md'
      onClick={() => navigate("/signup")}
      >Get Started</button>
    </div>
  )
}

export default HomePage
