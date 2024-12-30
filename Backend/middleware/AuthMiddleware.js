import jwt  from "jsonwebtoken"
import AuthModel from "../models/user.auth.model.js"

export const ProtectRoute = async (req,res,next) =>{
    
    try {
        const Token = req.cookies.token
        if(!Token) return res.status(400).json({message:"Invalid Token"})

        const Decoded = jwt.verify(Token, process.env.JWT_SECRET)
        console.log(Decoded)
        const ID = Decoded._id
        const user = await AuthModel.findById(ID)
        if (!user) return res.status(400).json({message:"No user found"})

        req.user = user
        
        next();
    } catch (error) {
        console.log("Error in Middleware", error)
        return res.status(500).json({error:"Internal Server Error "})
    }
}