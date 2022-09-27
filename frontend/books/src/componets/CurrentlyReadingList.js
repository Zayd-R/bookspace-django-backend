import { useSelector } from 'react-redux'


const CurrentlyReadingList = () => {

  const currentlyReading = useSelector(({ userBooks }) =>
    userBooks.filter((books) => books.book_state === 'reading')
  )
  
  
  return (
    <>
      <h2>Books you are reading</h2>
      {currentlyReading.length > 1 ? currentlyReading.map((books) => (
        <h3 key={books.book_id}>{books.book_title}</h3>
      )) :  <h1>No book were added yet to this shelf</h1> }
    </>
  )
 
}
export default CurrentlyReadingList
