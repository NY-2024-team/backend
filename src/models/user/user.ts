import type sqlite3 from 'sqlite3'
import type { User, UserCreationOptions, UserWithoutSecret } from './types'
import { db } from '../../db'
import { SQL_QUERIES } from './queries'

export const SECRET_FIELDS = ['password', 'id']

class UserModel {
  private readonly db: sqlite3.Database

  constructor (database: sqlite3.Database) {
    this.db = database
  }

  async createUser (user: UserCreationOptions): Promise<User | null> {
    const self = this

    return await new Promise((resolve, reject) => {
      this.db.run(
        SQL_QUERIES.INSERT_USER,
        [user.username, user.password, user.telegram_id, user.vk_id, user.google_id],
        function (err) {
          if (err instanceof Error) {
            console.error('Error creating user:', err.message)
            reject(new Error('Error creating user'))
          } else {
            const userId = this.lastID
            resolve(self.getUserById(userId))
          }
        }
      )
    })
  }

  async getUserById (userId: number): Promise<User | null> {
    return await new Promise((resolve, reject) => {
      this.db.get(SQL_QUERIES.SELECT_USER_BY_ID, [userId], (err, user) => {
        if (err instanceof Error) {
          console.error('Error fetching user by ID:', err.message)
          reject(new Error('Error fetching user by ID'))
        } else {
          resolve(user as User ?? null)
        }
      })
    })
  }

  async updateUser (userId: number, updatedUser: Partial<User>): Promise<User | null> {
    const self = this
    return await new Promise((resolve, reject) => {
      this.db.run(
        SQL_QUERIES.UPDATE_USER,
        [
          updatedUser.username,
          updatedUser.password,
          updatedUser.telegram_id,
          updatedUser.vk_id,
          updatedUser.google_id,
          userId
        ],
        function (err) {
          if (err instanceof Error) {
            console.error('Error updating user:', err.message)
            reject(new Error('Error updating user'))
          } else {
            if (this.changes > 0) {
              const updatedUser = self.getUserById(userId)
              resolve(updatedUser)
            } else {
              resolve(null)
            }
          }
        }
      )
    })
  }

  async deleteUser (userId: number): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      this.db.run(SQL_QUERIES.DELETE_USER, [userId], function (err) {
        if (err instanceof Error) {
          console.error('Error deleting user:', err.message)
          reject(new Error('Error deleting user'))
        } else {
          resolve(this.changes > 0)
        }
      })
    })
  }

  async getUserByUsername (username: string): Promise<User | null> {
    return await new Promise((resolve, reject) => {
      this.db.get(SQL_QUERIES.SELECT_USER_BY_USERNAME, [username], (err, user) => {
        if (err instanceof Error) {
          console.error('Error fetching user by username:', err.message)
          reject(new Error('Error fetching user by username'))
        } else {
          resolve(user as User ?? null)
        }
      })
    })
  }

  async getUserByTelegramId (telegramId: string): Promise<User | null> {
    return await new Promise((resolve, reject) => {
      this.db.get(SQL_QUERIES.SELECT_USER_BY_TELEGRAM_ID, [telegramId], (err, user) => {
        if (err instanceof Error) {
          console.error('Error fetching user by Telegram ID:', err.message)
          reject(new Error('Error fetching user by Telegram ID'))
        } else {
          resolve(user as User ?? null)
        }
      })
    })
  }

  async getUserByGoogleId (googleId: string): Promise<User | null> {
    return await new Promise((resolve, reject) => {
      this.db.get(SQL_QUERIES.SELECT_USER_BY_GOOGLE_ID, [googleId], (err, user) => {
        if (err instanceof Error) {
          console.error('Error fetching user by Google ID:', err.message)
          reject(new Error('Error fetching user by Google ID'))
        } else {
          resolve(user as User ?? null)
        }
      })
    })
  }

  async getUserByVKId (vkId: string): Promise<User | null> {
    return await new Promise((resolve, reject) => {
      this.db.get(SQL_QUERIES.SELECT_USER_BY_VK_ID, [vkId], (err, user) => {
        if (err instanceof Error) {
          console.error('Error fetching user by VK ID:', err.message)
          reject(new Error('Error fetching user by VK ID'))
        } else {
          resolve(user as User ?? null)
        }
      })
    })
  }

  async getAllUsers (): Promise<User[]> {
    return await new Promise((resolve, reject) => {
      this.db.all(SQL_QUERIES.SELECT_ALL_USERS, (err, users) => {
        if (err instanceof Error) {
          console.error('Error fetching all users:', err.message)
          reject(new Error('Error fetching all users'))
        } else {
          resolve(users as User[])
        }
      })
    })
  }

  public removeSecretFields (user: User): UserWithoutSecret {
    const { google_id, telegram_id, username, vk_id, id } = user
    const userWithoutSecret: UserWithoutSecret = { google_id, telegram_id, username, vk_id, id }

    return userWithoutSecret
  }
}

const userModel = new UserModel(db)
export default userModel
