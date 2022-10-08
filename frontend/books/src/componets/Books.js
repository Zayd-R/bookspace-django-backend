import { Box } from '@mui/material'
import Masonry from '@mui/lab/Masonry'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import search from '../images/search_1.png'
import { setNotification } from '../reducers/notificationReducer'
import BookCard from './BookCard'
import BasicPagination from './BasicPagination'

// list of Books based on query
const Books = ({ searchResult }) => {
  // basic logic to make some pagination
  const lastSearch = JSON.parse(window.localStorage.getItem('lastSearch'))
  const [currentPage, setCurrentPage] = useState(lastSearch?.currentPage || 1)
  const [currentSearch, setCurrentSearch] = useState(lastSearch?.query || '')

  const dispatch = useDispatch()

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

  const { items, totalItems } = searchResult

  useEffect(() => {
    if (totalItems === 0) {
      dispatch(
        setNotification('No results, try a different search term', 'error')
      )
    }
  }, [totalItems, dispatch])

  const DATA_LIMIT = 9
  const PAGES = Math.ceil(items.length / DATA_LIMIT)

  // the number of pages after search is made
  const array = []
  for (let i = 1; i <= PAGES; i++) {
    array.push(i)
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  //  slice the books list to show 9 books per page
  const getPaginatedData = () => {
    const startIndex = currentPage * DATA_LIMIT - DATA_LIMIT
    const endIndex = startIndex + DATA_LIMIT
    return items.slice(startIndex, endIndex)
  }

  if (items.length < 1) {
    return (
      <>
        <br />
        <br />
        <br />
        {searchResult.totalItems === 0 ? (
          <p>Not found, try a different search term</p>
        ) : null}
        <div className='pagination container'>
          <img src={search} alt='book pic' width='20%' />
        </div>
        <br />
        <h6 className='font-weight-light text-home-secondary text-center text-md-left'>
          {' '}
          You don't need to know the name of the book, if you know the name of
          the author or publisher, just type, search and find{' '}
        </h6>
      </>
    )
  }

  return (
    <>
      <Box sx={{ my: 2 }}>
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          spacing={2}
          sx={{
            pb: 2,
            pr: 2,
            mt: 2,
            mx: 'auto',
          }}
        >
          {getPaginatedData().map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </Masonry>
      </Box>
      <Box display='flex' justifyContent='center' sx={{ mb: 2 }}>
        <BasicPagination
          nPages={PAGES}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </Box>
    </>
  )
}

export default Books
