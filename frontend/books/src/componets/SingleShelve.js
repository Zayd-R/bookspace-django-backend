import { Box, List, ListItem, Paper, Rating, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

const SingleShelve = ({ title }) => {
  const books = useLocation().state

  const navigate = useNavigate()

  return (
    <>
      <Paper sx={{ p: 2, mt: 1 }}>
        <Typography
          variant='h3'
          component='h1'
          sx={{ textAlign: { xs: 'center', sm: 'left' } }}
        >
          {title}
        </Typography>
      </Paper>
      <List sx={{ width: '100%' }}>
        {books.length >= 1 ? (
          books.map((book) => (
            <Paper key={book.book_id}>
              <ListItem
                onClick={() => navigate(`/books/${book.book_id}`)}
                sx={{
                  mb: 1,
                  '&:hover': {
                    boxShadow: 3,
                    bgcolor: '#03678b',
                    cursor: 'pointer',
                  },
                }}
              >
                <Box display='flex' sx={{ py: 1 }}>
                  <Box
                    component='img'
                    src={book.book_image}
                    alt={book.book_title}
                    sx={{ maxWidth: 300, height: 'auto' }}
                  />
                  <Box>
                    <Box sx={{ p: 1, px: { sm: 4 } }}>
                      <Typography variant='h5'>{book.book_title}</Typography>
                      <Rating
                        readOnly
                        name='size-large'
                        value={book.review}
                        size='large'
                        sx={{ my: 1 }}
                      />
                      <Typography variant='body1'>
                        Saved on {new Date(book.added).toDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
            </Paper>
          ))
        ) : (
          <Paper
            sx={{
              height: '60vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant='h4' sx={{ p: 2 }}>
              No book were added yet to this shelf
            </Typography>
          </Paper>
        )}
      </List>
    </>
  )
}

export default SingleShelve
