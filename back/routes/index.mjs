import { Router } from "express";
import UserRouter from "./users/userrouter.mjs";

let router = Router()

router.use('/users', UserRouter)

export default router