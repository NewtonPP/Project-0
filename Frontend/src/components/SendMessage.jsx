import React, { useContext, useState } from "react";
import { MessageDataContext } from "../../context/MessageContext";
import { SocketDataContext } from "../../context/SocketContext";
import axios from "axios";

const SendMessage = () => {
  const { ToUser,Messages,setMessage } = useContext(MessageDataContext);
  const { Socket } = useContext(SocketDataContext);
  const [Message, setToSend] = useState('')


  const HandleSend = async () => {
    try {
      // Send message to the server
      await axios.post(`http://localhost:3000/message/sendmessage/${ToUser}`,{Message} , { withCredentials: true });

      // Clear the input field
      setToSend("");

      setMessage((prev)=>([...prev, Message]))
      if (Socket) {
        Socket.emit("newMessage", { message: Message, toUser: ToUser });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <input
        className="w-[70%] h-8"
        onChange={(e) => setToSend(e.target.value)}
        value={Message}
      />
      <button className="bg-green-400 h-8 w-14" onClick={HandleSend}>
        Send
      </button>
    </div>
  );
};

export default SendMessage;
