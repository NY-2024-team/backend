import path from 'path'
import { verbose, Database, OPEN_CREATE, OPEN_READWRITE } from 'sqlite3'
import os from 'os'
import { existsSync, mkdirSync } from 'fs'

verbose()
const filePath = path.join(os.homedir(), 'new_year')
const isDirectoryExist = existsSync(filePath)

if (!isDirectoryExist) mkdirSync(filePath)

const db = new Database(
  filePath + '/db.sqlite',
  OPEN_CREATE | OPEN_READWRITE,
  (err) => {
    if (err instanceof Error) {
      console.error('Error opening the database:', err.message)
    } else {
      console.log('Connected to the database')
    }
  }
)

export { db }
