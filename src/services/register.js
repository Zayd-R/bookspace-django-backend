import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/users/register/'

const register = async (newUser) => {
  const results = await axios.post(baseUrl, newUser)
}

export default { register }
