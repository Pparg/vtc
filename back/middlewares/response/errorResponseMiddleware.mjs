
let errorResponseMiddleware = (req, res, next) => {
  res.errorResponse = (code, errors) => {
    let temps_errors = {}
    if (code > 500) {
      temps_errors = {
        base: 'API error'
      }
    } else {
      errors.forEach(error => {
        let field = error.path[0]
        if (!temps_errors[field]) {
          temps_errors[field] = error.message
          console.log(temps_errors)
        } else {
          temps_errors[field] += ' ' + error.message
        }
      })
    }
    return res.status(code).json({
      success: false,
      errors: temps_errors
    })
  }
  next()
}

export default errorResponseMiddleware