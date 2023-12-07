CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  telegram_id TEXT,
  vk_id TEXT,
  google_id TEXT
);
