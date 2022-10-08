import { useState, useEffect } from 'react'
import Books from './componets/Books'
import SearchForm from './componets/SearchForm'
import { Routes, Route, Navigate } from 'react-router-dom'

import HomePage from './componets/HomePage'
import Book from './componets/Book'
import { useDispatch, useSelector } from 'react-redux'
import userService from './services/user'
import { loginUser } from './reducers/userReducer'
import LoginForm from './componets/LoginForm'
import Register from './componets/Register'
import UserShelve from './componets/UserShelve.js'
import AlreadyReadList from './componets/AlreadyReadList'
import Notification from './componets/notification'
import About from './componets/About'
import { initializeUserBooks } from './reducers/userBooksReducer'

import googleService from './services/googleApi'
import CurrentlyReadingList from './componets/CurrentlyReadingList'
import WantToReadList from './componets/WantToReadList'
import ResponsiveAppBar from './componets/ResponsiveNavbar'
import Footer from './componets/Footer'
// soon to implement API to allow user to filter the search
// const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&filter=${filterQuery}&startIndex=20`)

// TODO: Implement Redux persist
// TODO: Improve Layout
// TODO: navigate to home page on logout

function App() {
  const [searchResult, setSearchResult] = useState({
    items: [],
    totalItems: null,
  })
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  // console.log(useSelector(state=>state))

  // New API falied to be better performance than the old API
  // useEffect(()=>{
  //   if(user){
  //     const startTime = performance.now()
  //     console.log("sending searchResult there")
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
      dispatch(initializeUserBooks())

      // console.log(`Call to 1 dispatches took ${endTime - startTime} milliseconds`)
    }
  }, [user, dispatch])

  useEffect(() => {
    const booksData = JSON.parse(window.localStorage.getItem('lastSearch'))
    if (typeof booksData === 'undefined') {
      setSearchResult({ items: [], totalItems: null })
    } else if (booksData) {
      setSearchResult(booksData.books)
    }
  }, [])

  //   google API to get the books
  const handleSearch = (query) => {
    // clearing the searchResult each time a research is made to give some nice styling and not make the site just static
    window.localStorage.removeItem('lastSearch')
    setSearchResult({ items: [], totalItems: null })
    googleService
      .searchBooks(query)
      .then((searchResult) => setSearchResult(searchResult))
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

  // to prevent crashes

  // TODO: Create Navbar component and move logic there
  const resetStorage = () => {
    window.localStorage.removeItem('lastSearch')
    setSearchResult({ items: [], totalItems: null })
  }

  return (
    <>
      <ResponsiveAppBar setSearchResult={setSearchResult} />

      <div className='container'>
        <Notification />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route exact path='/books/:id' element={<Book />} />
          <Route
            exact
            path='/search'
            element={
              <>
                <SearchForm
                  handleSearch={handleSearch}
                  resetStorage={resetStorage}
                />
                <Books searchResult={searchResult} />
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
          <Route
            path='/my-shelve/reading-books'
            element={<CurrentlyReadingList />}
          />
          <Route
            path='/my-shelve/want-to-read-books'
            element={<WantToReadList />}
          />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </>
  )
}

export default App
