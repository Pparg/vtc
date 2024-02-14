import { Router } from "express";

import authenticateToken from "../middlewares/authentication/index.mjs";
import hasRight from "../middlewares/authorization/authorizationMiddleware.mjs";

import AuthRouter from "./authentication/authenticationRouter.mjs";
import UserRouter from "./users/usersRouter.mjs";
import RolesRouter from "./roles/rolesRouter.mjs";
import AdressRouter from "./adress/adressRouter.mjs";



let ApiRouter = Router()

// Authentication
ApiRouter.use('/auth', AuthRouter)

// Users
ApiRouter.use('/users', UserRouter)

// Roles
ApiRouter.use('/roles', authenticateToken, hasRight(['admin']), RolesRouter)

// Adress 
ApiRouter.use('/adress', authenticateToken, AdressRouter )

export default ApiRouter




