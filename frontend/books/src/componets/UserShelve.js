import ProgressBar from 'react-bootstrap/ProgressBar'

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

const UserShelve = ({ userBooks }) => {
  const booksRead = userBooks.filter((books) => books.book_state === 'read')
  const booksReading = userBooks.filter(
    (books) => books.book_state === 'reading'
  )
  const toRead = userBooks.filter((books) => books.book_state === 'toRead')

  return (
    <>
      <h2>
        You've read {booksRead.length} of {userBooks.length} books
      </h2>
      <ProgressBar now={(booksRead.length / userBooks.length) * 100} />
      <h3>Shelves</h3>
      <div onClick={() => console.log('clicked')}>
        <AlreadyReadSummary books={booksRead} />
      </div>
      <div onClick={() => console.log('clicked')}>
        <CurrentlyReadingSummary books={booksReading} />
      </div>
      <div onClick={() => console.log('clicked')}>
        <ToReadSummary books={toRead} />
      </div>
    </>
  )
}

export default UserShelve
