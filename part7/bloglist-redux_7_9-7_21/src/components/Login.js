//import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'


const LoginForm = ({ notifyWith }) => {
  const dispatch = useDispatch()
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    try {
      dispatch(login({ username, password }))
      notifyWith('wrong username or password', 'error')
    } catch(e) {
      notifyWith('welcome!')
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          id='username'
          name='username'
          placeholder='username'

        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          name='password'
          placeholder='password'
        />
      </div>
      <button id='login-button' type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm