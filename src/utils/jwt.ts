import { appConfig } from '../config/appConfig'
import { type User } from '../models/user/types'
import { sign } from 'jsonwebtoken'

export interface AccessTokenPayload {
  userId: number
}

export function generateAccessToken (user: User): string {
  const payload: AccessTokenPayload = {
    userId: user.id
  }
  return sign(payload, appConfig.jwt.secret, { expiresIn: '1800s' })
}
