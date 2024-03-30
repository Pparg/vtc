import Role from "../models/Roles.mjs"
import User from "../models/Users.mjs"
import Chofer from "../models/Chofers.mjs"

import jwt from 'jsonwebtoken'
import { authenticateAccount } from "../utils/authentication/authUser.mjs"
import { generateToken } from "../utils/jwt/jwtToken.mjs"

// [POST] api/auth/login
let login = async (req, res) => {
  console.log(req.query)
  let authUser = await authenticateAccount(req.data.email, req.data.password, req.query)
  if (authUser.success) {
    console.log(authUser)
    let token = generateToken({
      id: authUser.id,
      role: authUser.name
    })
    res.cookie('vtc', token, {
      httpOnly: true,
      sameSite: 'strict',
    })
    res.successResponse(200, {
      token: token,
      user_data: authUser.data,
      role: authUser.role,
      isAdmin: authUser.role === 'admin'
    })
  } else {
    res.errorResponse(400, authUser)
  }
}

// [GET] api/auth/logout
let logout = (req, res) => {
  res.clearCookie('vtc')
  res.successResponse(201)
}
// [GET] api/auth/initialize
let maintain_session = (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.errorResponse(401, 'Token non fourni')
    }
    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
      if (err) {
        return res.errorResponse(403, 'Token invalide')
      } else {
        let account_id = user.id
        let current_account
        if (Number(account_id)) {
          current_account = await Chofer.findByPk(account_id)
        } else {
          current_account = await User.findByPk(account_id)
        }
        if (current_account) {
          let {password, role_id, ...user_info} = current_account.dataValues
          res.cookie('vtc', token, {
            httpOnly: true,
            sameSite: 'strict',
          })
          return res.successResponse(200, {
            user_data: user_info,
            isAdmin: user.role === 'admin',
            role: user.role
          })
        } else {
          return res.errorResponse(404, 'Invalid')
        }
      }
    })
  } catch (error) {
    res.errorResponse(500, error.message)
  }
}

export {login, logout, maintain_session}
