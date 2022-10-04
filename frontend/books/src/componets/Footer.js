import { Box, Typography } from '@mui/material'

const Footer = () => (
  <Box
    bgcolor='red'
    sx={{ position: 'absolute', bottom: '0', left: '0', width: '100%' }}
  >
    <Typography variant='body1'>I'm a footer</Typography>
  </Box>
)

export default Footer
