import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)

    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
            title:
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={({ target }) => setNewBlog((prevBlog) => ({ ...prevBlog, [target.name]: target.value }))}
          />
        </div>
        <div>
            author:
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={({ target }) => setNewBlog((prevBlog) => ({ ...prevBlog, [target.name]: target.value }))}
          />
        </div>
        <div>
            url:
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={({ target }) => setNewBlog((prevBlog) => ({ ...prevBlog, [target.name]: target.value }))}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm