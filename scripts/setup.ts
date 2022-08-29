import { runMSSQL } from './util'

async function main() {
  await runMSSQL({
    connectionString: process.env.DATABASE_SETUP_URL!,
    databaseName: 'reprod'
  }, 'setup.sql')

  console.log('Written to database')
}

main()
  .catch(e => {
    console.log('Writing to database failed!')
    console.error(e)
  })
