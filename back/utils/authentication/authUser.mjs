import User from "../../models/Users.mjs";
import Role from "../../models/Roles.mjs";

import { comparePassword } from "../security/password.mjs";
import Chofer from "../../models/Chofers.mjs";

export async function authenticateAccount (email, password) {
  try {
    let user = await User.findOne( {where: {email: email}})
    let chofer = await Chofer.findOne({where: {email: email}})
    if (user || chofer) {
      console.log('here')
      let is_password_valid = await comparePassword(password, user.password)
      if (is_password_valid) {
        let account = user || chofer
        let account_role = await Role.findByPk(account.role_id)
        await account.update({last_login: Date.now()})
        return {
          success: true,
          id: account.id,
          role: account_role.name
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
