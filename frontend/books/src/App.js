import { useState, useEffect } from 'react'
import axios from 'axios'
import Books from './componets/Books';
import SearchForm from './componets/SearchForm';
import {
  useMatch,
  Routes, Route, Link
} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HomePage from './componets/HomePage';
import Book from './componets/Book';
// const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&filter=&startIndex=20`)
// const result2 = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=20`)



function App() {
  const [data, setData] = useState([])
 const decoration = {textDecoration: 'none', color: 'black', padding: '5px'}
//   google API to get the books
  const handleSearch =  (query)=>{
    // clearing the data each time a research is made to give some nice styling and not make the site just static
    setData([])
   axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40 `)
    .then(result=>{
      setData(result.data.items)
      console.log(result.data.items);
    })
    .catch(error=>console.log(error))
  }

// still testing the auth functions I made to the backend , you could see all the api you could use in the service directory,
// I all add new API endpoints each time I finish one
  useEffect(()=>{
    axios.post('http://127.0.0.1:8000/api-token-auth/',{"username":"zayd", "password":123456})
    .then(Token=>console.log(Token.data))
    .catch(error=>console.log(error))
  },[])

  // to prevent crashes
  if(data === []){
    return(
      <h1>loading....</h1>
    )
  }
  return (
    <>
      <Navbar bg="light" expand="lg">
      <Container>
      <Link to='/' style={decoration}> <Navbar.Brand style={{color:"blueViolite"}}> BookSpace </Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link style={decoration}>Home</Link> 
            <Link style={decoration}>Faviourate</Link>
           <Link style={decoration}>Login</Link> 
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <div className="container">
    
  <Routes>
    <Route path="/"  element={<HomePage />} />
    <Route exact path="/books/:id"  element={<Book />} />

    <Route exact  path="/search"  element={<><SearchForm handleSearch={handleSearch} />  <Books data={data}/> </>} />
    


  </Routes>

    </div>
    </>
  )
}

export default App;
