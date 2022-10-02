import React, { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useField } from '../hooks/fields'
import { useDispatch, useSelector } from 'react-redux'
import {initializeComments, addBookReply} from '../reducers/commentsReducer'
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {setNotification} from '../reducers/notificationReducer'
// TODO: Test the componet with more than one user
function createTree(list) {
  var map = {},
    node,
    roots = [],
    i
 
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i // initialize the map
   list[i].children = [] // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i]
    if (node.parentId) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentId]].children.push(node)
    } else {
      roots.push(node)
    }
  }
  return roots
}


const  Comment = ({ comment, setRerender,book_id }) =>{
    const [show, setShow] = useState(false)
    const [replyTo, setReplyId] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const reply = useField("text")

  const nestedComments = (comment.children || []).map((comment) => {
    return <Comment key={comment.id} comment={comment} type="child"  book_id={book_id}/>
  })


  const handleReply = (comment_id)=> {
    setShow(!show)
    setReplyId(comment_id)
  }
 const handleSubmit = (event)=>{
  event.preventDefault()
  if(!user){
    dispatch(setNotification("Please login first", "error"))

    return navigate("/login")
  }
  
  const TheReply = {comment:reply.value, parentId:replyTo}
  dispatch(addBookReply(book_id,TheReply))
    setShow(false)
    reply.onSubmit()
 } 

  return (
    <div style={{ marginLeft: '25px', marginTop: '16px' }}>
      <div
        style={{ color: '#555', margin: '0 0 2px 0', fontSize: '9pt' }}
      >
        <h4>{comment.commenter} {!comment.parentId? <Rating name="size-small"  value={comment.review} size="small" />: ''}</h4> 
      </div>
     <div style={{ color: '#333', fontSize: '10pt' }}>{comment.comment}</div>
     <span><Button  onClick={()=>handleReply(comment.id)} variant='Outline'><b>Reply</b></Button></span>
     <Form onSubmit={handleSubmit}>
       {show && (
         <div className='d-flex justify-content-center'>
             
           <input
             {...reply}
             className='form-control'
             placeholder='Reply...'
             required
           />
           
           <Button variant='Outline' type='submit'>Submit</Button>
           </div>
           )}
      </Form>
      {nestedComments}
    </div>
  )
}


const commentTree = (comments)=>{
   return  createTree(comments)
} 


const ListComments = ({book_id})=>{
    const dispatch = useDispatch()
   
    const reducerComments = useSelector(state=>state.comments)
    

    useEffect(()=>{
      dispatch(initializeComments(book_id))
    },[book_id,dispatch])

   
    if(!reducerComments){
      return (
        <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
      )
  }
    const Tree = commentTree(JSON.parse(JSON.stringify(reducerComments.comments)))
    return(
        <div>
            {Tree.map(comment=>{
                return(
                    <Comment key={comment.id} comment={comment}  book_id={book_id}/>
                )
            })}
        </div>
    )



}

export default ListComments
       