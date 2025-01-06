import mongoose from "mongoose";

const BlackListedSchema = mongoose.Schema({
    token:{
        type:String
    }
})

export default mongoose.model("BlacklistedToken", BlackListedSchema)