import { Router } from "express";
import validateSchema from "../../middlewares/validates/body.mjs";
import validateParams from "../../middlewares/validates/params.mjs";

import { create, index, show, update, remove } from "../../controllers/adress/adress_controller.mjs";

let AdressRouter = Router()

AdressRouter.get('/', index)

AdressRouter.get('/:id', validateParams('id', 'int'), show)

AdressRouter.post('/', validateSchema('adress'), create)

AdressRouter.patch('/:id', validateParams('id', 'int'), validateSchema('adress', true), update)

AdressRouter.delete('/:id', validateParams('id', 'int'), remove)

export default AdressRouter