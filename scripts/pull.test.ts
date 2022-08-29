import test, { describe } from 'node:test'
import execa from 'execa'
import assert from 'node:assert'

describe('db pull', () => {
  test('', async () => {
    try {
      await execa('prisma', ['db', 'pull', '--print', `--url="${process.env.DATABASE_URL}"`])
    } catch (error) {
      const e = error as execa.ExecaError
      assert(e.message.includes('Error: P1012 Introspection failed as your current Prisma schema file is invalid'))
    }
  })
})
