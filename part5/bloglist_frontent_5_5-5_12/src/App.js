import { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [typeNotification, setTypeNotification] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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

  const addBlog = (noteObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
    .create(noteObject)
    .then(returnedBlog  => {
      console.log(returnedBlog)
      setBlogs(blogs.concat(returnedBlog))
    })

    setErrorMessage(`a new blog ${noteObject.title} by ${noteObject.author} added`)
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
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      
    </div>
  )
}

export default App
