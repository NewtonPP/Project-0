import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Chat = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [users,setUsers] = useState()
    const [user, setUser] = useState()
    const [conversations, setconversations] = useState()

    const [MessageToSend, setMessageToSend] = useState({})

    const FilteredUser = users?.filter((FU)=>FU?.Email !== user?.Email)

    const [selectedUser, setSelectedUser] = useState()

    const ReceiverId = location.pathname.slice(6,location.pathname.length)
   

    useEffect(()=>{
        axios.get("http://localhost:3000/auth/getusers",{
            withCredentials:true
        })
        .then((response)=>setUsers(response.data))


        axios.get("http://localhost:3000/auth/getuser",{
            withCredentials:true
        })
        .then((response)=>{setUser(response.data)})

        axios.get(`http://localhost:3000/message/getmessage/${ReceiverId}`,{
            withCredentials:true
        })
        .then((response)=>{
            setconversations(response.data.Messages)
        })
        .catch((error)=>setconversations())
    },[ReceiverId]
)
    
    const HandleSendMessage = (e) =>{
        axios.post(`http://localhost:3000/message/sendmessage/${ReceiverId}`,MessageToSend, {
            withCredentials:true
        })
       
    }
  return (
    <div className='h-screen w-screen bg-black flex'>
    <div className='h-screen w-[30%] bg-white flex flex-col gap-2'>
        {
            FilteredUser?.map((person, index)=>{
                return (
                    <div key={index} className='h-10 bg-red-600 flex justify-center items-center text-xl font-bold hover:bg-red-900 cursor-pointer' onClick={()=>{
                        setSelectedUser(person.FullName)
                        navigate(`/chat/${person._id}`)}}>
                        {person?.FullName}
                    </div>
                )
            })
        }
    </div>
    <div className='h-screen w-[70%] bg-blue-500 flex flex-col items-center'>
        {
        selectedUser &&
        <h1 className='text-3xl'>{selectedUser}</h1>
        }
        <div className='h-[80%] bg-black w-full'>
            {
                conversations?.map((conversation , index)=>{
                   return (
                    conversation.From === ReceiverId ?
                    <div key={conversation._id} className='w-full flex justify-start'>
                        <div className='text-white ml-4'>{conversation.Message}</div>
                    </div>
                    :
                    <div className='w-full flex justify-end'>
                        <div className='text-white mr-4'>{conversation.Message}</div>
                    </div>
                   )
                   
                })
            }
        </div>
        <div className='h-14 mt-4 w-[80%] flex'>
        <input className=' h-full w-full px-4 rounded-lg' placeholder='Type your message here'
             onChange={(e)=>setMessageToSend({Message:e.target.value})}
        ></input>
        <button className='bg-blue-300 w-20 rounded-lg' onClick={HandleSendMessage}>send</button>
        </div>
    </div>
    </div>
  )
}

export default Chat
