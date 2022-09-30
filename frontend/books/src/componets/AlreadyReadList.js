import { useSelector } from 'react-redux'
import {Link} from "react-router-dom"
import { Rating } from '@mui/material';


const AlreadyReadList = () => {

  const booksRead = useSelector(({ userBooks }) =>
    userBooks.filter((books) => books.book_state === 'read')
  )

  return (
    <>
      <h2>Books Read</h2>
      {booksRead.map((book) => (

<div id="productbox" key={book.book_id}> 

<div className="product">
<div className="product_img"><img src={book.book_image} alt={book.book_title}/></div>
 <div className="product_content"> 
<div className="product_title"><Link to={`/books/${book.book_id}`}>{book.book_title}</Link></div>
<div className="clear"></div>
<div className="price_info"> You rated it <Rating name="size-small" defaultValue={book.review}  size="small" />
</div>
<div className="clear"></div>
<div className="price_info">{book.added}</div>

</div>
</div>
</div>

      ))}
    </>
  )
 
}
export default AlreadyReadList
