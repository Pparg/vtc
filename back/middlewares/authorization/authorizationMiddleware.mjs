export default function hasRight(allowed_roles) {
  return async (req, res, next) => {
    try {
      let current_user_info = req.user
      if (current_user_info && allowed_roles.includes(current_user_info.role)) {
        next()
      } else {
        res.status(403).json({
          errors: "Accès refusé brooo",
          test: current_user_info
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