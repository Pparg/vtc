import { Router } from "express";

import { login, logout, createAccount } from "../controllers/auth_controller.mjs";

let router = Router()

// Authentification
router.get('/login', login )
router.get('/logout', logout)
router.post('/new_account', createAccount )

// Api

// Admin

// Chofer


export default router