import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import AuthContext from '../context/AuthContext.jsx'
import MessageContext from '../context/MessageContext.jsx'
import SocketContext from '../context/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContext>
    <MessageContext>
    <SocketContext>
    <App />
    </SocketContext>
    </MessageContext>
    </AuthContext>
    </BrowserRouter>
  </React.StrictMode>,
)
