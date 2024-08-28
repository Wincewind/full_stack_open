import { useState, useEffect } from 'react'
import { Blog, BlogForm } from './components/Blog'
import LoginForm from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

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
      console.log('login error!')
    }
  }

const handleLogout = async (event) => {
  event.preventDefault()
  delete window.localStorage['loggedBlogAppUser']
  setUser(null)
  blogService.setToken('')
}

const addBlog = async (event) => {
  event.preventDefault()

  const addedBlog = await blogService.create(newBlog)
  setBlogs(blogs.concat(addedBlog))
  setNewBlog({ title: '', author: '', url: '' })
}

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in
        <button onClick={handleLogout} >logout</button>
      </div>
      <BlogForm addBlog={addBlog} newBlog={newBlog} setNewBlog={setNewBlog}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App