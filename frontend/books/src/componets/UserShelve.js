import ProgressBar from 'react-bootstrap/ProgressBar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserBooksStats from './UserBooksStats'

const UserShelve = () => {
  const navigate = useNavigate()
  const userBooks = useSelector(({ userBooks }) => userBooks)

  const startTime = performance.now()
  console.table(userBooks)

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
        <UserBooksStats books={booksRead} title={'Read'} />
      </div>
      <div className='categories' onClick={() => navigate('/my-shelve/reading-books')}>
        <UserBooksStats books={booksReading} title={'Currently Reading'} />
      </div>
      <div className='categories' onClick={() => navigate('/my-shelve/want-to-read-books')}>
        <UserBooksStats books={toRead} title={'Want to Read'} />
      </div>
    </>
  )
}

export default UserShelve
