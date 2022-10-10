import axios from 'axios'
import userService from './user'

const baseurl = 'users/login/'

const config = () => {
  return { headers: { Authorization: `TOKEN ${userService.getToken()}` } }
}

const login = async (credits) => {
  const response = await axios.post(baseurl, credits)
  return response.data
}

const logout = async () => {
  const response = await axios.delete(
    'http://127.0.0.1:8000/users/logout/',
    config()
  )
  return response.data
}

export default { login, logout, config }
