import MessageModel from "../models/message.model.js";

export const SendMessage = async (req,res) =>{
    try {
        const ToUser = req.params;

        const FromUser = req.user._id;
     

        const Message = req.body

       const NewMessage = MessageModel.create({
            To:ToUser.id,
            From:FromUser,
            Message:Message.message
        })
        res.status(200).json(NewMessage)
    } catch (error) {
        console.log("Error in the Send Message controller", error)
        return res.status(500).json({error:"Internal Server Error"})
    }
} 