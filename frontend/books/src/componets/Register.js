import { useField } from '../hooks/fields';
import loginService from '../services/login'
import userService from '../services/user'
import {Form, Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import registerService from '../services/register'

const Register = ()=>{
    const username = useField("text")
    const first_name = useField('text')
    const last_name = useField('text')
    const email = useField("email")
    const password = useField("password")
    const password2 = useField("password")


const createAccount = (event)=>{
    event.preventDefault()
    const newUser = {
        "username":username.value,
        "first_name": first_name.value,
        "last_name": last_name.value,
        "email": email.value,
        "password": password.value,
        "password2": password2.value
    }
    registerService.register(newUser)
    .then(response=>console.log(response))
    .catch(error=>console.log(error,"error has occured"))
    console.log("it is fine")
}

    return (
        <div>
            <h1>Register Page</h1>
            <Form onSubmit={createAccount}>
                <Form.Label>Username</Form.Label>
                <Form.Control {...username}/>

                <Form.Label>First name</Form.Label>
                <Form.Control {...first_name}/>

                <Form.Label>Last name</Form.Label>
                <Form.Control {...last_name}/>

                <Form.Label>Email</Form.Label>
                <Form.Control {...email}/>

                <Form.Label>Password</Form.Label>
                <Form.Control {...password}/>

                <Form.Label>Confirm password</Form.Label>
                <Form.Control {...password2}/>
               {password.value !== password2.value ? <span>Passwords do not match</span>: ''}
                <Button type="submit">Create account</Button>
            </Form>
        </div>
    )
}

export default Register