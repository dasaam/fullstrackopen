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
import { initializeUsers } from './reducers/userReducer'
import { logout } from './reducers/loginReducer'
import { updateBlog } from './reducers/blogReducer'
import { removeBlog } from './reducers/blogReducer'
//import _ from 'lodash'


import {
  //BrowserRouter as Router,
  Routes,
  Route,
  Link,
  /*Navigate,
  useParams,
  useNavigate,*/
  useMatch
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

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
        <h1>{user.name}</h1>
        <h2>Added blogs</h2>
        <ul>
          {
            user.blogs.map(blog =>
              <li key={blog.id}>
                {blog.title}
              </li>
            )
          }
        </ul>
    </div>
  )
}

const UserList = () => {
  const users = useSelector(state => state.user)
  return (

    <div>
      <h1>Users</h1>
        <ul>
        {
          users.map(user =>
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>{ user.name }</Link> : {user.blogs.length}
            </li>
          )
        }
        </ul>
    </div>
  )
}


const App = () => {

  const dispatch = useDispatch()

  //const [blogs, setBlogs] = useState([])
  //const [user, setUser] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeLogin())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const userLogin = useSelector(state => state.login)
  const users = useSelector(state => state.user)

  const match = useMatch('/users/:id')
  const user = match
  ? users.find(user => user.id === match.params.id)
  : null
  //const oso = users.find(user => console.log(user.id))

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

  if (!userLogin) {
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



  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {userLogin.name} logged in
        <button onClick={logoutBlog}>logout</button>
      </div>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <NewBlog notifyWith={notifyWith} />
      </Togglable>

      <Menu />

      <Routes>
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/" element={  <BlogList /> } />
      </Routes>
    </div>
  )
}

export default App