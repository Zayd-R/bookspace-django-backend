import axios from 'axios'
import logService from './login'
const baseUrl = 'http://127.0.0.1:8000/books-api/books/'

// for each user just send the token and you will get all the books with difrrent states for that user
const getUserBooks = () => {
  const request = axios.get(baseUrl, logService.config())

  return request
    .then((response) => response.data)
    .catch((error) => console.log(error))
}

const saveBook = (newBook) => {
  const request = axios.post(baseUrl, newBook, logService.config())

  return request
    .then((response) => response.data)
    .catch((error) => console.log(error))
}
// remeber to include all fields that were sent to from the server , including the user id which you can get it from the global state (user.user_id)

const updateState = (book_id, bookToUpdate) => {
  const request = axios.put(
    `${baseUrl}/${book_id}`,
    bookToUpdate,
    logService.config()
  )

  return request
    .then((response) => response.data)
    .catch((error) => console.log(error))
}

const deleteBook = (book_id) => {
  const request = axios.delete(`${baseUrl}${book_id}`, logService.config())

  return request
    .then((response) => response.data)
    .catch((error) => console.log(error))
}
const TestNewAPI = async (state)=>{
  const response =  await axios.get(`http://127.0.0.1:8000/books-api/books/state/${state}`,logService.config())
   return response.data
 }
 
 
export default { getUserBooks, saveBook, updateState, deleteBook, TestNewAPI }
