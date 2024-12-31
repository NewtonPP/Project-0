import mongoose from "mongoose";

const ConversationSchema = mongoose.Schema({
    Participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
    ],
    Messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        defaut:[],
    }]
}, {timeStamps:true})

export default mongoose.model("Conversation", ConversationSchema)