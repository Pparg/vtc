import { Router } from "express";

import { index, create, update, remove } from "../../controllers/roles/roles_controller.mjs";
import validateParams from "../../middlewares/validates/params.mjs";
import validateSchema from "../../middlewares/validates/body.mjs";
import hasRight from "../../middlewares/authorization/authorizationMiddleware.mjs";

let RolesRouter = Router()


// [GET] /roles
RolesRouter.get('/', index )

// [POST] /roles
RolesRouter.post('/', validateSchema('role'), create)

// [PATCH] /roles/:id
RolesRouter.patch('/:id', validateParams('id', 'int'), update)

// [DELETE] /roles/:id
RolesRouter.delete('/:id', validateParams('id', 'int'), remove)

export default RolesRouter