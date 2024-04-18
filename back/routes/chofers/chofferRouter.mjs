import { Router } from 'express'
import hasRight from '../../middlewares/authorization/authorizationMiddleware.mjs'

import { get, create, remove} from '../../controllers/chofers/choffer_controller.mjs'
import validateSchema from '../../middlewares/validates/body.mjs'

let ChofferRouter = Router()

ChofferRouter.get('/', hasRight(['admin']), get)

ChofferRouter.post('/', hasRight(['admin']), validateSchema('chofer') , create)

ChofferRouter.delete('/:chofer_id', hasRight(['admin']), remove)

export default ChofferRouter