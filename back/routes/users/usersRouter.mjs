import { Router } from 'express'

import { create, remove, get, show, edit, edit_password, admin_show } from '../../controllers/users/users_controller.mjs'
import validateSchema from '../../middlewares/validates/body.mjs'
import validateParams from '../../middlewares/validates/params.mjs'
import authenticateToken from '../../middlewares/authentication/index.mjs'
import hasRight from '../../middlewares/authorization/authorizationMiddleware.mjs'

let UserRouter = Router()

UserRouter.get('/',authenticateToken, hasRight(['admin']), get)

UserRouter.get('/:id',authenticateToken, show)

UserRouter.post('/register', validateSchema('user'), create)

UserRouter.patch('/', authenticateToken, validateSchema('user', true), edit)

UserRouter.patch('/password', authenticateToken, validateSchema('user', true), edit_password )

UserRouter.delete('/:id', validateParams('id', 'string'), authenticateToken, remove)

UserRouter.get('/admin/:id', authenticateToken, hasRight(['admin']), admin_show)

export default UserRouter