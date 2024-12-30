import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
    From: {
       type: mongoose.Schema.Types.ObjectId,
       ref:"Auth"
    },
    To: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Auth"
     },
     Message:{
        type:String
     }
},{timeStamps:true})

const MessageModel = mongoose.model("Message", MessageSchema)

export default MessageModel