import { Router } from "express";

import validateSchema from "../../middlewares/validates/body.mjs";

import { index, create, remove, show, update } from "../../controllers/availability/availability_controller.mjs";

let AvailabilityRouter = Router()

AvailabilityRouter.get('/', index)

AvailabilityRouter.get('/:availability_id', show)

AvailabilityRouter.post('/', validateSchema('availability'), create)

AvailabilityRouter.patch('/', validateSchema('time_range'), update)

AvailabilityRouter.delete('/:id', remove)

export default AvailabilityRouter