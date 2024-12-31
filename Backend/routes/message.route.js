import {Router} from "express"
import { GetMessage, SendMessage } from "../controller/message.controller.js";
import { ProtectRoute } from "../middleware/AuthMiddleware.js";

export const MessageRouter = Router();

MessageRouter.post("/sendmessage/:id",ProtectRoute, SendMessage)
MessageRouter.get("/getmessage/:id", ProtectRoute, GetMessage)