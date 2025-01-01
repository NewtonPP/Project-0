import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AuthDataContext } from './AuthContext';

export const SocketDataContext = createContext();

const SocketContext = ({ children }) => {
  const { AuthData } = useContext(AuthDataContext);
  const [Socket, setSocket] = useState(null);

  useEffect(() => {
    if (AuthData) {
      const socket = io('http://localhost:3000', {
        withCredentials: true,
        query: {
          userId: AuthData._id,
        },
      });

      setSocket(socket);

      // Cleanup function to close socket connection when component unmounts
      return () => {
        socket.close();
      };
    }
  }, [AuthData]); // Dependency array to ensure it runs only when AuthData changes

  return (
    <SocketDataContext.Provider value={{ Socket }}>
      {children}
    </SocketDataContext.Provider>
  );
};

export default SocketContext;
