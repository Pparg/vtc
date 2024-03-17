import { Router } from 'express'
import hasRight from '../../middlewares/authorization/authorizationMiddleware.mjs'

import { get, create, edit, edit_password, remove, show} from '../../controllers/chofers/choffer_controller.mjs'
import validateSchema from '../../middlewares/validates/body.mjs'

let ChofferRouter = Router()

ChofferRouter.get('/', hasRight(['admin']), get)

ChofferRouter.get('/:chofer_id', show)

ChofferRouter.post('/', hasRight(['admin']), validateSchema('chofer') , create)

ChofferRouter.patch('/:chofer_id', hasRight(['admin', 'chofer']), validateSchema('chofer', true), edit)

ChofferRouter.patch('/passwoard', hasRight(['chofer']), edit_password)

ChofferRouter.delete('/:chofer_id', hasRight(['admin']), remove)

export default ChofferRouter