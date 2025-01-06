import React, { useContext, useState } from "react";
import { MessageDataContext } from "../../context/MEssageContext";
import { SocketDataContext } from "../../context/SocketContext";
import axios from "axios";

import { LuSend } from "react-icons/lu";

const SendMessage = () => {
  const { ToUser, Messages, setMessage } = useContext(MessageDataContext);
  const { Socket } = useContext(SocketDataContext);
  const [Message, setToSend] = useState("");

  const HandleSend = async () => {
    if (!Message.trim()) return; // Prevent sending empty messages

    try {
      // Send message to the server
      await axios.post(
        `http://localhost:3000/message/sendmessage/${ToUser}`,
        { Message },
        { withCredentials: true }
      );

      setToSend("");

      // Update local Messages state
      setMessage((prev) => [
        ...prev,
        { From: "currentUserId", To: ToUser, Message }, // Replace `currentUserId` appropriately
      ]);

      // Emit the new message via Socket
      if (Socket) {
        Socket.emit("newMessage", { message: Message, toUser: ToUser });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <input
        className="w-[70%] h-10 rounded-full px-4 text-lg font-medium border border-gray-300 focus:outline-none focus:border-cyan-500"
        onChange={(e) => setToSend(e.target.value)}
        value={Message}
        placeholder={ToUser ? `Message` : "Select a user to start chatting"}
      />
      <button
        className="bg-cyan-700 h-10 w-10 flex items-center justify-center rounded-full hover:bg-cyan-800 transition"
        onClick={HandleSend}
      >
        <LuSend className="text-white text-xl" />
      </button>
    </div>
  );
};

export default SendMessage;
