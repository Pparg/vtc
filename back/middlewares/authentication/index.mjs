import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import Role from '../../models/Roles.mjs'

dotenv.config()

let authenticateToken = async (req, res, next) => {
  let authHeader = req.headers['authorization']
  let token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      message: 'Accès non autorisé.'
    })
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'Accès refusé.'
      })
    }0
    req.user = {
      id: user.id,
      role: user.role,
    }
    next()
  })
}

export default authenticateToken
