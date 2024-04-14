import { Router } from "express";

import validateSchema from "../../middlewares/validates/body.mjs";
import { get, create, edit, remove, show} from '../../controllers/rides/rides_controller.mjs'


let RideRouter = Router()

RideRouter.get('/', get)
RideRouter.get('/:ride_id', show)
RideRouter.post('/', validateSchema('ride'), create)
RideRouter.patch('/:ride_id', validateSchema('ride', true), edit)
RideRouter.delete('/:ride_id', remove)

export default RideRouter