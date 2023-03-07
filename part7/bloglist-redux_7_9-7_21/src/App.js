import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import User from './components/User'
import UserList from './components/Users'
import BlogList from './components/Blogs'
import Menu from './components/Menu'

import { useDispatch, useSelector } from 'react-redux'
import { handleNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeLogin } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'


import {
  //BrowserRouter as Router,
  Routes,
  Route,
  /*Navigate,
  useParams,
  useNavigate,*/
} from 'react-router-dom'

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
    <div className='container'>
      <Menu />
      <h2>blog app</h2>

      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <NewBlog notifyWith={notifyWith} className='mb-2' />
      </Togglable>

      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/" element={  <BlogList /> } />
      </Routes>
    </div>
  )
}

export default App