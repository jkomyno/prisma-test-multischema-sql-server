import test, { describe } from 'node:test'
import execa from 'execa'
import assert from 'node:assert'

describe('db pull', () => {
  test('vanilla', async () => {
    try {
      await execa('prisma', ['db', 'pull', '--print', `--url="${process.env.DATABASE_URL}"`])
      assert.deepEqual(true, false) // trigger error if we reach this line
    } catch (error) {
      const e = error as execa.ExecaError
      assert(e.message.includes('Error: P1012 Introspection failed as your current Prisma schema file is invalid'))
    }
  })

  test('--force', async () => {
    try {
      await execa('prisma', ['db', 'pull', '--print', `--url="${process.env.DATABASE_URL}"`])
      assert.deepEqual(true, false) // trigger error if we reach this line
    } catch (error) {
      const e = error as execa.ExecaError
      assert(e.message.includes('Error: P1012 Introspection failed as your current Prisma schema file is invalid'))
    }
  })
})
