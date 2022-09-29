import { useSelector } from 'react-redux'
import {Link} from "react-router-dom"
import { Card, CardGroup, Button } from 'react-bootstrap'


const AlreadyReadList = () => {

  const booksRead = useSelector(({ userBooks }) =>
    userBooks.filter((books) => books.book_state === 'read')
  )

  return (
    <>
      <h2>Books Read</h2>
      {booksRead.map((book) => (

        <Card style={{ width: '18rem' }} key={book.book_id}>
       
          <Card.Img variant='top' src={book.book_image} />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make
            up the bulk of the card's content.
          </Card.Text>
          <Link to={`/books/${book.book_id}`}>
            <Button variant='primary'>View Book</Button>
          </Link>
        </Card.Body>
      </Card>

      ))}
    </>
  )
 
}
export default AlreadyReadList
