import React, { useContext, useEffect } from "react";
import { MessageDataContext } from "../../context/MEssageContext";
import { AuthDataContext } from "../../context/AuthContext";
import { SocketDataContext } from "../../context/SocketContext";
import axios from "axios";

import { CiUser } from "react-icons/ci";

const Messages = () => {
  const { ToUser, Messages, setMessage } = useContext(MessageDataContext);
  const { AuthData } = useContext(AuthDataContext);
  const { Socket } = useContext(SocketDataContext);

  useEffect(() => {
    if (!ToUser) {
      setMessage([]);
      return;
    }

    axios
      .get(`http://localhost:3000/message/getmessage/${ToUser}`, {
        withCredentials: true,
      })
      .then((response) => {
        const newMessages = response.data?.Messages || [];
        setMessage(newMessages);
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error);
        setMessage([]);
      });
  }, [ToUser, setMessage]);

  useEffect(() => {
    if (Socket) {
      const handleNewMessage = (newMessage) => {
        setMessage((prevMessages) => [...prevMessages, newMessage]);
      };

      Socket.on("newMessage", handleNewMessage);

      return () => {
        Socket.off("newMessage", handleNewMessage);
      };
    }
  }, [Socket, setMessage]);

  return (
    <div className="h-[80.8%] w-full overflow-y-auto">
      {Messages?.length > 0 ? (
        Messages.map((message, index) => (
          <div
            key={message._id || index}
            className={message.From === ToUser ? "my-6" : "flex justify-end m-3"}
          >
            <div className="flex items-center">
              <CiUser className="text-2xl mx-2" />
              <p className="bg-white inline p-2 px-3 rounded-2xl font-semibold">
                {message.Message}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p className="text-gray-500 text-center text-lg">No messages to display.</p>
          <p className="text-gray-500 text-center text-lg">Start a conversation</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
