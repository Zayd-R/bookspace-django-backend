import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './store'
import { createTheme, ThemeProvider } from '@mui/material'
import { red } from '@mui/material/colors'
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"

const theme = createTheme({
  palette: {
    secondary: {
      main: '#CCC',
    },
    myCustomColor: {
      main: red[400],
      superDark: red[800],
      superLight: red[100],
    },
  },
  typography: {
    myVariant: {
      // I can pass myVariant as variant instead of h1,h2, etc.
      fontSize: '3rem',
    },
    navBarLinks: {
      my: 2,
      padding: '5px',
      '&:hover': {
        borderBottom: '3px solid white',
      },
    },
    footerLinks: {
      color: 'white',
      '&:hover': {
        borderBottom: '3px solid white',
      },
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
