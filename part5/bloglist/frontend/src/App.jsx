import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMsg, setNotificationMsg] = useState({ msg: null, isError: true })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const flashNotificationMsg = (msg, isError) => {
    setNotificationMsg(
      { msg, isError }
    )
    setTimeout(() => {
      setNotificationMsg({ msg: null, isError: isError })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      flashNotificationMsg(`wrong username or password`, true)
    }
  }

const handleLogout = async (event) => {
  event.preventDefault()
  delete window.localStorage['loggedBlogAppUser']
  setUser(null)
  blogService.setToken('')
}

const addBlog = async (blogObject) => {
  blogFormRef.current.toggleVisibility()
  const addedBlog = await blogService.create(blogObject)
  setBlogs(blogs.concat(addedBlog))
  flashNotificationMsg(`a new blog '${addedBlog.title}' by '${addedBlog.author}' added`, false)
}

const updateBlog = async (blogObject) => {
  const returnedBlog = await blogService.update(blogObject)
  setBlogs(
    blogs.map(blog => blog.id === returnedBlog.id
    ? returnedBlog
    : blog)
  )
}

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMsg.msg} isError={notificationMsg.isError} />
        <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMsg.msg} isError={notificationMsg.isError} />
      <div>{user.name} logged in&nbsp;
        <button onClick={handleLogout} >logout</button>
      </div>
      <br />
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      )}
    </div>
  )
}

export default App