
let errorResponseMiddleware = (req, res, next) => {
  res.errorResponse = (code, errors) => {
    let temps_errors = {}
    if (code >= 500) {
      console.log(errors, 'API')
      temps_errors = {
        base: 'API error'
      }
    } else {
      errors.forEach(error => {
        let field = error.path[0]
        let field_index = error.path[1]
        if (field_index !== undefined) {
          field += `_${field_index}`
        }
        if (!temps_errors[field]) {
          temps_errors[field] = error.message
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