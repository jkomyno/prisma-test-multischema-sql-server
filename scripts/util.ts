import fs from 'fs'
import mssql from 'mssql'
import path from 'path'

export type SetupParams = {
  connectionString: string
  databaseName: string
}
function getMSSQLConfig(url: string): string {
  const rawURL = url.split('://')[1]
  const params = rawURL.split(';')
  const server = params[0].split(':')[0]
  const port = params[0].split(':')[1]
  const [_, ...rest] = params

  return `Server=${server},${port};${rest.join(';')}`
}

export async function runMSSQL(options: SetupParams, sqlfile: string): Promise<void> {
  const { connectionString, databaseName } = options
  const config = getMSSQLConfig(connectionString)
  const connectionPool = new mssql.ConnectionPool(config)
  const connection = await connectionPool.connect()

  try {
    await connection.query(`
    IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '${databaseName}')
    BEGIN
      CREATE DATABASE ${databaseName};
    END
`)
  } catch (e) {
    console.warn(e)
  }

  let schema = `USE [${databaseName}]\n`
  schema += fs.readFileSync(path.join(__dirname, sqlfile), 'utf-8')
  await connection.query(schema)

  await connection.close()
}
