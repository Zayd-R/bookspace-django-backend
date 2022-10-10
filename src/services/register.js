import axios from 'axios'

const baseUrl = 'users/register/'

const register = async (newUser) => {
  const results = await axios.post(baseUrl, newUser)
}

export default { register }
