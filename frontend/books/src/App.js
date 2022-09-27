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
import UserShelve from './componets/UserShelve.js'
import BookService from './services/books'
import AlreadyReadList from './componets/AlreadyReadList'
import { initializeUserBooks } from './reducers/userBooksReducer'
import { initializeUserReading, initializeUserToRead, initializeUserRead } from './reducers/testBookreducer'
import googleService from './services/googleApi'
import CurrentlyReadingList from './componets/CurrentlyReadingList'
import WantToReadList from './componets/WantToReadList'
// soon to implement API to allow user to filter the search
// const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&filter=${filterQuery}&startIndex=20`)

// TODO: Implement Redux persist
// TODO: Improve Layout
// TODO: navigate to home page on logout

function App() {
  const [data, setData] = useState([])
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  // console.log(useSelector(state=>state))



// New API falied to be better performance than the old API
// useEffect(()=>{
//   if(user){
//     const startTime = performance.now()
//     console.log("sending data there")
//     dispatch(initializeUserReading())
//     // dispatch(initializeUserToRead())
//     // dispatch(initializeUserRead())
    
//     const endTime = performance.now()
//    console.log(`Call to 3 dispatches took ${endTime - startTime} milliseconds`)
//   }
// },[user,dispatch])
// ///////////////////////////////////////////////////////////////////////////////


  // make sure to not run this hook unless there is a user , or the server will not reponse and the frontend will get error
  useEffect(() => {
    if (user) {
      const startTime = performance.now()

      dispatch(initializeUserBooks())
      const endTime = performance.now()

      console.log(`Call to 1 dispatches took ${endTime - startTime} milliseconds`)
    }
  }, [user, dispatch])

  useEffect(() => {
    const booksData = JSON.parse(window.localStorage.getItem('lastSearch'))
    if(typeof booksData === 'undefined'){
      setData([])
    }
   else if (booksData) {
      setData(booksData.books)
    } 
  }, [])

  const decoration = { textDecoration: 'none', color: 'black', padding: '5px' }

  //   google API to get the books
  const handleSearch =  (query) => {
    // clearing the data each time a research is made to give some nice styling and not make the site just static
    setData([])
    googleService.searchBooks(query)
    .then(data=>setData(data))  
    .catch((error) => console.log(error))
  }

  

  // get the user token if the user was logged in
  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(loginUser(userFromStorage))
    }
  }, [dispatch])

  // logout and destroy token
  const logout = () => {
    logService.logout()
    userService.clearUser()
    dispatch(logoutUser())
    setData([])
  }

  // to prevent crashes

  // TODO: Create Navbar component and move logic there
  const resetStorage = ()=>{
    console.log("hello")
    window.localStorage.removeItem('lastSearch')
    setData([])
   }  
 
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
                  <Link to='/my-shelve' style={decoration}>
                    My Shelve
                  </Link>
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
                <SearchForm handleSearch={handleSearch} resetStorage={resetStorage}/> <Books data={data} />{' '}
              </>
            }
          />
          {/* for now this path is only accessed if the user is not authinticated , after adding new routes and feature we will create a private router */}
          <Route
            path='/register'
            element={!user ? <Register /> : <Navigate replace to='/login' />}
          />

          <Route path='/login' element={<LoginForm />} />
          <Route path='/my-shelve' element={<UserShelve />} />
          <Route path='/my-shelve/read-books' element={<AlreadyReadList />} />
          <Route path='/my-shelve/reading-books' element={<CurrentlyReadingList />} />
          <Route path='/my-shelve/want-to-read-books' element={<WantToReadList />} />

        </Routes>
      </div>
    </>
  )
}

export default App
