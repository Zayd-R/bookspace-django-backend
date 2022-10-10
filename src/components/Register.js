import { useField } from '../hooks/fields'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import registerService from '../services/register'
import { useNavigate } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'

const Register = () => {
  const username = useField('text')
  const first_name = useField('text')
  const last_name = useField('text')
  const email = useField('email')
  const password = useField('password')
  const password2 = useField('password')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const createAccount = (event) => {
    event.preventDefault()
    const newUser = {
      username: username.value,
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
      password2: password2.value,
    }
    registerService
      .register(newUser)
      .then(() => {
        navigate('/login')
      })
      .catch((error) => {
        try {
          dispatch(setNotification(error.response.data.username[0], 'error'))
          console.log(error)
        } catch {
          dispatch(setNotification(error.response.data.password[0], 'error'))
        }
      })
  }

  return (
    <div>
      <h1>Register Page</h1>
      <Form onSubmit={createAccount}>
        <Form.Label>Username</Form.Label>
        <Form.Control {...username} placeholder='Username...' />

        <Form.Label>First name</Form.Label>
        <Form.Control {...first_name} placeholder='First name...' />

        <Form.Label>Last name</Form.Label>
        <Form.Control {...last_name} placeholder='Last name...' />

        <Form.Label>Email</Form.Label>
        <Form.Control {...email} placeholder='Email...' />

        <Form.Label>Password</Form.Label>
        <Form.Control {...password} placeholder='Password...' />

        <Form.Label>Confirm password</Form.Label>
        <Form.Control {...password2} placeholder='confirm Password...' />
        {password2.value !== '' &&
          (password.value !== password2.value ? (
            <span style={{ color: 'red' }}>Passwords do not match</span>
          ) : (
            <span style={{ color: 'green' }}>Passwords match</span>
          ))}
        <br />

        <Button type='submit'>Create account</Button>
      </Form>
    </div>
  )
}

export default Register
