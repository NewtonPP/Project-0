import React from 'react'
import Messages from './Messages'
import SendMessage from './SendMessage'

const MessageContainer = () => {
  return (
    <div className='w-[70%] bg-blue-600 h-screen'>
      <Messages/>
      <SendMessage/>
    </div>
  )
}

export default MessageContainer
