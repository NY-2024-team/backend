import 'express'
import { type User } from '../models/user/types'

declare global {
  namespace Express {
    interface Locals {
      user?: User | null
    }
  }
}
