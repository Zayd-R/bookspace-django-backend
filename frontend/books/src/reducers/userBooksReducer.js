import { createSlice } from '@reduxjs/toolkit'
import bookService from '../services/books'
// import { setNotification } from './notificationReducer'
// import { appendUserBook } from './usersReducer'

const bookSlice = createSlice({
  name: 'userBooks',
  initialState: [],
  reducers: {
    setUserBooks(state, action) {
      return action.payload
    },
    appendBook(state, action) {
      return [...state, action.payload]
    },
    updateBook(state, action) {
      return state.map((book) =>
        book.id !== action.payload.id ? book : action.payload
      )
    },
    deleteBook(state, action) {
      return state.filter((book) => book.id !== action.payload)
    },
    appendComment(state, action) {
      const { bookID, ...comment } = action.payload
      return state.map((book) =>
        book.id !== bookID
          ? book
          : { ...book, comments: [...book.comments, comment] }
      )
    },
  },
})

export const {
  setUserBooks,
  appendBook,
  updateBook,
  deleteBook,
  appendComment,
} = bookSlice.actions

export const initializeUserBooks = () => {
  return async (dispatch) => {
    const userBooks = await bookService.getUserBooks()
    dispatch(setUserBooks(userBooks))
  }
}

export const addBook = (content) => {
  return async (dispatch) => {
    // try {
    const newBook = await bookService.addNewBook(content)
    dispatch(appendBook(newBook))
    // dispatch(appendUserBook(newBook))
    // dispatch(
    //   setNotification(
    //     `A new book ${content.title} by ${content.author} added`,
    //     'success',
    //     5
    // )
    // )
    // } catch (exception) {
    //   dispatch(setNotification('Title and URL must be provided', 'alert', 5))
    // }
  }
}

export const updateBookAction = (fieldsToUpdate) => {
  return async (dispatch) => {
    // try {
    const updatedBook = await bookService.update(fieldsToUpdate)
    dispatch(updateBook(updatedBook))
    // } catch (exception) {
    //   dispatch(
    //     setNotification(
    //       "Can't give like right now, please try again later",
    //       'alert',
    //       5
    //     )
    //   )
    // }
  }
}

export const deleteBookAction = (id) => {
  return async (dispatch) => {
    // try {
    await bookService.remove(id)
    dispatch(deleteBook(id))
    // } catch (exception) {
    //   dispatch(
    //     setNotification(
    //       'There has been some error trying to delete this book',
    //       'alert',
    //       5
    //     )
    //   )
    // }
  }
}

export const appendCommentAction = (bookComment) => {
  return async (dispatch) => {
    dispatch(appendComment(bookComment))
  }
}

export default bookSlice.reducer
