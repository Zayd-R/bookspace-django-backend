import { Avatar, Box, Divider, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import LinearProgressWithLabel from './LinnearProgressWithLabel'
import UserBooksStats from './UserBooksStats'

const UserShelve = () => {
  const userBooks = useSelector(({ userBooks }) => userBooks)

  const booksRead = userBooks.filter((books) => books.book_state === 'read')
  const booksReading = userBooks.filter(
    (books) => books.book_state === 'reading'
  )
  const toRead = userBooks.filter((books) => books.book_state === 'toRead')

  // TODO: Add user image to avatar

  return (
    <Grid container sx={{ height: 'auto', mt: 5, mb: 10 }}>
      <Grid
        item
        xs={12}
        sm={12}
        display='flex'
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
        sx={{ mb: 8, mx: 2 }}
      >
        <Avatar
          alt='user profile pic'
          src='https://www.svgrepo.com/show/212744/reading-student.svg'
          sx={{ bgcolor: 'lightblue', width: 82, height: 82, mr: 2 }}
        />
        <Box sx={{ width: '100%' }}>
          <Typography
            variant='h3'
            fontWeight='bold'
            sx={{ pb: 1, fontSize: { xs: 18, md: 32 } }}
          >
            You've read {booksRead.length} of {userBooks.length} books
          </Typography>
          <LinearProgressWithLabel
            value={(booksRead.length / userBooks.length) * 100}
            sx={{ p: { md: 0.6 }, borderRadius: 7 }}
          />
        </Box>
      </Grid>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
        width='100%'
        sx={{ mb: 1 }}
      >
        <Typography variant='h4' component='h1' fontWeight='bold'>
          SHELVES
          <Divider color='black' />
        </Typography>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        width='100%'
        sx={{ md: { mx: 1 } }}
      >
        <UserBooksStats books={booksRead} title={'Read'} />
        <UserBooksStats books={booksReading} title={'Currently Reading'} />
        <UserBooksStats books={toRead} title={'Want to Read'} />
      </Box>
    </Grid>
  )
}

export default UserShelve
