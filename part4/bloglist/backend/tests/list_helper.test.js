const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const test_inputs = require('./test_input')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(test_inputs.listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('equal zero when list is empty', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has several blogs equals the likes the sum', () => {
    const result = listHelper.totalLikes(test_inputs.listOfBlogs)
    assert.strictEqual(result, 36)
  })

})

describe('favourite blog', () => {

  test('is chosen from a list of two blogs', () => {
    const result = listHelper.favoriteBlog(test_inputs.listWithTwoBlogs)
    assert.deepStrictEqual(result, test_inputs.listWithTwoBlogs[1])
  })

  test('is chosen from a list of several blogs', () => {
    const result = listHelper.favoriteBlog(test_inputs.listOfBlogs)
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
    const result = listHelper.favoriteBlog(test_inputs.listWithOneBlog)
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

describe('most blogs', () => {

  test('written author is found from a list of blogs', () => {
    const result = listHelper.mostBlogs(test_inputs.listOfBlogs)
    assert.deepStrictEqual(
      result,
      {
        author: "Robert C. Martin",
        blogs: 3
      }
    )
  })

  test('written author is found from a list of two blogs with different authors', () => {
    const result = listHelper.mostBlogs(test_inputs.listWithTwoBlogs)
    assert.deepStrictEqual(
      result,
      {
        author: "Reactor",
        blogs: 1
      }
    )
  })

  test('written author is found from a list of one blog', () => {
    const result = listHelper.mostBlogs(test_inputs.listWithOneBlog)
    assert.deepStrictEqual(
      result,
      {
        author: "Edsger W. Dijkstra",
        blogs: 1
      }
    )
  })

  test('written author is returned as null if the blog list is empty', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(
      result,
      null
    )
  })
})

describe('most likes', () => {

  test('gotten author is found from a list of blogs', () => {
    const result = listHelper.mostLikes(test_inputs.listOfBlogs)
    assert.deepStrictEqual(
      result,
      {
        author: "Edsger W. Dijkstra",
        likes: 17
      }
    )
  })

  test('gotten author is found from a list of two blogs with different authors', () => {
    const result = listHelper.mostLikes(test_inputs.listWithTwoBlogs)
    assert.deepStrictEqual(
      result,
      {
        author: "Reactor",
        likes: 15
      }
    )
  })

  test('gotten author is found from a list of one blog', () => {
    const result = listHelper.mostLikes(test_inputs.listWithOneBlog)
    assert.deepStrictEqual(
      result,
      {
        author: "Edsger W. Dijkstra",
        likes: 5
      }
    )
  })

  test('gotten author is returned as null if the blog list is empty', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(
      result,
      null
    )
  })
})