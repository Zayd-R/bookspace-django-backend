import { useEffect } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { initializeUserBooks } from '../reducers/userBooksReducer'

const AlreadyReadSummary = ({ books }) => {
  const numberOfBooks = books.length === 1 ? 'book' : 'books'

  return (
    <>
      <h5>Read</h5>
      <p>
        {books.length || 0} {numberOfBooks}
      </p>
    </>
  )
}

const CurrentlyReadingSummary = ({ books }) => {
  const numberOfBooks = books.length === 1 ? 'book' : 'books'

  return (
    <>
      <h5>Currently Reading</h5>
      <p>
        {books.length || 0} {numberOfBooks}
      </p>
    </>
  )
}

const ToReadSummary = ({ books }) => {
  const numberOfBooks = books.length === 1 ? 'book' : 'books'

  return (
    <>
      <h5>Want to Read</h5>
      <p>
        {books.length || 0} {numberOfBooks}
      </p>
    </>
  )
}

const UserShelve = () => {
  const navigate = useNavigate()
  const userBooks = useSelector(({ userBooks }) => userBooks)

  const cursor = { cursor: "pointer"}
  const startTime = performance.now()

  const booksRead = userBooks.filter((books) => books.book_state === 'read')
  const booksReading = userBooks.filter(
    (books) => books.book_state === 'reading'
  )
  const toRead = userBooks.filter((books) => books.book_state === 'toRead')

  const endTime = performance.now()
  console.log(`Call to 3 filters took ${endTime - startTime} milliseconds`)

  return (
    <>
      <h2>
        You've read {booksRead.length} of {userBooks.length} books
      </h2>
      <ProgressBar now={(booksRead.length / userBooks.length) * 100} />
      <h3>Shelves</h3>
      <div className='categories' onClick={() => navigate('/my-shelve/read-books')}>
        <AlreadyReadSummary books={booksRead} />
      </div>
      <div className='categories' onClick={() => console.log('clicked')}>
        <CurrentlyReadingSummary books={booksReading} />
      </div>
      <div className='categories' onClick={() => console.log('clicked')}>
        <ToReadSummary books={toRead} />
      </div>
    </>
  )
}

export default UserShelve
