import { Router } from "express";

import rolesRouter from "./roles/rolesRouter.mjs";


let adminRouter = Router()

adminRouter.use('/roles', rolesRouter)

export default adminRouter
