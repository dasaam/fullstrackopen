import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { handleNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeLogin } from './reducers/loginReducer'
import { logout } from './reducers/loginReducer'
import { updateBlog } from './reducers/blogReducer'
import { removeBlog } from './reducers/blogReducer'
import _ from 'lodash'


import {
  //BrowserRouter as Router,
  Routes,
  Route,
  Link,
  /*Navigate,
  useParams,
  useNavigate,
  useMatch*/
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    marginTop: 10,
    paddingRight: 10
  }
  return (
    <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
    </div>
  )
}

const App = () => {

  const dispatch = useDispatch()

  //const [blogs, setBlogs] = useState([])
  //const [user, setUser] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    //const user = storageService.loadUser()
    //setUser(user)
    dispatch(initializeLogin())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)

  const notifyWith = (message, typeMessage = 'info') => {
    dispatch(handleNotification(message, typeMessage))

    setTimeout(() => {
      dispatch(handleNotification('', ''))
    }, 3000)
  }

  /*const login = async (username, password) => {

    try {
      //const user = await loginService.login({ username, password })
      //setUser(user)
      storageService.saveUser(user)
      notifyWith('welcome!')
    } catch(e) {
      notifyWith('wrong username or password', 'error')
    }
  }*/

  const logoutBlog = async () => {
    //setUser(null)
    dispatch(logout())
    notifyWith('logged out')
  }

  /*const createBlog = async (newBlog) => {
    //const createdBlog = await blogService.create(newBlog)
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`)
    //setBlogs(blogs.concat(createdBlog))
    blogFormRef.current.toggleVisibility()
  }*/

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    dispatch(updateBlog(blogToUpdate))
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
    //setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
  }

  const remove = async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if (ok) {
      //await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
      //setBlogs(blogs.filter(b => b.id !== blog.id))
    }

  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm notifyWith={notifyWith} />
      </div>
    )
  }

  const BlogList = () => (
    <div>
      <div>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username===user.username}
            remove={() => remove(blog)}
          />
        )}
      </div>
    </div>
  )

  const UserList = () => {

    let users = _.countBy(blogs, 'author')

    let usersArray = []
    _.mapKeys(users, function(value, key) {
      usersArray.push(key + ':' + value)
    })

    return (

      <div>
        <h1>Users</h1>
          <ul>
          {
          usersArray.map(blog =>
            <li key={blog}>
              {blog}
            </li>
          )
          }
          </ul>
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logoutBlog}>logout</button>
      </div>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <NewBlog notifyWith={notifyWith} />
      </Togglable>

      <Menu />

      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/" element={  <BlogList /> } />
      </Routes>
    </div>
  )
}

export default App