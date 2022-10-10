import { useSelector } from 'react-redux'

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  if (notification.message === null) {
    return null
  }

  if(notification.type === 'error'){
    return(
        <Stack sx={{ width: '100%', padding:'5px' }} spacing={2}>
    <Alert severity={notification.type}>
      <AlertTitle>Error</AlertTitle>
      {notification.message} 
    </Alert>
    </Stack>

    )
  }

  return (
    <Stack sx={{ width: '100%', padding:'5px' }} spacing={2}>
    <Alert severity={notification.type}>
      <AlertTitle>Success</AlertTitle>
      {notification.message} 
    </Alert>
  </Stack>
  )
}

export default Notification