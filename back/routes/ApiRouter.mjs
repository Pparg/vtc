import { Router } from "express";

import AuthRouter from "./authentication/authenticationRouter.mjs";
import UserRouter from "./users/usersRouter.mjs";

let ApiRouter = Router()

// Authentication
ApiRouter.use('/auth', AuthRouter)

// Users
ApiRouter.use('/users', UserRouter)

export default ApiRouter


let test = []


