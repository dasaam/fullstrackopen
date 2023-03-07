//import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { handleNotification } from '../reducers/notificationReducer'


const LoginForm = () => {
  const dispatch = useDispatch()

  const notifyWith = (message, typeMessage = 'info') => {
    dispatch(handleNotification(message, typeMessage))

    setTimeout(() => {
      dispatch(handleNotification('', ''))
    }, 3000)
  }

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