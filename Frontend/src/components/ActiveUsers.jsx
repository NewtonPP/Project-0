import React, { useContext, useEffect, useState } from 'react'
import { AuthDataContext } from '../../context/AuthContext';
import axios from 'axios';
import { MessageDataContext } from '../../context/MEssageContext';

const ActiveUsers = () => {
    const [Users, setUsers] = useState();
    const {AuthData, setAuthData} = useContext(AuthDataContext)
    const {setToUser} = useContext(MessageDataContext)
    const CurrentUserId = AuthData._id
 
    useEffect(()=>{
        axios.get("http://localhost:3000/auth/getusers", {withCredentials:true})
        .then((response)=>{
            setUsers(response.data.filter((user)=>user._id!=CurrentUserId))
        })
    },[])


  return (
    <div className='overflow-y-auto h-[90.5%]'>
        <div className='text-2xl font-semibold text-white  p-4'>
            CONTACTS
        </div>

      {
        Users?.map((user)=>(
            <div className='text-white text-xl font-semibold p-2 mx-2 my-2 hover:cursor-pointer hover:bg-cyan-800 border rounded-full' key={user._id} 
            onClick={()=>setToUser(user._id)}>
                {user.FullName}
            </div>
        ))
      }
    </div>
  )
}

export default ActiveUsers
