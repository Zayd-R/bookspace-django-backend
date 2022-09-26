import { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { Card, CardGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import search from '../images/search_1.png'

// list of Books based on query
const Books = ({ data }) => {
  console.log(window.localStorage, "data")
  // basic logic to make some pagination
  const DATA_LIMIT = 10
  const PAGES = Math.round(data.length / DATA_LIMIT)
  const lastSearch = JSON.parse(window.localStorage.getItem('lastSearch'))
  const [currentPage, setCurrentPage] = useState(lastSearch?.currentPage || 1)
  const [currentSearch, setCurrentSearch] = useState(lastSearch?.query || '')
  const padding = {
    padding: 50,
  }

  // Persisted pagination
  useEffect(() => {
    if (lastSearch?.query) setCurrentSearch(lastSearch.query)
    if (lastSearch?.query === currentSearch) {
      window.localStorage.setItem(
        'lastSearch',
        JSON.stringify({ ...lastSearch, currentPage })
      )
    } else setCurrentPage(1)
  }, [lastSearch, currentPage, currentSearch])

  // the number of pages after search is made
  const array = []
  for (let i = 1; i <= PAGES; i++) {
    array.push(i)
  }

  // next page button
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  // previous page button
  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1)
  }

  // clicking on page numberr
  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent)
    setCurrentPage(pageNumber)
  }

  //  slice the books list to show 10 books per page
  const getPaginatedData = () => {
    const startIndex = currentPage * DATA_LIMIT - DATA_LIMIT
    const endIndex = startIndex + DATA_LIMIT
    return data.slice(startIndex, endIndex)
  }

  if (data.length < 1) {
    return (
      <>
        <br />
        <br />
        <br />

        <div className='pagination container'>
          <img src={search} alt='book pic' width='30%' />
        </div>
      </>
    )
  }

  return (
    <div>
      <CardGroup>
        <div className='parent'>
          {getPaginatedData().map((book) => {
            return (
              <Card style={{ width: '18rem' }} key={book.id}>
                {book.volumeInfo.imageLinks ? (
                  <Card.Img
                    variant='top'
                    src={book.volumeInfo.imageLinks.smallThumbnail}
                  />
                ) : (
                  <Card.Img variant='top' src='' />
                )}
                <Card.Body>
                  <Card.Title>{book.volumeInfo.title}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Link to={`/books/${book.id}`}>
                    <Button variant='primary'>View Book</Button>
                  </Link>
                </Card.Body>
              </Card>
            )
          })}
        </div>
      </CardGroup>
      <div className='pagination'>
        <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        {array.map((item) => {
          return (
            <Button
              key={item}
              onClick={changePage}
              className={`paginationItem ${
                currentPage === item ? 'active' : 'notActive'
              }`}
            >
              <span>{item}</span>
            </Button>
          )
        })}
        <Button onClick={goToNextPage} disabled={currentPage === PAGES}>
          Next
        </Button>
      </div>
      <Pagination />
    </div>
  )
}

export default Books
