import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, currentUsername }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const fullVisibility = { display: visible ? '' : 'none' }
  const removeButtonStyle = { display: currentUsername === blog.user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = (event) => {
    event.preventDefault()
    blog = { ...blog, likes: blog.likes+1 }
    
    updateBlog(blog)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog '${blog.title}' by '${blog.author}'`)) {
      deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}&nbsp;
        <button onClick={toggleVisibility}>{visible ? "hide" : "show"}</button>
      </div>
      <div style={fullVisibility}>
        <div>{blog.url}</div>
        <form onSubmit={addLike}>
          <div>likes {blog.likes}&nbsp;
          <button>like</button>
          </div>
        </form>
        <div>{blog.user.name}</div>
        <form onSubmit={removeBlog}>
          <button style={removeButtonStyle}>remove</button>
        </form>
      </div>
    </div>
  )
}

export default Blog