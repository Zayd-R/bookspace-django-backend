// this is just for testing purposes , and it failed to be better performance than the pervious API

import { createSlice } from '@reduxjs/toolkit'
import bookService from '../services/books'
// import { setNotification } from './notificationReducer'
// import { appendUserBook } from './usersReducer'
const initialState = {"reading":null,
                "read": null,
                "toRead":null
                }
                
const bookSlice = createSlice({
  name: 'userBooks',
  initialState,
  reducers: {
    userReading(state, action) {
        console.log("the data in action")
        console.log(action)
      state.reading = action.payload
    },
    userToRead(state,action){
       console.log(action.payload)
       state.read = action.payload
    },
    userRead(state,action){
        console.log(action.payload)
        state.toRead = action.payload

     },
   
  },
})

export const {
    userReading,
    userToRead,
    userRead

} = bookSlice.actions

export const initializeUserReading= () => {
    return async (dispatch) => {
      const booksReading = await bookService.TestNewAPI('reading')
      const booksToRead = await bookService.TestNewAPI('toRead')
      const booksRead = await bookService.TestNewAPI('read')

      dispatch(userReading(booksReading))
      dispatch(userToRead(booksToRead))
      dispatch(userRead(booksRead))

    }
  }

export const initializeUserToRead= () => {
    return async (dispatch) => {
        const booksToRead = await bookService.TestNewAPI('toRead')
        dispatch(userToRead(booksToRead))
    }}

export const initializeUserRead= () => {
        return async (dispatch) => {
            const booksRead = await bookService.TestNewAPI('read')
            dispatch(userRead(booksRead))

        }}



  export default bookSlice.reducer
