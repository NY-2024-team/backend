import type { Request, Response } from 'express'
import userModel from '../../models/user/user'

export async function checkAuthController (_: Request, res: Response): Promise<void> {
  const { user } = res.locals
  if (user === null || typeof user === 'undefined') {
    res.status(401)
    res.json({ error: 'Missed authentication!' })
    return
  }
  res.status(200)
  res.json({ user: userModel.removeSecretFields(user) })
}
