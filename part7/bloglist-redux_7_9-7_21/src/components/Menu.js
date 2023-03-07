import { useSelector, useDispatch } from 'react-redux'
import { handleNotification } from '../reducers/notificationReducer'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'
import Notification from '../components/Notification'

const Menu = () => {
    const padding = {
        marginTop: 10,
        paddingRight: 10
      }
      const userLogin = useSelector(state => state.login)
      const dispatch = useDispatch()
      const logoutBlog = async () => {
        //setUser(null)
        dispatch(logout())
        notifyWith('logged out')
      }
      const notifyWith = (message, typeMessage = 'info') => {
        dispatch(handleNotification(message, typeMessage))

        setTimeout(() => {
          dispatch(handleNotification('', ''))
        }, 3000)
      }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {
                userLogin ? <em>{ userLogin.name } logged in <button onClick={ logoutBlog }>logout</button> </em> : <Link to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Notification />
    </div>
  )
}

export default Menu