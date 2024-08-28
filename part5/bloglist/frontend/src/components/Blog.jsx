const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

const BlogForm = ({addBlog, newBlog, setNewBlog}) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      <div>
        title:
          <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={({ target }) => setNewBlog((prevBlog) => ({...prevBlog, [target.name]: target.value}))}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={({ target }) => setNewBlog((prevBlog) => ({...prevBlog, [target.name]: target.value}))}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={({ target }) => setNewBlog((prevBlog) => ({...prevBlog, [target.name]: target.value}))}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

export { Blog, BlogForm }