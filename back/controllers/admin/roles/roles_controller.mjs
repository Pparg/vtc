import { NEVER } from 'zod'
import Role from '../../../models/Roles.mjs'


// [GET] /admin/roles
let index = async (req, res) => {
  let roles = await Role.findAll()
  console.log(roles)
  res.send(roles)
}

// [GET] /admin/roles/:id
let show = (req, res) => {

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
      error: error.errors
    })
  }
  
}

// [DELETE] /admin/roles/:id
let remove = (req, res) => {

}

// [PATCH] /admin/roles/:id
let update = (req, res) => {

}

export {
  index,
  show,
  create,
  remove,
  update
}