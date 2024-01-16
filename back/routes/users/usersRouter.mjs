import { Router } from 'express'

import { create, remove, get, show, edit } from '../../controllers/users/users_controller.mjs'
import validateSchema from '../../middlewares/validates/body.mjs'
import validateParams from '../../middlewares/validates/params.mjs'
import authenticateToken from '../../middlewares/authentication/index.mjs'
import hasRight from '../../middlewares/authorization/authorizationMiddleware.mjs'

let UserRouter = Router()

UserRouter.get('/', hasRight(['admin']), get)

UserRouter.get('/:id',authenticateToken, show)

UserRouter.post('/register', validateSchema('user'), create)

UserRouter.patch('/:id', validateParams('id', 'string'), authenticateToken, validateSchema('user', true), edit)

UserRouter.delete('/:id', validateParams('id', 'string'), authenticateToken, remove)

export default UserRouter