export const SQL_QUERIES = {
  INSERT_USER: 'INSERT INTO users (username, password, telegram_id, vk_id, google_id) VALUES (?, ?, ?, ?, ?)',
  SELECT_USER_BY_ID: 'SELECT * FROM users WHERE id = ?',
  SELECT_USER_BY_USERNAME: 'SELECT * FROM users WHERE username = ?',
  SELECT_USER_BY_TELEGRAM_ID: 'SELECT * FROM users WHERE telegram_id = ?',
  SELECT_USER_BY_GOOGLE_ID: 'SELECT * FROM users WHERE google_id = ?',
  SELECT_USER_BY_VK_ID: 'SELECT * FROM users WHERE vk_id = ?',
  UPDATE_USER: 'UPDATE users SET username = ?, password = ?, telegram_id = ?, vk_id = ?, google_id = ? WHERE id = ?',
  DELETE_USER: 'DELETE FROM users WHERE id = ?',
  SELECT_ALL_USERS: 'SELECT * FROM users'
}
