// API for getting the token from the backend 
// must send the credits as follows {"username": "some username", "password": "some password"}
" http://127.0.0.1:8000/users/login/"
// You could see how to use it ,as i did in the app.js file



// API to logout user and destroy the Token 
"http://127.0.0.1:8000/users/logout/"
// naturally only authinticated users can log out , so send the token in the Header in this format
// {
//  header: {"Authorization": `TOKEN <token>`}
// }
// the string TOKEN must be upperCase



// API to create new users
"http://127.0.0.1:8000/users/register/"
//  must provide username , password, and confirmation password, firstName, lastName


// API to get list of books of particular user
"http://127.0.0.1:8000/books-api/books/"
// { book_title, book_image, book_state, book_id, user_id}  this what will come back
// this endpoint for authiticated users only 
// we will sort each book in it is categorie based on the state that cameback

// to add new book , send post request with this data  {book_title, book_id, book_image, book_state, user_id}

// username = testuser , password = helloworld999 , you can use this user to test some functionality or create user yourself


// API to update the book state 
// "http://127.0.0.1:8000/books-api/books/${book_id}" , book_id is the id we get from google api search

// book_state must be one of three values : toRead, reading, read
// for now we must send the data as follows
// {book_title, book_id, book_image, book_state, user_id}
// maybe we will change afterwords so we no longer have to send the user_id as will , but let's work with this for now
// this endpoint support delete as well


