import React, { createContext, useState } from 'react'


export const MessageDataContext = createContext();
const MessageContext = ({children}) => {


    const [Messages,setMessage] = useState();
    const [ToUser, setToUser] = useState();
    const [selectedUser, setSelectedUser] = useState();


  return (
    <div>
      <MessageDataContext.Provider value={{Messages, setMessage, ToUser, setToUser, selectedUser, setSelectedUser}}>
        {children}
      </MessageDataContext.Provider>
    </div>
  )
}

export default MessageContext
