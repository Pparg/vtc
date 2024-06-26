import { Router } from "express";

import authenticateToken from "../middlewares/authentication/index.mjs";
import hasRight from "../middlewares/authorization/authorizationMiddleware.mjs";

import AuthRouter from "./authentication/authenticationRouter.mjs";
import UserRouter from "./users/usersRouter.mjs";
import RolesRouter from "./roles/rolesRouter.mjs";
import AdressRouter from "./adress/adressRouter.mjs";
import CarsRouter from "./cars/carsRouter.mjs";
import ChofferRouter from "./chofers/chofferRouter.mjs";
import NotificationRouter from "./notification/notificationRouter.mjs";
import AvailabilityRouter from "./availability/availabilityRouter.mjs";
import RideRouter from "./rides/rideRouter.mjs";

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

// Notification
ApiRouter.use('/notifications', authenticateToken, NotificationRouter)

// Choffers
ApiRouter.use('/choffers', authenticateToken, ChofferRouter)

// Availability
ApiRouter.use('/availability', authenticateToken, hasRight(['admin', 'chofer']), AvailabilityRouter)

// Rides
ApiRouter.use('/rides', authenticateToken, RideRouter)

export default ApiRouter




