import React, { useContext, useEffect, useState } from "react";
import { MessageDataContext } from "../../context/MessageContext";
import { AuthDataContext } from "../../context/AuthContext";
import { SocketDataContext } from "../../context/SocketContext";
import axios from "axios";

const Messages = () => {
  const { ToUser, Messages, setMessage } = useContext(MessageDataContext);
  const { AuthData } = useContext(AuthDataContext);
  const { Socket } = useContext(SocketDataContext);
  // const [Messages, setMessages] = useState([]);

  // Fetch messages when ToUser changes
  useEffect(() => {
    if (ToUser) {
      axios
        .get(`http://localhost:3000/message/getmessage/${ToUser}`, {
          withCredentials: true,
        })
        .then((response) => {
          setMessage(response.data.Messages);
        })
        .catch(() => setMessage([]));
    }
  }, [ToUser, Messages]);

  // Register socket listener for new messages
  useEffect(() => {
    if (Socket) {
      const handleNewMessage = (newMessage) => {
        setMessage((prevMessages) => [...prevMessages, newMessage]);
      };

      Socket.on("newMessage", handleNewMessage);

      // Cleanup to prevent multiple listeners
      return () => {
        Socket.off("newMessage", handleNewMessage);
      };
    }
  }, [Socket]);

  return (
    <div className="h-[90%] w-full bg-red-600">
      {Messages?.map((message) => (
        <div
          key={message._id}
          className={
            message.From === ToUser
              ? "ml-4"
              : "flex justify-end mr-4"
          }
        >
          <div >{message.Message}</div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
