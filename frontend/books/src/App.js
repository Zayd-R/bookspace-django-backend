import { useState, useEffect } from 'react'
import axios from 'axios'
import Books from './componets/Books'
import SearchForm from './componets/SearchForm'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Button } from 'react-bootstrap'

import HomePage from './componets/HomePage'
import Book from './componets/Book'
import { useDispatch, useSelector } from 'react-redux'
import userService from './services/user'
import { loginUser, logoutUser } from './reducers/userReducer'
import logService from './services/login'
import LoginForm from './componets/LoginForm'
import Register from './componets/Register'

// soon to implement API to allow user to filter the search
// const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&filter=${filterQuery}&startIndex=20`)

// TODO: Implement Redux persist
// TODO: Improve Layout
// TODO: Fix Navbar routes

function App() {
  const [data, setData] = useState([])
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  // console.log(user)

  const decoration = { textDecoration: 'none', color: 'black', padding: '5px' }

  //   google API to get the books
  const handleSearch = (query) => {
    // clearing the data each time a research is made to give some nice styling and not make the site just static
    setData([])
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40 `
      )
      .then((result) => {
        setData(result.data.items)
        console.log(result.data.items)
      })
      .catch((error) => console.log(error))
  }

  // still testing the auth functions I made to the backend , you could see all the api you could use in the service directory,
  // I all add new API endpoints each time I finish one
  // useEffect(()=>{
  //   axios.post('http://127.0.0.1:8000/api-token-auth/',{"username":"zayd", "password":123456})
  //   .then(Token=>console.log(Token.data))
  //   .catch(error=>console.log(error))
  // },[])

  // get the user token if the user was logged in
  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(loginUser(userFromStorage))
    }
  }, [])

  // logout and destroy token
  const logout = () => {
    logService.logout()
    userService.clearUser()
    dispatch(logoutUser())
  }

  // to prevent crashes

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Link to='/' style={decoration}>
            {' '}
            <Navbar.Brand style={{ color: 'blueViolite' }}>
              {' '}
              BookSpace{' '}
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Link to='/' style={decoration}>
                Home
              </Link>
              <Link to='/search' style={decoration}>
                Search
              </Link>
              {user ? (
                <>
                  <Link style={decoration}>Favorite</Link>
                  <Link onClick={logout} style={decoration}>
                    Logout
                  </Link>
                </>
              ) : (
                <Link style={decoration} to='/login'>
                  Login
                </Link>
              )}

              <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.4'>
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className='container'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route exact path='/books/:id' element={<Book />} />
          <Route
            exact
            path='/search'
            element={
              <>
                <SearchForm handleSearch={handleSearch} /> <Books data={data} />{' '}
              </>
            }
          />
          {/* for now this path is only accessed if the user is not authinticated , after adding new routes and feature we will create a private router */}
          <Route
            path='/register'
            element={!user ? <Register /> : <Navigate replace to='/login' />}
          />

          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </div>
    </>
  )
}

export default App
