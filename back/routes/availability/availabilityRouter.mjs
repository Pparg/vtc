import { Router } from "express";

import hasRight from "../../middlewares/authorization/authorizationMiddleware.mjs";
import validateSchema from "../../middlewares/validates/body.mjs";

import { index, create, remove, show, update } from "../../controllers/availability/availability_controller.mjs";

let AvailabilityRouter = Router()

AvailabilityRouter.get('/', index)

AvailabilityRouter.get('/:availabity_id', show)

AvailabilityRouter.post('/', validateSchema('availability'), create)

AvailabilityRouter.patch('/:availability_id', validateSchema('availability', true), update)

AvailabilityRouter.delete('/:availability_id', remove)

export default AvailabilityRouter