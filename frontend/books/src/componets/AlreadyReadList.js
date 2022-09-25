import { useSelector } from 'react-redux'

const AlreadyReadList = () => {
  const booksRead = useSelector(({ userBooks }) =>
    userBooks.filter((books) => books.book_state === 'read')
  )
  console.table(booksRead)
  return (
    <>
      <h2>Books Read</h2>
      {booksRead.map((books) => (
        <h3 key={books.book_id}>{books.book_title}</h3>
      ))}
    </>
  )
}

export default AlreadyReadList
