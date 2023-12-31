import jwt from 'jsonwebtoken'

export function generateToken(payload) {
  return jwt.sign(payload, 'secret_key', {expiresIn: '24h'})
}