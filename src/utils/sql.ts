import { readFile } from 'fs'

export function readSQLFile (path: string): string[] | never {
  let sqlText: string | null = null
  readFile(path, 'utf-8', (err, data) => {
    if (err instanceof Error) throw new Error(err.message)
    sqlText = data
  })
  if (sqlText === null) throw new Error('Cannot read SQL file ' + path)
  const sqls = (sqlText as string).split(';')
  return sqls
}
