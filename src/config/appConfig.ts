import { expressConfig } from './express'
import { JWTConfig } from './jwt'

export const appConfig = {
  jwt: JWTConfig,
  express: expressConfig
} as const
