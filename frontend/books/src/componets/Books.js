import { Box, Typography } from '@mui/material'
import Masonry from '@mui/lab/Masonry'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import search from '../images/search_1.png'
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
  
  const DATA_LIMIT = 9
  const PAGES = Math.ceil(items.length / DATA_LIMIT)

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
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{ p: 1, m: 1 }}
      >
        {searchResult.totalItems === 0 ? (
          <Typography variant='h5' textAlign='center' sx={{ p: 1, m: 1 }}>
            Not found, try a different search term...
          </Typography>
        ) : null}
        <Box component='img' src={search} alt='book pic' sx={{ p: 1, m: 1 }} />
        <Typography
          variant='h6'
          textAlign='center'
          maxWidth={700}
          sx={{ p: 1, m: 1 }}
        >
          You don't need to know the name of the book. If you know the name of
          the author or publisher, just type, search and read
        </Typography>
      </Box>
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
