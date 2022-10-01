import { Link } from 'react-router-dom'
import { Box, Button, Grid, Typography } from '@mui/material'
// basic homepage that still need styling.
const HomePage = () => {
  //TODO: Improve typography
  //TODO: Use theme in index.js to generalize some customized components
  //TODO: Create footer
  //TODO: Change grid containers to work with flexbox instead of grid values
  return (
    <>
      <Box sx={{ mt: '80px' }}>
        <Grid container spacing={22}>
          {/* <Box sx={{ display: 'flex', mt: '100px' }}> */}
          <Grid item xs={6} sx={{ mt: 6 }}>
            <Typography variant='myVariant'>
              Find the books you are looking for anywhere
            </Typography>
            <Typography variant='body1' sx={{ mt: 6, fontSize: 18 }}>
              Search for books anywhere, you don't need to know the name of the
              book, you can search by author or publisher, just type and search.
            </Typography>
            {/* sx: p:2 = padding = 2 * default theme spacing(8px) = 16 px. To scale up or down you can change default theme spacing */}
            <Button
              component={Link}
              to='/search'
              sx={{ mt: 6, py: 2, px: 12 }}
              variant='contained'
            >
              Search now
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Box
              component='img'
              alt='People searching books on laptops'
              src='https://raw.githubusercontent.com/LuisFrag/booksure/c60a884400543991c0b62ae42af2afbb00203d98/src/assets/svg/main-apresentation.svg'
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Box
          sx={{
            height: '32rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant='h4' sx={{ width: 600, textAlign: 'center' }}>
            THE IMPORTANCE OF READING BOOKS
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mb: 16 }}>
        <Grid container spacing={22}>
          <Grid item xs={8} sx={{ mt: 8 }}>
            <Typography variant='h5'>
              READING PRACTICE IMPROVES VOCABULARY
            </Typography>
            <Typography
              variant='body1'
              sx={{ mt: 6, fontSize: 18, marginRight: 45 }}
            >
              Whether for pleasure, study or information, reading practice
              improves vocabulary and streamlines reasoning and interpretation.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Box
              component='img'
              alt='Person reading a book'
              src='https://raw.githubusercontent.com/LuisFrag/booksure/c60a884400543991c0b62ae42af2afbb00203d98/src/assets/svg/home-1.svg'
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mb: 16 }}>
        <Grid container spacing={22}>
          <Grid item xs={4}>
            <Box
              component='img'
              alt='Person reading a book'
              src='https://raw.githubusercontent.com/LuisFrag/booksure/c60a884400543991c0b62ae42af2afbb00203d98/src/assets/svg/home-2.svg'
            />
          </Grid>
          <Grid item xs={8} sx={{ mt: 8 }}>
            <Typography variant='h5' align='right'>
              ADVANCING TECHNOLOGY
            </Typography>
            <Typography
              variant='body1'
              align='right'
              sx={{ mt: 6, fontSize: 18, marginLeft: 45 }}
            >
              With the advancement of technologies in the modern world, people
              are less and less interested in reading.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mb: 16 }}>
        <Grid container spacing={22}>
          <Grid item xs={8} sx={{ mt: 8 }}>
            <Typography variant='h5'>DYNAMIC READING</Typography>
            <Typography
              variant='body1'
              sx={{ mt: 6, fontSize: 18, marginRight: 45 }}
            >
              Dynamic and relaxed reading is one of the best ways to acquire
              information. The ideal is to learn to read informative texts,
              scientific articles, textbooks, educational books, etc.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Box
              component='img'
              alt='Person sitting on a couch while using a laptop'
              src='https://raw.githubusercontent.com/LuisFrag/booksure/c60a884400543991c0b62ae42af2afbb00203d98/src/assets/svg/home-3.svg'
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          bgcolor: '#a2d2ff',
          height: 500,
        }}
      >
        <Typography variant='h3' sx={{ mx: 25, textAlign: 'center' }}>
          ALL THE BOOKS YOU LOOK FOR IN ONE PLACE
        </Typography>
        <Box
          component='img'
          alt='Person sitting on a pile of books while reading on a laptop'
          src='https://raw.githubusercontent.com/LuisFrag/booksure/c60a884400543991c0b62ae42af2afbb00203d98/src/assets/svg/home-4.svg'
        />
      </Box>
      <Box sx={{ mb: 20 }}>
        <Grid container direction='row' justifyContent='space-around'>
          <Grid item>
            <Box
              component='img'
              alt='Person sitting on a pile of books while reading on a laptop'
              src='https://raw.githubusercontent.com/LuisFrag/booksure/c60a884400543991c0b62ae42af2afbb00203d98/src/assets/svg/home-5.svg'
            />
            <Typography
              variant='body1'
              sx={{ fontSize: 18, maxWidth: '18rem', textAlign: 'center' }}
            >
              Download samples in PDF or EPUB of your favorite books
            </Typography>
          </Grid>
          <Grid item>
            <Box
              component='img'
              alt='Person sitting on a pile of books while reading on a laptop'
              src='https://raw.githubusercontent.com/LuisFrag/booksure/c60a884400543991c0b62ae42af2afbb00203d98/src/assets/svg/home-6.svg'
            />
            <Typography
              variant='body1'
              sx={{ fontSize: 18, maxWidth: '18rem', textAlign: 'center' }}
            >
              Buy the books you're looking for from your phone or PC
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography variant='h5' textAlign='center'>
          THE TECHNOLOGIES USED
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            mb: 10,
          }}
        >
          <Box
            component='img'
            alt='React logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png'
            sx={{ maxWidth: '65px', maxHeight: '65px', m: 2 }}
          />
          <Box
            component='img'
            alt='Django logo'
            src='https://cdn.iconscout.com/icon/free/png-256/django-13-1175187.png'
            sx={{ maxWidth: '65px', maxHeight: '65px', m: 2 }}
          />
          <Box
            component='img'
            alt='Google logo'
            src='https://raw.githubusercontent.com/LuisFrag/booksure/c60a884400543991c0b62ae42af2afbb00203d98/src/assets/svg/google.svg'
            sx={{ maxWidth: '65px', maxHeight: '65px', m: 2 }}
          />
        </Box>
      </Box>
    </>
  )
}

export default HomePage
