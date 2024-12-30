import AuthModel from "../models/user.auth.model.js";
import bcrypt from "bcryptjs"
import { GenerateTokens } from "../utils/GenerateTokens.js";

export const signup = async (req,res) =>{
    try {
        const {FullName, Email, Password, ConfirmPassword} = req.body;
        if(!FullName || !Email || !Password || !ConfirmPassword){
            throw Error({error:"All Fields required"})
        }
        if (Password != ConfirmPassword){
            return res.status(400).json({message:"Passwords do not match"})
        }
        const user = await AuthModel.findOne({Email}) 
        if(user){
            return res.status(400).json({message:"This user already exists"})
        }   
        
        const salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(Password, salt)
       
        const newUser = await AuthModel.create({
            FullName,
            Email,
            Password:HashedPassword,
            ConfirmPassword,
        })
        const Token =  GenerateTokens(newUser._id)
       res.cookie("token", Token,{ maxAge:15*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict", })


    return res.status(200).json({newUser, Token});
    } catch (error) {
        console.log("Error in the Signup Controller", error)
        res.status(500).json(error)

    }
}

export const login = async (req,res) =>{
    
    try {
        const {Email, Password} = req.body; 

        if (!Email || !Password) return res.status(401).json({message:"All fields must be completed"})

        const user = await AuthModel.findOne({Email})
        if(!user) return res.status(401).json({message:"This user does not have an account"})
        
        const isPasswordCorrect =  await bcrypt.compare(Password, user.Password)

        if(isPasswordCorrect) {
        const Token =  GenerateTokens(user._id)

        res.cookie("token", Token,{ maxAge:15*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict", })
        return res.status(200).json({user, Token})
    }
        
    } catch (error) {
        console.log("Error in the Login Controller", error)
        res.status(500).json(error)
    }
}