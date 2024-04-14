import User from "../../models/Users.mjs";
import Role from "../../models/Roles.mjs";

import { comparePassword } from "../security/password.mjs";
import Chofer from "../../models/Chofers.mjs";

export async function authenticateAccount (email, password, type) {
  try {
    let account 
    if (type.choffer) {
      let chofer = await Chofer.findOne({ 
        where: { 
          email: email 
        }
      })
      account = chofer
    } else {
      let user = await User.findOne({ 
        where: { 
          email: email 
        }
      })
      account = user
    }
    if (account) {
      let is_password_valid = await comparePassword(password, account.password)
      if (is_password_valid) {
        let account_role = await Role.findByPk(account.role_id)
        if (account instanceof User) {
          await account.update({ last_login: Date.now() })
        }
        let { password, role_id, ...account_info } = account.dataValues
        return {
          success: true,
          id: account.id,
          role: account_role.name,
          data: account_info
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
