import jwt from "jsonwebtoken"

export const GenerateTokens =  ({_id}) =>{
        const Token = jwt.sign({_id}, process.env.JWT_SECRET,{
            expiresIn:"2 days"
        })

         if (!Token){
         throw Error({error:"No token Generated"})
         }
  
        return Token

}