import { createSlice } from '@reduxjs/toolkit'
import comments from '../services/comments'
import commentService from '../services/comments'

const commentSlice = createSlice({
  name: 'comments',
  initialState: {"comments": [],
                  "userComment": null 
},
  reducers: {
    setBookComments(state, {payload}) {
      console.log(payload, "in the reducer")
      return {...state, comments: payload}
    },
    appendComment(state, {payload}) {
      console.log(payload,"in reduces")
      console.log(state.comments,"------------------------")

      return {...state, comments: [...comments, payload]}
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

export const addBookReply = (book_id,TheReply)=>{
  return async (dispatch)=>{
    const reply = await commentService.addReply(book_id,TheReply)
    dispatch(appendComment(reply))
 }
}

export const initializeUserComment = (book_id) => {
    return async (dispatch) => {
     commentService.getUserComment(book_id)
     .then(comments=>{
      dispatch(setUserComments(comments.comment))
     }).catch(error=>setUserComments(null))
    }
  }

export const removeUserComment = () => {
    return async (dispatch) => {
      dispatch(setUserComments(null))
    }
  }

  export const addUserComment = (book_id,comment) => {
    return async (dispatch) => {
    //  const comments =  await commentService.addComment(book_id,comment)
     dispatch(setUserComments(comment))
    }
  }

  export const updateUserComment = (book_id,commentToAdd) => {
    return async (dispatch) => {
     const comments =  await commentService.addComment(book_id, commentToAdd)
     dispatch(setUserComments(comments.comment[0]))
      
    }
  }


export default commentSlice.reducer

