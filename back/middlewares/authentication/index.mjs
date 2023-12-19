import jwt from 'jsonwebtoken'

let authenticateToken = (req, res, next) => {
  let authHeader = req.headers['authorization']
  let token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      message: 'Accès non autorisé.'
    })
  }

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'Accès refusé.'
      })
    }
    req.user = user
    next()
  })

}

export default authenticateToken
