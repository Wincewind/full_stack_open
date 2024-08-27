const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

describe("blog api", () => {
    let token;
    let blogUserData;

    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('Swordfish', 10)
        const user = new User({ username: 'Wincewind', passwordHash })
        await user.save()

        const blogs = helper.listOfBlogs.map(blog => ({...blog, user: user._id.toString()}))        
        await Blog.insertMany(blogs)
        
        blogUserData = {username: user.username, id: user._id.toString()}
        token = jwt.sign(blogUserData, process.env.SECRET, { expiresIn: 60*60 })
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
        .set({ Authorization: "Bearer " + token })
        .expect(201)
        .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        const lastAddedBlog = response.body.slice(-1)[0]
        delete lastAddedBlog.id

        assert.strictEqual(response.body.length, helper.listOfBlogs.length + 1)
        assert.deepStrictEqual({...newBlog, user: blogUserData}, lastAddedBlog)
    })

    test('will succeed even if likes are missing and they\'ll be set to zero', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        }
        
        await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: "Bearer " + token })
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
        .set({ Authorization: "Bearer " + token })
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
        .set({ Authorization: "Bearer " + token })
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
        .set({ Authorization: "Bearer " + token })
        .send(newBlog)
        .expect(400)
    })

    test('will fail with status 401 if token isn\'t provided', async () => {
        const newBlog = {
            author: 'Edsger W. Dijkstra',
            likes: 5
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
    })
    
})

describe('deletion of a blog', () => {
    test('succeeds with status 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set({ Authorization: "Bearer " + token })
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.listOfBlogs.length - 1)

      const ids = blogsAtEnd.map(r => r.id)
      assert(!ids.includes(blogToDelete.id))
    })

    test('will fail with status 401 if token isn\'t provided', async () => {
        const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)
    })
  })

  describe('updating a blog\'s likes', () => {
    test('succeeds if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        blogToUpdate.likes = Date.now()
  
        updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)

        const blogsAfterUpdate = await helper.blogsInDb()
  
        assert.strictEqual(updatedBlog.body.likes, blogsAfterUpdate[0].likes)
      })
  })

})

after(async () => {
    await User.deleteMany({})
    await mongoose.connection.close()
  })