export default function hasRight(allowed_roles) {
  return async (req, res, next) => {
    try {
      let current_user_info = req.user
      console.log('here', current_user_info)
      if (current_user_info && allowed_roles.includes(current_user_info.role)) {
        next()
      } else {
        res.errorResponse(403, [{
          path: ['base'],
          message: "Accès refusé"
        }])
      }
    } catch (error) {
      res.errorResponse(500, error.message)
    }
  }
}