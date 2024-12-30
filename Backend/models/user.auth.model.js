import mongoose from "mongoose"

const AuthSchema = new mongoose.Schema({
    FullName:{
        required: true, 
        type: String,
    },
    Email:{
        required: true,
        unique: true,
        type: String,
    },
    Password:{
        required: true, 
        type: String,
    },
})


const AuthModel = mongoose.model("Auth", AuthSchema)
export default AuthModel