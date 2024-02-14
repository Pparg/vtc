import { Router } from 'express'

import valideSchema from '../../middlewares/validates/body.mjs'
import { login, logout, maintain_session } from '../../controllers/auth_controller.mjs'

let AuthRouter = Router()

AuthRouter.post('/login', valideSchema('login'), login)

AuthRouter.get('/logout', logout)

AuthRouter.get('/session', maintain_session)

export default AuthRouter

