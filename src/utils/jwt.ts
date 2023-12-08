import { appConfig } from '../config/appConfig'
import { type User } from '../models/user/types'
import { type JwtPayload, decode, sign } from 'jsonwebtoken'
import userModel from '../models/user/user'

export interface AccessTokenPayload {
  userId: number
}

export function generateAccessToken (user: User): string {
  const payload: AccessTokenPayload = {
    userId: user.id
  }
  return sign(payload, appConfig.jwt.secret, { expiresIn: '1800s' })
}

export async function decodeAccessToken (jwt: string): Promise<User | null> {
  const payload = decode(jwt)
  if (typeof payload !== 'object' || payload === null) return null
  if (!('userId' in payload)) return null
  const typedPayload = payload as AccessTokenPayload & JwtPayload
  const user = await userModel.getUserById(typedPayload.userId)
  return user
}
