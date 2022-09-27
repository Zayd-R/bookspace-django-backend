import { useSelector } from 'react-redux'


const WantToReadList = () => {

  const currentlyReading = useSelector(({ userBooks }) =>
    userBooks.filter((books) => books.book_state === 'toRead')
  )
  
  
  return (
    <>
      <h2>Books you want to read</h2>
      {currentlyReading.length > 1 ? currentlyReading.map((books) => (
        <h3 key={books.book_id}>{books.book_title}</h3>
      )) :  <h1>No book were added yet to this shelf</h1> }
    </>
  )
 
}
export default WantToReadList
