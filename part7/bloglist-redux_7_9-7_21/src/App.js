import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import User from './components/User'
import UserList from './components/Users'
import BlogList from './components/Blogs'

import { useDispatch, useSelector } from 'react-redux'
import { handleNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeLogin } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { logout } from './reducers/loginReducer'



import {
  //BrowserRouter as Router,
  Routes,
  Route,
  Link,
  /*Navigate,
  useParams,
  useNavigate,*/
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

  const userLogin = useSelector(state => state.login)


  const notifyWith = (message, typeMessage = 'info') => {
    dispatch(handleNotification(message, typeMessage))

    setTimeout(() => {
      dispatch(handleNotification('', ''))
    }, 3000)
  }


  const logoutBlog = async () => {
    //setUser(null)
    dispatch(logout())
    notifyWith('logged out')
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
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/" element={  <BlogList /> } />
      </Routes>
    </div>
  )
}

export default App