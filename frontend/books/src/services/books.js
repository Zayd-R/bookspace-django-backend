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

const addNewBook = (newBook) => {
  axios
    .post(baseUrl, newBook, logService.config())
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error))
}
// remeber to include all fields that were sent to from the server , including the user id which you can get it from the global state (user.user_id)

const updateState = (book_id, bookToUpdate) => {
  axios
    .put(`${baseUrl}/${book_id}`, bookToUpdate, logService.config())
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error))
}

const deleteBook = (book_id) => {
  axios
    .delete(`${baseUrl}/${book_id}`, logService.config())
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error))
}

export default { getUserBooks, addNewBook, updateState, deleteBook }