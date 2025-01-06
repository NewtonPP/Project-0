import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthDataContext } from '../../context/AuthContext'

const Login = () => {
    const {AuthData, setAuthData} = useContext(AuthDataContext)
    const navigate = useNavigate();
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const HandleSubmit = (e) =>{
        e.preventDefault();
        const LoginData={Email, Password}

        axios.post("http://localhost:3000/auth/login", LoginData, {withCredentials: true})
        .then((response)=>{
            localStorage.setItem("ChatUser", JSON.stringify(response.data.user))
            setAuthData(JSON.parse(localStorage.getItem("ChatUser")))
            navigate(`/chat`)
        })
        .catch((error) =>{throw error})
    }
  return (
    <div className='h-screen w-full flex justify-center items-center gap-10'>
          <div className='h-[30rem] w-70 flex items-center justify-center p-8 rounded-2xl  bg-gray-200 flex-col'>
        <p>Do not have an account?</p> 

        <div className='w-24 px-2 py-1 border border-black bg-cyan-800 rounded-2xl flex items-center justify-center mt-4'>
        <Link to={"/signup"} className='text-white'>Click here</Link>
        </div>
        </div>
    <form className='h-[30rem] w-[25rem] bg-orange-100 flex flex-col justify-center items-center gap-4 rounded-2xl'
        onSubmit= {HandleSubmit}
    >
       <h1>WELCOME BACK!</h1>
        <div className='flex flex-col justify-start   gap-2 px-2'>
            <label className='text-base font-semibold '>Email : </label>
            <input className='h-10 w-72 p-2 rounded-2xl' type={'email'}
            onChange={(e)=>setEmail(e.target.value)}
            ></input>
        </div>

        <div className='flex flex-col justify-start   gap-2 px-2'>
            <label className='text-base font-semibold'>Password : </label>
            <input className='h-10 w-72 p-2 rounded-2xl' type="password"  onChange={(e)=>setPassword(e.target.value)}></input>
        </div>
        <button className='bg-black text-white w-72 rounded-2xl'>
            Login
        </button>
       
    </form>
    </div>
  )
}

export default Login
