import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const visibility = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = (event) => {
    event.preventDefault()
    blog = { ...blog, likes: blog.likes+1 }
    
    updateBlog(blog)
}

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}&nbsp;
        <button onClick={toggleVisibility}>{visible ? "hide" : "show"}</button>
      </div>
      <div style={visibility}>
        <div>{blog.url}</div>
        <form onSubmit={addLike}>
          <div>likes {blog.likes}&nbsp;
          <button>like</button>
          </div>
        </form>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog