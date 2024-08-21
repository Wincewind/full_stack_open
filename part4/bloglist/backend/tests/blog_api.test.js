const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

describe("api", () => {

    test('returns all the blogs as json', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const result = await api
        .get('/api/blogs')
        .expect(201)
        .expect('Content-Type', /application\/json/)

        assert(result.body.length, blogsAtStart)
    })

    after(async () => {
        await mongoose.connection.close()
      })

})