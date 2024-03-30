import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import Role from '../../models/Roles.mjs'

dotenv.config()

let authenticateToken = async (req, res, next) => {
  let cookies = req.headers.cookie
  let cookie_token = cookies ? cookies.split(';').find(cookie => cookie.startsWith('vtc')) : null
  if (!cookie_token) {
    return res.status(403).json({
      message: 'Accès non autorisé.'
    })
  }
  let token = cookie_token.split('=')[1]
  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'Accès refusé.',
        error: err,
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
