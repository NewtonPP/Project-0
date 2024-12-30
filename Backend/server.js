import express from "express"
import { Server } from "socket.io";
import http from "http"
import cors from "cors"
import dotenv from "dotenv"
import { AuthRouter } from "./routes/auth.route.js";
import { ConnectToDB } from "./Database/mongo.js";
import { MessageRouter } from "./routes/message.route.js";
import cookieParser from "cookie-parser";
dotenv.config()
const app = express();

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/auth",AuthRouter)
app.use("/message", MessageRouter)

const server = http.createServer(app);
const io = new Server(server)

const PORT = process.env.PORT || 4000

ConnectToDB();
server.listen(PORT, ()=>{
    console.log(`Connected to server at PORT ${PORT}`)
})

