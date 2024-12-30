import {Router} from "express"
import { login, signup } from "../controller/Auth.controller.js";

export const AuthRouter = Router();

AuthRouter.post("/signup", signup)
AuthRouter.post("/login", login)

