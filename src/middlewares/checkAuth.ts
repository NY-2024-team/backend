import { type NextFunction, type Request, type Response } from 'express'
import { decodeAccessToken } from '../utils/jwt'

export async function checkAuth (req: Request, res: Response, next: NextFunction): Promise<void> {
  res.locals.user = null
  if (typeof req.cookies !== 'object') next()

  const jwt = req.cookies.auth
  if (typeof jwt !== 'string') next()
  const user = await decodeAccessToken(jwt)
  res.locals.user = user
  next()
}
