import { Box, Link, Typography } from '@mui/material'

const Footer = () => (
  <footer>
    <Box
      sx={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '4rem',
      }}
      bgcolor='black'
      display='flex'
      flexDirection='row'
      justifyContent='center'
      alignItems='center'
    >
      <Typography variant='body1' color='white'>
        Developed by{' '}
        <Link
          underline='none'
          href='https://github.com/Zayd123mouses'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Typography variant='footerLinks'>Zayd</Typography>
        </Link>
        <Typography variant='body1' component='span' fontSize='inherit'>
          {' '}
          &{' '}
        </Typography>
        <Link
          underline='none'
          href='https://github.com/pablo-maff'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Typography variant='footerLinks'>Pablo</Typography>
        </Link>
      </Typography>
    </Box>
  </footer>
)

export default Footer
