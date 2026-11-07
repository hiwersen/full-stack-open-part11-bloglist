const { test, describe, before, after } = require('node:test')

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

before(async () => {
  await mongoose.connection.asPromise()
})

describe('GET /api/health', () => {
  test('should return 200 OK', async () => {
    await mongoose.connect(config.MONGODB_URI)
    await api
      .get('/api/health')
      .expect(200)
      .expect(/server and database ok/)
  })

  test('returns 503 when database is down', async () => {
    await mongoose.connection.close()
    await api
      .get('/api/health')
      .expect(503)
      .expect(/database unavailable/)
  })
})

after(async () => {
  await mongoose.connection.close()
  logger.info('Connection to MongoDB closed')
})
