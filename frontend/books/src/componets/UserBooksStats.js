import { Avatar, Box, Divider, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const UserBooksStats = ({ books, title }) => {
  const numberOfBooks = books.length === 1 ? 'book' : 'books'

  const navigate = useNavigate()
  let url
  if (title === 'Read') {
    url = 'read-books'
  } else if (title === 'Currently Reading') {
    url = 'reading-books'
  } else {
    url = 'want-to-read-books'
  }

  // TODO: add books images to avatar

  return (
    <Box
      display='flex'
      alignItems='center'
      onClick={() => navigate(`/my-shelve/${url}`, { state: books })}
      className='categories'
      sx={{
        justifyContent: { md: 'center' },
        p: { xs: 1, md: 2 },
        '&:hover': {
          boxShadow: 3,
          bgcolor: '#03678b',
        },
      }}
    >
      <Avatar
        variant='square'
        alt='user profile pic'
        src='https://www.svgrepo.com/show/212744/reading-student.svg'
        sx={{ bgcolor: 'lightblue', width: 72, height: 72 }}
      />
      <Box sx={{ minWidth: { xs: 250, sm: 500 } }}>
        <Box sx={{ ml: 3, my: 1 }}>
          <Typography
            variant='h5'
            fontWeight='bold'
            sx={{ fontSize: { xs: 22, md: 'h5.fontSize' } }}
          >
            {title}
          </Typography>
          <Typography variant='body1'>
            {books.length || 0} {numberOfBooks}
          </Typography>
        </Box>
        <Divider color='black' sx={{ maxWidth: { xs: 200, sm: '100%' } }} />
      </Box>
    </Box>
  )
}

export default UserBooksStats
