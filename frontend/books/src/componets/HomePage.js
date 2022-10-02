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
      <Grid container sx={{ height: 'auto' }}>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={12} sx={{ mt: 6 }}>
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
              sx={{ mt: 6, py: 2, px: 8 }}
              variant='contained'
            >
              Search now
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={12} sx={{ p: '2rem' }}>
            <Box
              component='img'
              alt='People searching books on laptops'
              src='https://raw.githubusercontent.com/LuisFrag/booksure/c60a884400543991c0b62ae42af2afbb00203d98/src/assets/svg/main-apresentation.svg'
              sx={{ width: '100%', height: 'auto' }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          my: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h4' sx={{ maxWidth: 600, textAlign: 'center' }}>
          THE IMPORTANCE OF READING BOOKS
        </Typography>
      </Box>
      <Grid container sx={{ height: 'auto', mb: 16 }}>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={12} sx={{ mt: 8 }}>
            <Typography variant='h5'>
              READING PRACTICE IMPROVES VOCABULARY
            </Typography>
            <Typography variant='body1' sx={{ mt: 6, fontSize: 18 }}>
              Whether for pleasure, study or information, reading practice
              improves vocabulary and streamlines reasoning and interpretation.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={12} sx={{ p: '2rem' }}>
            <Box
              component='img'
              alt='Person reading a book'
              src='https://raw.githubusercontent.com/LuisFrag/booksure/c60a884400543991c0b62ae42af2afbb00203d98/src/assets/svg/home-1.svg'
              sx={{ width: '100%', height: 'auto' }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ height: 'auto', mb: 16 }}>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={12} sx={{ p: '2rem' }}>
            <Box
              component='img'
              alt='Person reading a book'
              src='https://raw.githubusercontent.com/LuisFrag/booksure/c60a884400543991c0b62ae42af2afbb00203d98/src/assets/svg/home-2.svg'
              sx={{ width: '100%', height: 'auto' }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={12} sx={{ mt: 8 }}>
            <Typography variant='h5'>ADVANCING TECHNOLOGY</Typography>
            <Typography variant='body1' sx={{ mt: 6, fontSize: 18 }}>
              With the advancement of technologies in the modern world, people
              are less and less interested in reading.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ height: 'auto', mb: 16 }}>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={12} sx={{ mt: 8 }}>
            <Typography variant='h5'>DYNAMIC READING</Typography>
            <Typography variant='body1' sx={{ mt: 6, fontSize: 18 }}>
              Dynamic and relaxed reading is one of the best ways to acquire
              information. The ideal is to learn to read informative texts,
              scientific articles, textbooks, educational books, etc.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={12} sx={{ p: '2rem' }}>
            <Box
              component='img'
              alt='Person reading a book'
              src='https://raw.githubusercontent.com/LuisFrag/booksure/c60a884400543991c0b62ae42af2afbb00203d98/src/assets/svg/home-3.svg'
              sx={{ width: '100%', height: 'auto' }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          height: 'auto',
          mb: 4,
          bgcolor: '#a2d2ff',
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}
        >
          <Typography variant='h3' sx={{ maxWidth: 500, textAlign: 'center' }}>
            ALL THE BOOKS YOU LOOK FOR IN ONE PLACE
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{ py: '2rem', display: 'flex', justifyContent: 'center' }}
        >
          <Box
            component='img'
            alt='Person reading a book'
            src='https://raw.githubusercontent.com/LuisFrag/booksure/c60a884400543991c0b62ae42af2afbb00203d98/src/assets/svg/home-4.svg'
            sx={{ width: '50%', height: 'auto' }}
          />
        </Grid>
      </Grid>
      <Box sx={{ mb: 20 }}>
        <Grid container direction='row' justifyContent='space-around'>
          <Grid item sx={{ mb: 8 }}>
            <Box
              component='img'
              alt='Person sitting on a pile of books while reading on a laptop'
              src='https://raw.githubusercontent.com/LuisFrag/booksure/c60a884400543991c0b62ae42af2afbb00203d98/src/assets/svg/home-5.svg'
              sx={{ width: '100%', height: 'auto' }}
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
              sx={{ width: '100%', height: 'auto' }}
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
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        sx={{
          background: 'black',
          height: 'auto',
          mb: 15,
        }}
      >
        <Typography variant='body1' color='white'>
          Developed by Zain & Pablo
        </Typography>
      </Box>
    </>
  )
}

export default HomePage
