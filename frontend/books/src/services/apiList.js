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
// still need to be tested


