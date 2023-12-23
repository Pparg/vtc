import { Router } from "express";

import { index, create, remove, update } from "../../../controllers/admin/roles/roles_controller.mjs";
import validateSchema from "../../../middlewares/validates/index.mjs";

let rolesRouter = Router()


// [GET] /admin/roles/
rolesRouter.get('/', index )

// [POST] /admin/roles
rolesRouter.post('/new', validateSchema('role', true), create)

// [PATCH] /admin/roles/:id
rolesRouter.patch('/:id', update)

// [DELETE] /admin/roles/:id
rolesRouter.delete('/:id', remove)

export default rolesRouter