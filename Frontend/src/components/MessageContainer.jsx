import React from 'react'
import Messages from './Messages'
import SendMessage from './SendMessage'
import Header from './Header'

const MessageContainer = () => {
  return (
    <div className='w-[70%] bg-orange-50 h-screen'>
      <Header/>
      <Messages/>
      <SendMessage/>
    </div>
  )
}

export default MessageContainer
