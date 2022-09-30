import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'

const commentSlice = createSlice({
  name: 'comments',
  initialState: {"comments": [],
                  "userComment": null 
},
  reducers: {
    setBookComments(state, {payload}) {
      return {...state, comments: payload}
    },
    appendComment(state, action) {
      console.log(action.payload,"in reduces")

      return [...state, action.payload]
    },
    
    setUserComments(state,{payload}){
        return {...state, userComment:payload}
    }
  
    
  },
})

export const {
    setBookComments,
    appendComment,
    setUserComments
} = commentSlice.actions

export const initializeComments = (book_id) => {
  return async (dispatch) => {
   const comments =  await commentService.getComments(book_id)
   dispatch(setBookComments(comments))

    
  }
}

export const initializeUserComment = (book_id) => {
    return async (dispatch) => {
     commentService.getUserComment(book_id)
     .then(comments=>{
      dispatch(setUserComments(comments.comment))
     }).catch(error=> dispatch(setUserComments(null)))
      dispatch(setUserComments(null))
    }
  }

  export const addUserComment = (book_id,comment) => {
    return async (dispatch) => {
     const comments =  await commentService.addComment(book_id,comment)

     dispatch(setUserComments(comments.comments[0]))
  
    }
  }

  export const updateUserComment = (book_id,commentToAdd) => {
    return async (dispatch) => {
     const comments =  await commentService.addComment(book_id, commentToAdd)
     dispatch(setUserComments(comments.comment[0]))
  
      
    }
  }


export default commentSlice.reducer

