import { Router } from "express";

import { login, logout, createAccount } from "../controllers/auth_controller.mjs";
import validateSchema from "../middlewares/validates/index.mjs";

let router = Router()

// Authentification
router.get('/login', login )
router.get('/logout', logout)
router.post('/new_account', validateSchema('user', true) ,createAccount )

// Api

// Admin

// Chofer


export default router