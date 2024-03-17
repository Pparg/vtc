
let successResponseMiddleWare = (req, res, next) => {
  res.successResponse = (code, data = []) => {
    return res.status(code).json({
      ...data
    })
  }
  next()
}

export default successResponseMiddleWare