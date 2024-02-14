
let successResponseMiddleWare = (req, res, next) => {
  res.successResponse = (code, data = []) => {
    return res.status(code).json({
      success: true,
      ...data
    })
  }
  next()
}

export default successResponseMiddleWare