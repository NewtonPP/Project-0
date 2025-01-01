import React from 'react'
import Sidebar from '../components/Sidebar'
import MessageContainer from '../components/MessageContainer'

const ChatPage = () => {
  return (
    <div className='h-screen w-full flex'>
        <Sidebar/>
        <MessageContainer/>
    </div>
  )
}

export default ChatPage
