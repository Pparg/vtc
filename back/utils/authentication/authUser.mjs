import User from "../../models/Users.mjs";
import Role from "../../models/Roles.mjs";

import { comparePassword } from "../security/password.mjs";

export async function authenticateUser (email, password) {
  try {
    let user = await User.findOne( {where: {email: email}})
    if (user) {
      let is_password_valid = await comparePassword(password, user.password)
      if (is_password_valid) {
        let user_role = await Role.findByPk(user.role_id)
        await user.update({last_login: Date.now()})
        return {
          success: true,
          id: user.id,
          role: user_role.name
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