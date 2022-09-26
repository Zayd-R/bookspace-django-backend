const UserBooksStats = ({ books, title }) => {
  const numberOfBooks = books.length === 1 ? 'book' : 'books'

  return (
    <>
      <h5>{title}</h5>
      <p>
        {books.length || 0} {numberOfBooks}
      </p>
    </>
  )
}

export default UserBooksStats
