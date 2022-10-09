import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import search from '../images/search_1.png'
import BookCard from './BookCard'
import BasicPagination from './BasicPagination'

// list of Books based on query
const Books = ({ searchResult }) => {
  // basic logic to make some pagination
  const lastSearch = JSON.parse(window.localStorage.getItem('lastSearch'))
  const [currentPage, setCurrentPage] = useState(lastSearch?.currentPage || 1)
  const [currentSearch, setCurrentSearch] = useState(lastSearch?.query || '')

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

  const DATA_LIMIT = 12
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

  // const sortedBooks = getPaginatedData().sort((a, b) => {
  //   // console.log(b.searchInfo?.textSnippet.length)
  //   return b.searchInfo?.textSnippet.length - a.searchInfo?.textSnippet.length
  // })

  return (
    <>
      <Box sx={{ my: 1 }}>
        {/* <Masonry
          columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          spacing={2}
          sx={{
            pb: 2,
            pr: 2,
            mt: 2,
            mx: 'auto',
          }}
        > */}
        <Grid
          container
          spacing={2}
          sx={{
            pb: 2,
            pr: 2,
            mt: 2,
            mx: 'auto',
          }}
        >
          {getPaginatedData().map((book) => (
            <Grid item key={book.id} xs={12} sm={4} md={4} lg={3}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
        {/* </Masonry> */}
      </Box>
      <Box display='flex' justifyContent='center' sx={{ mb: 1 }}>
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
