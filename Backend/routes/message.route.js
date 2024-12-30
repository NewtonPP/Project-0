import {Router} from "express"
import { SendMessage } from "../controller/message.controller.js";
import { ProtectRoute } from "../middleware/AuthMiddleware.js";

export const MessageRouter = Router();

MessageRouter.post("/sendmessage/:id",ProtectRoute, SendMessage)