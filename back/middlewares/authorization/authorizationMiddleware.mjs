import Role from "../../models/Roles.mjs";
import User from "../../models/Users.mjs";

import jwt from 'jsonwebtoken'

export default function hasRight(allowed_roles) {
  return async (req, res, next) => {
    try {
      let token = req.headers.authorization.split(' ')[1]
      let decoded_token = jwt.verify(token, process.env.SECRET_TOKEN)
      let user_id = decoded_token.user_id

      let current_user = await User.findByPk(user_id, {
        include: Role
      })

      if (current_user && current_user.Role && allowed_roles.includes(current_user.Role.name)) {
        next()
      } else {
        res.status(403).json({
          errors : "Accès refusé. Droits requis non présents."
        })
      }

    } catch (error) {
      res.status(500).json({
        message: 'Erreur de validation des droits.',
        errors: error.message
      })
    }
  }
}