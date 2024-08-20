const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const test_input = require('./test_input')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(test_input.listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('equal zero when list is empty', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has several blogs equals the likes the sum', () => {
    const result = listHelper.totalLikes(test_input.list_of_blogs)
    assert.strictEqual(result, 36)
  })

})

describe('favourite blog', () => {

  test('is chosen from a list of two blogs', () => {
    const result = listHelper.favoriteBlog(test_input.listWithTwoBlogs)
    assert.deepStrictEqual(result, test_input.listWithTwoBlogs[1])
  })

  test('is chosen from a list of several blogs', () => {
    const result = listHelper.favoriteBlog(test_input.list_of_blogs)
    assert.deepStrictEqual(result, 
      {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })

  test('is chosen from a list of one blog', () => {
    const result = listHelper.favoriteBlog(test_input.listWithOneBlog)
    assert.deepStrictEqual(result, 
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    })
  })

  test('is null for an empty list', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, null)
  })
})