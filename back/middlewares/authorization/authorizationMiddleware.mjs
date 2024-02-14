import jwt from 'jsonwebtoken'

export default function hasRight(allowed_roles) {
  return async (req, res, next) => {
    try {
      if (req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1]
        let decoded_token = jwt.verify(token, process.env.SECRET_KEY)
        let current_user_role = decoded_token.role
        if (current_user_role && allowed_roles.includes(current_user_role)) {
          next()
        } else {
          res.status(403).json({
            errors : "Accès refusé. Droits requis non présents."
          })
        }
      } else {
        res.status(403).send({
          errors: "Accès refusé. Droit requis."
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