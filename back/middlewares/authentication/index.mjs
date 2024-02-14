import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import Role from '../../models/Roles.mjs'

dotenv.config()

let authenticateToken = async (req, res, next) => {
  let cookies = req.headers.cookie
  let token = cookies.split(';').find(cookie => cookie.startsWith('vtc'))
  if (!token) {
    return res.status(404).json({
      message: 'Accès non autorisé.'
    })
  }
  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'Accès refusé.'
      })
    }
    req.user = {
      id: user.id,
      role: user.role,
    }
    next()
  })
}

export default authenticateToken
