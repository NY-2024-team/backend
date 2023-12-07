import path from 'path'
import { readFileSync, readdirSync } from 'fs'
import { db } from './db'

const filesPath = path.resolve(path.join(__dirname, '../migrations'))
const files = readdirSync(filesPath)

for (const filePath of files) {
  const file = readFileSync(filesPath + `/${filePath}`, 'utf-8')
  let commands = file.split(';')
  commands = commands.filter(item => item.trim() !== '')

  for (const command of commands) {
    db.run(command)
  }
}
