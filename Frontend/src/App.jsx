import { useContext, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { AuthDataContext } from '../context/AuthContext'
import ChatPage from './pages/ChatPage'
function App() {
  const {AuthData, setAuthData} = useContext(AuthDataContext)

  return (
    <>
      <Routes>
        <Route path='/' element={AuthData ? <Navigate to={`/chat`}/>:<HomePage/>}></Route>
        <Route path='/login' element={AuthData ?<Navigate to={`/chat`}/>: <Login/>}></Route>
        <Route path='/signup' element={AuthData ?<Navigate to={`/chat`}/>:<Signup/>}></Route> 
        <Route path='/chat' element={AuthData ?<ChatPage/> : <Navigate to={"/"}/>}/>
      </Routes>
    </>
  )
}

export default App
