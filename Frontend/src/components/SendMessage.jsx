import React, { useContext, useState } from "react";
import { MessageDataContext } from "../../context/MEssageContext";
import { SocketDataContext } from "../../context/SocketContext";
import axios from "axios";

import { LuSend } from "react-icons/lu";

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
    <div className="flex justify-center items-center gap-2 ">
      <input
        className="w-[70%] h-10 rounded-full px-4 text-lg font-semibold"
        onChange={(e) => setToSend(e.target.value)}
        value={Message}
        placeholder="Type a text"
      />
      <button className="bg-cyan-700 h-10 w-10 flex items-center justify-center rounded-full" onClick={HandleSend}>
      <LuSend className="text-white text-xl"/>
      </button>
    </div>
  );
};

export default SendMessage;
