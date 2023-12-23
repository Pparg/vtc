import { Router } from "express";

import { login, logout, createAccount } from "../controllers/auth_controller.mjs";
import validateSchema from "../middlewares/validates/index.mjs";

import adminRouter from './admin/index.mjs'

let router = Router()

// Authentification

// [GET] /login
router.get('/login', login )

// [GET] /logout
router.get('/logout', logout)

// [POST] /new_account
router.post('/new_account', validateSchema('user', true) ,createAccount )

// Api

// Admin

// 
router.use('/admin', adminRouter)


// Chofer


export default router