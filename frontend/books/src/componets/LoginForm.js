import { useField } from '../hooks/fields'
import loginService from '../services/login'
import userService from '../services/user'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { Link, useNavigate } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    const toBeAuthinticated = {
      username: username.value,
      password: password.value,
    }

    loginService
      .login(toBeAuthinticated)
      .then((response) => {
        userService.setUser(response)
        dispatch(loginUser(response))
        navigate('/')
      })
      .catch(() => {
        dispatch(setNotification("Invalid username or password , please try again", "error"))
      })
  }
  return (
    <div className='container'>
      <h1>Login form</h1>
      <Form onSubmit={handleLogin}>
        <Form.Label>Username</Form.Label>
        <Form.Control {...username} placeholder='Username...' />

        <Form.Label>Password</Form.Label>
        <Form.Control {...password} placeholder='Password...' />
        <br/>
        <Button type='submit'>Login</Button>  Don't have an account? <Link to='/register'>Sign up</Link>
      </Form>
    </div>
  )
}

export default LoginForm
