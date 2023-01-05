import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [typeNotification, setTypeNotification] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [newTitle, setNewTitle] = useState('') 
  const [newAuthor, setNewAuthor] = useState('') 
  const [newUrl, setNewUrl] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Wrong username or password')
      setTypeNotification('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setErrorMessage('Logout successfull')
    setTypeNotification('success')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addBlog = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }

    blogService
    .create(blogObject)
    .then(returnedBlog  => {
      console.log(returnedBlog)
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    })

    setErrorMessage(`a new blog ${newTitle} by ${newAuthor} added`)
    setTypeNotification('success')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  
  }

  const Notification = ({ message, typeNotification }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={typeNotification}>
        {message}
      </div>
    )
  }

  const BlogForm = () => (
    <form onSubmit={addBlog}>
      <p>
        <label>title</label>
        <input type="text" name="title" value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
      </p>
      <p>
        <label>author</label>
        <input type="text" name="author" value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
      </p>
      <p>
        <label>url</label>
        <input type="text" name="url" value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
      </p>
      
      <button type="submit">create</button>
    </form>  
  )



  if(user === null){
    
    return (
      <div>
        <Notification message={errorMessage} typeNotification={typeNotification} />
        <h1>Log in to application</h1>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>  
      </div>
    )
  }
  
  return (
    <div>
      <Notification message={errorMessage} typeNotification={typeNotification} />
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={ handleLogout }>Logout</button></p> 
      { BlogForm() }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      
    </div>
  )
}

export default App
