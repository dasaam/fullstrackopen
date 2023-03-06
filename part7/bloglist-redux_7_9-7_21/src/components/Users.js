import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
export default UserList