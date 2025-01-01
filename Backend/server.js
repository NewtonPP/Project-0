import express from "express"
import { Server } from "socket.io";
import http from "http"
import cors from "cors"
import dotenv from "dotenv"
import { AuthRouter } from "./routes/auth.route.js";
import { ConnectToDB } from "./Database/mongo.js";
import { MessageRouter } from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import { InitializeSocket } from "./socket.js";
dotenv.config()
const app = express();

app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    credentials: true,  
}))
app.use(express.json())
app.use(cookieParser())
app.use("/auth",AuthRouter)
app.use("/message", MessageRouter)

const server = http.createServer(app);

const PORT = process.env.PORT || 4000
InitializeSocket(server)
ConnectToDB();
server.listen(PORT, ()=>{
    console.log(`Connected to server at PORT ${PORT}`)
})

