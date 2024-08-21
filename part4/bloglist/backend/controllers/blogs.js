const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (Object.hasOwn(body, 'title') && Object.hasOwn(body, 'url')) {

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    })
    
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
  else {
    response.status(400).end()
  }
})

module.exports = blogsRouter