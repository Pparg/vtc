import { Router } from "express";

import { index, create, remove, update } from "../../../controllers/admin/roles/roles_controller.mjs";
import validateParams from "../../../middlewares/validates/params.mjs";
import validateSchema from "../../../middlewares/validates/body.mjs"

let rolesRouter = Router()


// [GET] /admin/roles/
rolesRouter.get('/', index )

// [POST] /admin/roles
rolesRouter.post('/new', validateSchema('role', true), create)

// [PATCH] /admin/roles/:id
rolesRouter.patch('/:id', validateParams('id', 'int'), update)

// [DELETE] /admin/roles/:id
rolesRouter.delete('/:id', validateParams('id', 'int'), remove)

export default rolesRouter