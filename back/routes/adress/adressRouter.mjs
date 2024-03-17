import { Router } from "express";
import validateSchema from "../../middlewares/validates/body.mjs";
import validateParams from "../../middlewares/validates/params.mjs";

import { create, index, show, update, remove } from "../../controllers/adress/adress_controller.mjs";

let AdressRouter = Router()

AdressRouter.get('/', index)

AdressRouter.get('/:id', show)

AdressRouter.post('/', validateSchema('address'), create)

AdressRouter.patch('/:id', validateSchema('address', true), update)

AdressRouter.delete('/:id', remove)

export default AdressRouter