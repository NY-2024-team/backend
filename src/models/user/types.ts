export interface User {
  id: number
  username: string
  password: string
  telegram_id: string | null
  vk_id: string | null
  google_id: string | null
}

export interface UserCreationOptions {
  username: string
  password: string
  telegram_id?: string
  vk_id?: string
  google_id?: string
}

export type UserWithoutSecret = Omit<User, 'password' | 'id'>
