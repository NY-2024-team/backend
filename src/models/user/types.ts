export interface User {
  id: number
  username: string
  password: string
  telegram_id: string | null
  vk_id: string | null
  google_id: string | null
}
