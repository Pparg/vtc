import { Router } from "express";
import validateSchema from "../../middlewares/validates/body.mjs";
import hasRight from "../../middlewares/authorization/authorizationMiddleware.mjs";

import { get, show, edit, create, remove } from '../../controllers/cars/cars_controller.mjs'

let CarsRouter = Router()

CarsRouter.get('/', get)

CarsRouter.get('/:id', hasRight(['admin']), show)

CarsRouter.post('/', hasRight(['admin']), validateSchema('car'), create)

CarsRouter.patch('/:id', hasRight(['admin']), validateSchema('car', true), edit)

CarsRouter.delete('/:id', hasRight(['admin']), remove)

export default CarsRouter