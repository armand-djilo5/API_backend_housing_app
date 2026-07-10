import jwt from 'jsonwebtoken'
import { HttpCode } from '../core/constants/index.js'

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(HttpCode.UNAUTHORIZED).json({ message: 'Authentication required' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    req.user = { id: decoded.id, role: decoded.role }
    return next()
  } catch (error) {
    return res.status(HttpCode.UNAUTHORIZED).json({ message: 'Invalid or expired token' })
  }
}

export default authMiddleware
