const groupBy = require('lodash').groupBy

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) =>
        sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0
    ? null
    : blogs.reduce((a, b) => (a.likes > b.likes) ? a : b, -Infinity)
}

const blogsByAuthor = (blogs) => {
    const authorGroupedBlogs = groupBy(blogs, ({ author }) => author)
    return Object.keys(authorGroupedBlogs).map(
        key => ({
        author: key,
        blogs: authorGroupedBlogs[key].length
    }))
}

const mostBlogs = (blogs) => {
    return blogs.length === 0
    ? null
    : blogsByAuthor(blogs).reduce((a, b) => (a.blogs > b.blogs) ? a : b, -Infinity)
}
  
module.exports = {
dummy, totalLikes, favoriteBlog, mostBlogs
}