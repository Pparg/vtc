import { Router } from "express";

import authenticateToken from "../middlewares/authentication/index.mjs";
import hasRight from "../middlewares/authorization/authorizationMiddleware.mjs";

import AuthRouter from "./authentication/authenticationRouter.mjs";
import UserRouter from "./users/usersRouter.mjs";
import RolesRouter from "./roles/rolesRouter.mjs";
import AdressRouter from "./adress/adressRouter.mjs";
import CarsRouter from "./cars/carsRouter.mjs";
import AdminRouter from "./admin/adminRouter.mjs"
import ChofferRouter from "./chofers/chofferRouter.mjs";
import NotificationRouter from "./notification/notificationRouter.mjs";
import AvailabilityRouter from "./availability/availabilityRouter.mjs";

let ApiRouter = Router()

// Authentication
ApiRouter.use('/auth', AuthRouter)

// Users
ApiRouter.use('/users', UserRouter)

// Roles
ApiRouter.use('/roles', authenticateToken, hasRight(['admin']), RolesRouter)

// Adress 
ApiRouter.use('/adress', authenticateToken, AdressRouter )

// Cars
ApiRouter.use('/cars', authenticateToken, CarsRouter)

// Admin

// Notification

ApiRouter.use('/notifications', authenticateToken, NotificationRouter)

// Choffers

ApiRouter.use('/choffers', authenticateToken, ChofferRouter)

ApiRouter.use('/availability', authenticateToken, hasRight(['admin', 'chofer']), AvailabilityRouter)

// ApiRouter.use('/admin', authenticateToken, hasRight(['admin']), AdminRouter)

export default ApiRouter




