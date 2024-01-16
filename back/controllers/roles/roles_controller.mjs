import Role from "../../models/Roles.mjs"


// [GET] /roles
let index = async (req, res) => {
  try {
    let roles = await Role.findAll()
    res.successResponse(200, roles)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

// [POST] /roles
let create = async (req, res) => {
  try {
    let new_role = await Role.create(req.data)
    res.successResponse(200, new_role)
  } catch (error) {
    res.errorResponse(400, error.errors)
  }
}

// [DELETE] /roles/:id
let remove = async (req, res) => {
  try {
    let role_id = req.params.id
    let role_to_delete = await Role.findByPk(role_id)
    if (role_to_delete) {
      await role_to_delete.destroy()
      res.successResponse(201)
    } else {
      res.errorResponse(400, {
        message: 'Rôle invalide.'
      })
    }
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

// [PATCH] /roles/:id
let update = (req, res) => {
  try {
    
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

export {
  index,
  create,
  remove,
  update
}