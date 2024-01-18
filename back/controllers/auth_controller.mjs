import Role from "../models/Roles.mjs"

import { authenticateUser } from "../utils/authentication/authUser.mjs"
import { generateToken } from "../utils/jwt/jwtToken.mjs"

// [POST] api/auth/login
let login = async (req, res) => {
  let authUser = await authenticateUser(req.data.email, req.data.password)
  if (authUser.success) {
    let user_role = await Role.findOne({where: {name: authUser.role}})
    let token = generateToken({
      id: authUser.id,
      role: user_role.name
    })
    res.successResponse(200, {
      token: token
    })
  } else {
    res.errorResponse(400, authUser)
  }
}

// [GET] api/auth/logout
let logout = (req, res) => {
  res.successResponse(201)
}

export {login, logout}
