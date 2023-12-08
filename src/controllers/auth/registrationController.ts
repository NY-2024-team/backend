import { type Request, type Response } from 'express'
import userModel from '../../models/user/user'
import { hash } from 'bcrypt'

interface RequestBodyPayload {
  username: string
  password: string
}

export async function registrationController (req: Request<undefined, undefined, RequestBodyPayload>, res: Response): Promise<void> {
  const { password, username } = req.body
  const isUserExist = await userModel.getUserByUsername(username)
  if (isUserExist !== null) {
    res.status(409)
    res.json({ error: `User with username ${username} already exists` })
    return
  }

  const hashedPassword = await hash(password, 10)
  const createdUser = await userModel.createUser({
    password: hashedPassword,
    username
  })

  if (createdUser === null) {
    res.status(201).json()
    return
  }

  const safeUser = userModel.removeSecretFields(createdUser)

  res.status(201)
  res.json({ user: safeUser })
}
