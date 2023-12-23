import { NEVER } from 'zod'
import Role from '../../../models/Roles.mjs'


// [GET] /admin/roles
let index = async (req, res) => {
  try {
    let roles = await Role.findAll()
    res.status(200).json({
      success: true,
      data: roles
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: error.message
    })
  }
}

// [POST] /admin/roles
let create = async (req, res) => {
  try {
    let new_role = await Role.create(req.body)
    res.status(201).json({
      success: true,
      data: new_role
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      errors: error.errors
    })
  }
  
}

// [DELETE] /admin/roles/:id
let remove = async (req, res) => {
  try {
    let role_id = req.params.id
    let role_to_delete = await Role.findByPk(role_id)
    if (role_to_delete) {
      await role_to_delete.destroy()
      res.status(200).json({
        success: true
      })
    } else {
      res.status(400).json({
        success: false,
        errors: [
          {
            controller: 'roles_controller',
            message: 'Rôle non trouvé.'
          }
        ]
      })
    }
  } catch (error) {
    res.status(500).json({
      errors: error.message
    })
  }
}

// [PATCH] /admin/roles/:id
let update = (req, res) => {
  try {
    
  } catch (error) {
    res.status(500).json({
      errors: error.message
    })
  }
}

export {
  index,
  create,
  remove,
  update
}