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

  // Fetch messages when ToUser changes
  useEffect(() => {
    if (ToUser) {
      axios
        .get(`http://localhost:3000/message/getmessage/${ToUser}`, {
          withCredentials: true,
        })
        .then((response) => {
          setMessage(response.data.Messages || []);
        })
        .catch(() => setMessage([]));
    }
  }, [ToUser, Messages]);

  // Register socket listener for new messages
  useEffect(() => {
    if (Socket) {
      const handleNewMessage = (newMessage) => {
        setMessage((prevMessages) => ([...prevMessages, newMessage]));
      };

      Socket.on("newMessage", handleNewMessage);

      return () => {
        Socket.off("newMessage", handleNewMessage);
      };
    }
  }, [Socket]);

  return (
    <div className="h-[89.8%] w-full overflow-y-auto">
      {Messages?.length > 0 ? (
        Messages.map((message) => (
          <div
            key={message._id}
            className={message.From === ToUser ? "my-6" : "flex justify-end m-3 "}
          >
            <div className="flex  items-center">
            <CiUser className="text-2xl mx-2 "/>
            <p className="bg-white inline p-2 px-3 rounded-2xl font-semibold">{message.Message}</p>
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
