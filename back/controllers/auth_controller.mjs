import User from "../models/Users.mjs"

import { authenticateUser } from "../utils/authentication/authUser.mjs"
import { generateToken } from "../utils/jwt/jwtToken.mjs"

// [POST] api/auth/login
let login = async (req, res) => {
  let authUser = await authenticateUser(req.data.email, req.data.password)
  if (authUser.success) {
    let token = generateToken({user_id: authUser.user_id})
    res.successResponse(200, {
      message: 'Connecté'
    } )
  } else {
    res.errorResponse(400, authUser)
  }
}

// [GET] api/auth/logout
let logout = (req, res) => {
  res.send({
    accion: 'logout'
  })
}

export {login, logout}
