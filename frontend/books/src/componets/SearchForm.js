import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import pic from '../images/Books-icon-book-new.png'
import { useField } from '../hooks/fields'

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
      <Form onSubmit={handleSubmit}>
        <div className='containers d-flex justify-content-center'>
          <div className='input-group col-sm-7  input-group-lg'>
            <div className='input-group-prepend'>
              <span className='input-group-text google'>
                <img src={pic} alt='book icon' />
              </span>
            </div>
            <input
              {...query}
              className='form-control'
              placeholder='Search your books...'
            />
            <Button type='submit' variant='info'>
              Submit{' '}
            </Button>

            <Button onClick={handleReset} variant=''>
              Reset
            </Button>
          </div>
        </div>
      </Form>
    </>
  )
}

export default SearchForm
