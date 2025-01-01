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
    <div>
        <div className='text-2xl font-semibold text-white text-center p-4'>
            Your friends
        </div>

      {
        Users?.map((user)=>(
            <div className='text-white text-xl font-semibold text-center hover:cursor-pointer' key={user._id} 
            onClick={()=>setToUser(user._id)}>
                {user.FullName}
            </div>
        ))
      }
    </div>
  )
}

export default ActiveUsers
