// this is just for testing purposes , and it failed to be better performance than the pervious API

import { createSlice } from '@reduxjs/toolkit'
import bookService from '../services/books'
// import { setNotification } from './notificationReducer'
// import { appendUserBook } from './usersReducer'
const initialState = { reading: null, read: null, toRead: null }

const testSlice = createSlice({
  name: 'testReducer',
  initialState,
  reducers: {
    userReading(state, action) {
      state.reading = action.payload
    },
    userToRead(state, action) {
      state.read = action.payload
    },
    userRead(state, action) {
      state.toRead = action.payload
    },
  },
})

export const { userReading, userToRead, userRead } = testSlice.actions

export const initializeUserReading = () => {
  return async (dispatch) => {
    const booksReading = await bookService.TestNewAPI('reading')
    const booksToRead = await bookService.TestNewAPI('toRead')
    const booksRead = await bookService.TestNewAPI('read')

    dispatch(userReading(booksReading))
    dispatch(userToRead(booksToRead))
    dispatch(userRead(booksRead))
  }
}

export const initializeUserToRead = () => {
  return async (dispatch) => {
    const booksToRead = await bookService.TestNewAPI('toRead')
    dispatch(userToRead(booksToRead))
  }
}

export const initializeUserRead = (booksRead) => {
  return async (dispatch) => {
    dispatch(userRead(booksRead))
  }
}

export default testSlice.reducer
