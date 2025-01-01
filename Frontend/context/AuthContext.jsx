import React, { createContext, useState } from 'react'

export const AuthDataContext = createContext();
const AuthContext = ({children}) => {
    const [AuthData, setAuthData] = useState(JSON.parse(localStorage.getItem("ChatUser")) || null);

  return (
    <div>
      <AuthDataContext.Provider value={{AuthData, setAuthData}}>
        {children}
      </AuthDataContext.Provider>
    </div>
  )
}

export default AuthContext
