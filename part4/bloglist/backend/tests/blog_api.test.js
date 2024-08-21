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
        const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.length, blogsAtStart.length)
    })

    test('returns blogs with identifier named \'id\'', async () => {
        const response = await api.get('/api/blogs')
        const firstBlog = response.body[0]

        assert(Object.hasOwn(firstBlog,'id'))
    })
    describe("adding a new blog", () => {

    test('succeeds with valid data', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5
        }
        
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        const lastAddedBlog = response.body.slice(-1)[0]
        delete lastAddedBlog.id

        assert.strictEqual(response.body.length, helper.listOfBlogs.length + 1)
        assert.deepStrictEqual(newBlog, lastAddedBlog)
    })

    test('will succeed even if likes are missing and they\'ll be set to zero', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        }
        
        await api.post('/api/blogs').send(newBlog)
        const response = await api.get('/api/blogs')
        const lastAddedBlog = response.body.slice(-1)[0]

        assert.strictEqual(lastAddedBlog.likes, 0)
    })

    test('will fail with status 400 if title is missing', async () => {
        const newBlog = {
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })

    test('will fail with status 400 if url is missing', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })

    test('will fail with status 400 if title and url is missing', async () => {
        const newBlog = {
            author: 'Edsger W. Dijkstra',
            likes: 5
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
    
})

})

after(async () => {
    await mongoose.connection.close()
  })