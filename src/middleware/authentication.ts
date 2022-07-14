import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import configs from '../config'

export const validateTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get('Authorization')
    if (authHeader) {
      const _bearer = authHeader.split(' ')[0].toLowerCase()
      const _token = authHeader.split(' ')[1]
      if (_token && _bearer === 'bearer') {
        const tkDecode = jwt.verify(
          _token,
          configs.tokenSecret as unknown as string
        )
        if (tkDecode) {
          next()
        } else {
          next('Athorization error')
        }
      } else {
        next('Athorization error')
      }
    } else {
      next('Athorization error')
    }
  } catch (error) {
    next(error)
  }
}
