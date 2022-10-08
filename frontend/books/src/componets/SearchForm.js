// import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import pic from '../images/Books-icon-book-new.png'
import { useField } from '../hooks/fields'
import {
  Box,
  Button,
  InputBase,
  FormControl,
  FormGroup,
  TextField,
  InputAdornment,
} from '@mui/material'
import { Clear, Search } from '@mui/icons-material'

const SearchForm = ({ handleSearch, resetStorage }) => {
  // we can implement it with redux toolkit
  // the logic behind the search form, the function responsiable for calling the api is in App.js
  // you could find the hook in the hooks directory
  const query = useField('searchBooks')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (query.value === '') {
      return
    }
    handleSearch(query.value)
  }

  const handleReset = () => {
    query.onSubmit()
    resetStorage()
  }

  return (
    <>
      <Box sx={{ py: 1, my: 1 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            variant='standard'
            type='search'
            {...query}
            fullWidth
            placeholder='Search your books...'
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position='end'
                  sx={{
                    visibility: query.value ? 'visible' : 'hidden',
                    '&:hover': { cursor: 'pointer' },
                  }}
                  onClick={handleReset}
                >
                  <Clear />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: 'white',
              p: 1.5,
              borderRadius: 8,
              fontSize: 20,
              boxShadow: 5,
            }}
          />
        </form>
      </Box>
    </>
  )
}

export default SearchForm
