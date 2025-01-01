import React, { useContext, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { AuthDataContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const [FullName, setFullName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const {AuthData, setAuthData} = useContext(AuthDataContext)
    const navigate = useNavigate();

    const HandleSubmit = (e) =>{
        e.preventDefault()
        const SignupData = {FullName, Email, Password, ConfirmPassword}
        axios.post("http://localhost:3000/auth/signup", SignupData, {withCredentials: true})
        .then((response)=>{
            localStorage.setItem("ChatUser", JSON.stringify(response.data.newUser))

            navigate(`/chat/${response.data.newUser._id}`)
        })
        .catch((error)=>{console.log(error)})
    }
  return (
    <div className='h-screen w-full flex justify-center items-center'>
    <form className='h-[30rem] w-[25rem] bg-gray-200 flex flex-col justify-center items-center gap-4'
    onSubmit={HandleSubmit}>
        <div className='flex flex-col justify-start item   gap-2 px-2'>
            <label className='text-base font-semibold' >Fullname : </label>
            <input className='h-10 w-72 p-2' type="text" onChange={(e) =>{setFullName(e.target.value)}}></input>
        </div>
        <div className='flex flex-col justify-start   gap-2 px-2'>
            <label className='text-base font-semibold'>Email : </label>
            <input className='h-10 w-72 p-2' type={'email'} onChange={(e) =>{setEmail(e.target.value)}}></input>
        </div>

        <div className='flex flex-col justify-start   gap-2 px-2'>
            <label className='text-base font-semibold'>Password : </label>
            <input className='h-10 w-72 p-2' type="password" onChange={(e) =>{setPassword(e.target.value)}}></input>
        </div>
        <div className='flex flex-col justify-start gap-2 px-2'>
            <label className='text-base font-semibold'>Confirm Password : </label>
            <input className='h-10 w-72 p-2' type="password" onChange={(e) =>{setConfirmPassword(e.target.value)}}></input>
        </div>

        <button className='bg-black text-white w-72'>
            Create Account
        </button>
        <p>Already have an account? <Link to={"/login"} className='text-blue-700'>Click here</Link></p>
    </form>
    </div>
  )
}

export default Signup
