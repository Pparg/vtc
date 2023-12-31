import Role from "../../models/Roles.mjs"
import User from "../../models/Users.mjs"

import { hashPassword, comparePassword } from "../../utils/security/password.mjs"

// [POST] /api/users/register
let create = async (req, res) => {
  let hashedPassword = await hashPassword(req.data.password)
  try {
    let user_email = req.data.email
    let is_user = await User.findOne({ where: {email: user_email}})
    if (is_user) {
      res.errorResponse(400, {
        message: 'Ce compte existe déjà.'
      })
    } else {
      let new_user = await User.create({
        ...req.data,
        password: hashedPassword
      })
      let {user_info, password} = new_user
      res.successResponse(200, user_info)
    }
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

// [DELETE] /api/users/:id
let remove = async (req, res) => {
  try {
    let user = await User.findOne({where: {id: req.params.id}})
    if (user) {
      await user.destroy()
      res.successResponse(201)
    } else {
      res.errorResponse(400, {
        message: 'User inexistant.'
      })
    }
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

// [GET] /api/users
let get = async (req, res) => {
  try {
    let users = await User.findAll()
    res.successResponse(200, users)
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

// [GET] /api/users/:id
let show = async (req, res) => {
  try {
    let user = await User.findOne({ where: {id: req.params.id}})
    if (user) {
      res.successResponse(200, user)
    } else {
      res.errorResponse(400, {
        message: 'User inexistant'
      })
    }
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

// [PATCH] /api/users/:id
let edit = async (req, res) => {
  res.successResponse(200, 'edit')
}

export { create, remove, get, show, edit }