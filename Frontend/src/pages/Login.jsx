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
            console.log(response.data)
           
            navigate(`/chat/${response.data.user._id}`)
        })
        .catch((error) =>{throw error})
    }
  return (
    <div className='h-screen w-full flex justify-center items-center'>
    <form className='h-[30rem] w-[25rem] bg-gray-200 flex flex-col justify-center items-center gap-4'
        onSubmit= {HandleSubmit}
    >
       
        <div className='flex flex-col justify-start   gap-2 px-2'>
            <label className='text-base font-semibold'>Email : </label>
            <input className='h-10 w-72 p-2' type={'email'}
            onChange={(e)=>setEmail(e.target.value)}
            ></input>
        </div>

        <div className='flex flex-col justify-start   gap-2 px-2'>
            <label className='text-base font-semibold'>Password : </label>
            <input className='h-10 w-72 p-2' type="password"  onChange={(e)=>setPassword(e.target.value)}></input>
        </div>
        <button className='bg-black text-white w-72'>
            Login
        </button>
        <p>Do not have an account? <Link to={"/signup"} className='text-blue-700'>Click here</Link></p>
    </form>
    </div>
  )
}

export default Login
