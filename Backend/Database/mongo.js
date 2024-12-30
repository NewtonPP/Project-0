import mongoose from "mongoose";

export  const ConnectToDB = async () =>{
    try {
       const isConnected = await mongoose.connect("mongodb://localhost:27017/porject0")
       if (isConnected) console.log("Successfull Connection with the database")
    } catch (error) {
        console.log("Error Connecting with the database", error)
    }
}