import { useField } from '../hooks/fields'
import loginService from '../services/login'
import userService from '../services/user'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

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
        // console.log(response,"the response after the login")
        navigate('/')
      })
      // TODO: Handle error when username or password is not valid
      .catch((error) => console.log(error, 'the error'))
  }
  return (
    <div className='container'>
      <h1>Login form</h1>
      <Form onSubmit={handleLogin}>
        <Form.Label>Username</Form.Label>
        <Form.Control {...username} placeholder='Username...' />

        <Form.Label>Password</Form.Label>
        <Form.Control {...password} placeholder='Password...' />
        <Button type='submit'>Login</Button>
      </Form>
    </div>
  )
}

export default LoginForm
