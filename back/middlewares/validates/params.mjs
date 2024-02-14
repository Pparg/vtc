
export default function validateParams (param, type) {
  return (req, res, next) => {
    let param_value = req.params[param]
    let is_valid = false
    switch (type) {
      case 'int':
        is_valid = Number.isInteger(Number(param_value))
        break;
      case 'bool':
        is_valid = param_value === 'true' ? true : param_value === 'false' ? true : false
        break
      case 'string':
        is_valid = typeof param_value === 'string'
        break
      default:
        is_valid = false
    }

    if (!is_valid) {
      return res.status(400).json({
        succes: false,
        errors: [
          {
            message: 'Bad type',
            expected: type,
            value: param_value
          }
        ]
      })
    }
    next()
  }
}