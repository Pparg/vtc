
let errorResponseMiddleware = (req, res, next) => {
  res.errorResponse = (code, message) => {
    return res.status(code).json({
      success: true,
      errors: {
        message: message
      }
    })
  }
  next()
}

export default errorResponseMiddleware