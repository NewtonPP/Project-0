import {Router} from "express"
import { getUser, getUsers, login, signup } from "../controller/Auth.controller.js";
import { ProtectRoute } from "../middleware/AuthMiddleware.js";

export const AuthRouter = Router();

AuthRouter.post("/signup", signup)
AuthRouter.post("/login", login)
AuthRouter.get("/getusers",ProtectRoute, getUsers)
AuthRouter.get("/getuser/:id", ProtectRoute, getUser)
