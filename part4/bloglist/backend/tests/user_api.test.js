const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const User = require('../models/user')

describe("creating a new user", () => {
    beforeEach(async () => {
        await User.deleteMany({})
      })

    test('succeeds with valid information', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: "HarryJones",
            name: "Harrison Jones",
            password: "Swordfish"
        }

        const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const usersAfter = await helper.usersInDb()

        assert.strictEqual(usersAtStart.length + 1, usersAfter.length)
        
        const usernames = usersAfter.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })
    test('fails when the username is too short', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: "Ha",
            name: "Harrison Jones",
            password: "Swordfish"
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAfter = await helper.usersInDb()
        assert.strictEqual(usersAtStart.length, usersAfter.length)

        assert(result.body.error.includes(`\`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length`))
    })

    test('fails when the password is too short', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: "HarryJones",
            name: "Harrison Jones",
            password: "Sw"
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAfter = await helper.usersInDb()
        assert.strictEqual(usersAtStart.length, usersAfter.length)

        assert(result.body.error.includes('password is shorter than the minimum allowed length'))
    })

})

after(async () => {
    await mongoose.connection.close()
  })