import { Router } from "express";

import validateSchema from "../../middlewares/validates/body.mjs";
import { get, create, edit, remove, show, chofer_get} from '../../controllers/rides/rides_controller.mjs'
import hasRight from "../../middlewares/authorization/authorizationMiddleware.mjs";

let RideRouter = Router()

RideRouter.get('/chofer', hasRight(['admin', 'chofer']), chofer_get)

RideRouter.get('/', hasRight(['admin', 'user', 'chofer']), get)
RideRouter.get('/:ride_id', hasRight(['admin', 'user']), show)
RideRouter.post('/', hasRight(['admin', 'user']),validateSchema('ride'), create)
RideRouter.patch('/:ride_id', hasRight(['admin', 'user']), validateSchema('ride', true), edit)
RideRouter.delete('/:ride_id', hasRight(['admin', 'user']),remove)
export default RideRouter