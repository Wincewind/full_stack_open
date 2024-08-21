const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')

describe("blog api", () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.listOfBlogs)
      })

    test('returns all the blogs as json', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const result = await api
        .get('/api/blogs')
        .expect(201)
        .expect('Content-Type', /application\/json/)

        assert.strictEqual(result.body.length, blogsAtStart.length)
    })

    test('returns blogs with identifier named \'id\'', async () => {
        const result = await api
        .get('/api/blogs')
        .expect(201)
        .expect('Content-Type', /application\/json/)
        const firstBlog = result.body[0]

        assert(Object.keys(firstBlog).includes('id'))
    })

    after(async () => {
        await mongoose.connection.close()
      })

})