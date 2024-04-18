import Chofer from "../../models/Chofers.mjs"
import Role from "../../models/Roles.mjs"
import User from "../../models/Users.mjs"

import { generateToken } from "../../utils/jwt/jwtToken.mjs"

import { hashPassword, comparePassword } from "../../utils/security/password.mjs"

// [POST] /api/users/register
let create = async (req, res) => {
  try {
    let hashedPassword = await hashPassword(req.data.password)
    let user_email = req.data.email
    let is_user = await User.findOne({ where: {email: user_email}})
    if (is_user) {
      res.errorResponse(400, [{
        path: ['exists'],
        message: 'Cette adresse email est déjà prise.'
      }])
    } else {
      let is_admin = req.user && (req.user.role === 'admin')
      let role = is_admin ? await Role.findOne({where: {name: req.data.role}}) : await Role.findOne({where: {name: 'user'}})
      if (role) {
        let new_user = await User.create({
          ...req.data,
          password: hashedPassword,
          role_id: role.id
        })
        let token = generateToken({
          id: new_user.id,
          role: role.name
        })
        res.cookie('vtc', token, {
          httpOnly: true,
          sameSite: 'strict'
        })
        let { password, role_id, ...user_info} = new_user.dataValues
        res.successResponse(200, {
          token: token,
          user_data: user_info,
          isAdmin: role.name === 'admin',
          role: role.name
        })
      } else {
        res.errorResponse(400, {message: 'Role inconnue.'})
      }
    }
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

// [DELETE] /api/users
let remove = async (req, res) => {
  try {
    let user = await User.findOne({where: {id: req.params.id}})
    res.successResponse(200, user.dataValues)
    // if (user) {
    //   await user.destroy()
    //   res.clearCookie('vtc')
    //   res.successResponse(201)
    // } else {
    //   res.errorResponse(400, {
    //     message: 'User inexistant.'
    //   })
    // }
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

// [GET] /api/users
let get = async (req, res) => {
  try {
    let page = parseInt(req.query.page || 1);
    let per_page = parseInt(req.query.per_page || 10)
    let offset = (page - 1) * per_page
    let selected_atributes = ['id', 'last_name', 'first_name', 'created_at', 'last_login']
    let users = await User.findAll({
      include: [
        {
          model: Role,
          as: 'user_role',
          where: {name: 'user'}
        }
      ],
      offset: offset,
      limit: per_page,
      attributes: selected_atributes
    })
    let total_count = await User.count()
    let total_pages = Math.ceil(total_count / per_page)
    res.successResponse(200, {
      data: users,
      current_page: page,
      total_pages: total_pages,
      total: total_count
    })
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

// [GET] /api/users/:id
let show = async (req, res) => {
  try {
    let user = await User.findOne({ where: {id: req.user.id}})
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

let admin_show = async (req, res) => {
  try {
    let is_number = parseInt(req.params.id)
    let account
    if (is_number) {
      account = await Chofer.findByPk(req.params.id, {
        attributes: ['created_at', 'first_name', 'last_name', 'email', 'phone_number']
      })
    } else {
      account = await User.findByPk(req.params.id, {
        attributes: ['birthday', 'created_at', 'first_name', 'last_name', 'email', 'last_login', 'phone_number']
      })
    }
    if (account) {
      res.successResponse(200, account.dataValues)
    } else {
      res.errorResponse(400, {
        message: "Cette utilisateur n'existe pas."
      })
    }
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

// [PATCH] /api/users
let edit = async (req, res) => {
  try {
    let account_id = req.user.id
    let account_type = req.user.role
    let current_account = account_type === 'choffer' ? await Chofer.findByPk(account_id) : await User.findByPk(account_id)
    let updated_user = await current_account.update(req.data, {
      fields: ['last_name', 'first_name', 'birthday', 'phone_number', 'newsletter']
    })
    res.successResponse(200, {
      last_name: updated_user.first_name,
      first_name: updated_user.last_name,
      birthday: updated_user.birthday,
      phone_number: updated_user.phone_number,
      newsletter: updated_user.newsletter
    })
    
  } catch (error) {
    res.errorResponse(500, error)
  }
}

// [PATCH] /api/users/password

let edit_password = async (req, res) => {
  try {
    let account_id = req.user.id
    let account_type = req.user.role
    let current_user = account_type === 'chofer' ? await Chofer.findByPk(account_id) : await User.findByPk(account_id)
    let password_is_valid = await comparePassword(req.body.current_password, current_user.password)
    if (password_is_valid) {
      let hashedPassword = await hashPassword(req.data.password)
      current_user.update({password: hashedPassword})
      res.successResponse(201)
    } else {
      res.errorResponse(400, [{
        path: ['base'],
        message: 'Mot de passe incorrecte'
      }])
    }
  } catch (error) {
    res.errorResponse(500, error)
  }
}

export { create, remove, get, show, edit, edit_password, admin_show }