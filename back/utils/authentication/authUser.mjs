import User from "../../models/Users.mjs";

import { comparePassword } from "../security/password.mjs";

export async function authenticateUser (email, password) {
  try {
    let user = await User.findOne( {where: {email: email}})
    if (user) {
      let is_password_valid = await comparePassword(password, user.password)
      if (is_password_valid) {
        return {
          success: true,
          user_id: user.id
        }
      } else {
        return {
          success: false, 
          message: 'Identifiants invalides.'
        }
      }
    } else {
      return {
        success: false,
        message: "Pas d'utilisateur associé."
      }
    }
  } catch (error) {
    console.log(error)
  }
}