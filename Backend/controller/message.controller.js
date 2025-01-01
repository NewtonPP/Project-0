import conversationModel from "../models/conversation.model.js";
import MessageModel from "../models/message.model.js";
import { getIO } from "../socket.js";
import { getReceiverSocketId } from "../socket.js";

export const SendMessage = async (req,res) =>{

    try {
        const io = getIO(); // Get the initialized `io` instance
        const ToUser = req.params;

        const FromUser = req.user._id;
        const {Message} = req.body

        let  conversation = await conversationModel.findOne({Participants:{
            $all:[ToUser.id, FromUser]
        }})
         
        if(!conversation){
            conversation = await conversationModel.create({
                Participants:[ToUser.id, FromUser],
            })
        }
        const NewMessage = await MessageModel.create({
            To:ToUser.id,
            From:FromUser,
            Message:Message
        })
       
        if(NewMessage){
        conversation.Messages.push(NewMessage._id)
        }
        await conversation.save()

        const receiverSocketId = getReceiverSocketId(ToUser.id);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", NewMessage)
        }
        res.status(200).json(NewMessage)
    } catch (error) {   
        console.log("Error in the Send Message controller", error)
        return res.status(500).json({error:"Internal Server Error"})
    }
} 


export const GetMessage = async (req,res) =>{
    try {
        const FromUser = req.user._id;
        const ToUser = req.params;

        const conversation = await conversationModel.findOne({Participants:{
            $all:[FromUser._id, ToUser.id]
        }}).populate("Messages")
  
        if(!conversation) return res.status(400).json({message:"Could not find the  conversation"})

        return res.status(200).json(conversation)
    } catch (error) {
        console.log("Error in the GetMessage controller",error)
        res.status(500).json({error:"Internal Server Error"})
    }
}