import { useSelector } from 'react-redux'
import {  Link } from 'react-router-dom'


const WantToReadList = () => {

  const wantTORead = useSelector(({ userBooks }) =>
    userBooks.filter((books) => books.book_state === 'toRead')
  )
  
  return (
    <>
      {wantTORead.length >= 1 ? wantTORead.map((book) => (
      <div id="productbox" key={book.book_id}> 

      <div className="product">
      <div className="product_img"><img src={book.book_image} alt={book.book_title}/></div>
       <div className="product_content"> 
      <div className="product_title"><Link to={`/books/${book.book_id}`}>{book.book_title}</Link></div>
      <div className="clear"></div>
      <div className="price_info">{book.added}</div>

      </div>
      </div>
      </div>
      )) :  <h1>No book were added yet to this shelf</h1> }

    </>
  )
 
}
export default WantToReadList
