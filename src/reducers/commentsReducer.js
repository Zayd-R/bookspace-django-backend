import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'

const commentSlice = createSlice({
  name: 'comments',
  initialState: { comments: [], userComment: null },
  reducers: {
    setBookComments(state, { payload }) {
      return { ...state, comments: payload }
    },
    appendComment(state, { payload }) {
      return { ...state, comments: [...state.comments, payload] }
    },

    setUserComments(state, { payload }) {
      return { ...state, userComment: payload }
    },
    updateBookComments(state, { payload }) {
      const updated = state.comments.map((comment) =>
        comment.id === payload.id ? payload : comment
      )
      return { ...state, comments: updated }
    },
  },
})

export const {
  setBookComments,
  appendComment,
  setUserComments,
  updateBookComments,
} = commentSlice.actions

export const initializeComments = (book_id) => {
  return async (dispatch) => {
    const comments = await commentService.getComments(book_id)
    dispatch(setBookComments(comments))
  }
}

export const addBookReply = (book_id, TheReply) => {
  return async (dispatch) => {
    const reply = await commentService.addReply(book_id, TheReply)
    dispatch(appendComment(reply))
  }
}

export const initializeUserComment = (book_id) => {
  return async (dispatch) => {
    commentService
      .getUserComment(book_id)
      .then((comments) => {
        dispatch(setUserComments(comments.comment))
      })
      .catch((error) => setUserComments(null))
  }
}

export const removeUserComment = () => {
  return async (dispatch) => {
    dispatch(setUserComments(null))
  }
}

export const addUserComment = (book_id, comment) => {
  return async (dispatch) => {
    const comments = await commentService.addComment(book_id, comment)
    dispatch(setUserComments(comments.comments[0]))
    dispatch(appendComment(comments.comments[0]))
  }
}

export const updateUserComment = (book_id, commentToAdd) => {
  return async (dispatch) => {
    const comments = await commentService.addComment(book_id, commentToAdd)
    dispatch(setUserComments(comments.comment[0]))
    dispatch(updateBookComments(comments.comment[0]))
  }
}

export default commentSlice.reducer
