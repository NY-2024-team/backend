import { type Request, type Response } from 'express'
import userModel from '../../models/user/user'
import { compare } from 'bcrypt'
import { generateAccessToken } from '../../utils'

interface RequestBodyPayload {
  username: string
  password: string
}

const WRONG_USERNAME_OR_PASSWORD = 'Sorry, your username or password is wrong'

export async function loginController (req: Request<undefined, undefined, RequestBodyPayload>, res: Response): Promise<void> {
  const { password, username } = req.body
  const user = await userModel.getUserByUsername(username)
  if (user === null) {
    res.status(400)
    res.json({ error: WRONG_USERNAME_OR_PASSWORD })
    return
  }

  const isPasswordTrue = await compare(password, user.password)
  if (!isPasswordTrue) {
    res.status(400)
    res.json({ error: WRONG_USERNAME_OR_PASSWORD })
    return
  }

  const safeUser = userModel.removeSecretFields(user)
  const jwt = generateAccessToken(user)
  const jwtExpiresTime = new Date(Date.now() + 1800 * 1000)
  res.cookie('auth', jwt, { expires: jwtExpiresTime, httpOnly: true, secure: true })
  res.status(200)
  res.json({
    safeUser
  })
}
