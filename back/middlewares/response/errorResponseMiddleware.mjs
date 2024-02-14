
let errorResponseMiddleware = (req, res, next) => {
  res.errorResponse = (code, message) => {
    return res.status(code).json({
      success: false,
      errors: {
        message: message
      }
    })
  }
  next()
}

export default errorResponseMiddleware