import React from 'react'
import { FaSearch } from "react-icons/fa";
const Search = () => {
  return (
    <div className='w-full flex justify-center mt-2 gap-2'>
      <input className='h-10 w-[80%] rounded-2xl px-4 font-semibold'
        placeholder='Search your contact' 
      ></input>
      <button className='h-10 w-10 bg-black text-white flex justify-center items-center rounded-full'><FaSearch /></button>
    </div>
  )
}

export default Search
