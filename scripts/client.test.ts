import assert from 'node:assert/strict'
import test, { describe } from 'node:test'
import { PrismaClient } from '@prisma/client'

describe('client', () => {
  const prisma = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
    ],
  })

  prisma.$on('query', (e) => {
    console.log('Query: ' + e.query)
    console.log('Params: ' + e.params)
  })

  test('should query users created', async () => {
    await prisma.user.create({
      data: {
        id: 1,
        order: {
          create: {
            id: 101,
          },
        },
      },
    })
    await prisma.user.create({
      data: {
        id: 2,
        order: {
          create: {
            id: 201,
          },
        },
      },
    })
    await prisma.user.create({
      data: {
        id: 3,
      },
    })

    const users = await prisma.user.findMany({ orderBy: { id: 'asc' } })
    assert.deepEqual(users, [ { id: 1 }, { id: 2 }, { id: 3 } ])

    const orders = await prisma.order.findMany({ orderBy: { id: 'asc' } })
    assert.deepEqual(orders, [ { id: 101, user_id: 1 }, { id: 201, user_id: 2 } ])

    const usersWithOrders = await prisma.user.findMany({ orderBy: { id: 'asc' }, include: { order: true } })
    assert.deepEqual(usersWithOrders, [
      { id: 1, order: { id: 101, user_id: 1 } },
      { id: 2, order: { id: 201, user_id: 2 } },
      { id: 3, order: null }
    ])
  })
})
