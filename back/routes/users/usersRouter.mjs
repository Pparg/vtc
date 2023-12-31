import { Router } from 'express'

import { create, remove, get, show, edit } from '../../controllers/users/users_controller.mjs'
import validateSchema from '../../middlewares/validates/body.mjs'
import validateParams from '../../middlewares/validates/params.mjs'

let UserRouter = Router()

UserRouter.get('/', get)

UserRouter.get('/:id', show)

UserRouter.post('/register', validateSchema('user'), create)

UserRouter.patch('/:id', edit)

UserRouter.delete('/:id', validateParams('id', 'string'), remove)

export default UserRouter