import React, { useEffect, useState } from 'react';
import commentService from '../services/comments'
import { Rating } from '@mui/material';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useField } from '../hooks/fields'
import { useDispatch, useSelector } from 'react-redux'
import {initializeComments, addBookReply, setBookComments} from '../reducers/commentsReducer'
// TODO: Test the componet with more than one user
function createTree(list) {
  var map = {},
    node,
    roots = [],
    i
 
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i // initialize the map
    console.log(list, "************************")
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
    const reply = useField("text")
  const nestedComments = (comment.children || []).map((comment) => {
    return <Comment key={comment.id} comment={comment} type="child" setRerender={setRerender} book_id={book_id}/>
  })


  const handleReply = (comment_id)=> {
    console.log(comment_id)
    setShow(!show)
    setReplyId(comment_id)
  }
 const handleSubmit = (event)=>{
  event.preventDefault()
  console.log(replyTo)
  const TheReply = {comment:reply.value, parentId:replyTo}
  dispatch(addBookReply(book_id,TheReply))
    setShow(false)
    setRerender(true)
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
    console.log(comments)
   return  createTree(comments)
} 


const ListComments = ({book_id})=>{
    const [comments, setComments] = useState([])
    const [reRender, setRerender] = useState(false)
    const dispatch = useDispatch()
   
    const reducerComments = useSelector(state=>state.comments)
    
    console.log(book_id,reducerComments, "////////////////////////////////////")

    useEffect(()=>{
     commentService.getComments(book_id)
     .then(response=>{
      setComments(response)
     })

    },[book_id,dispatch])
    useEffect(()=>{
     setComments(reducerComments.comments)
    },[reRender])

    if(!comments){
      return <h1>loading...</h1>
  }
    const Tree = commentTree(comments)
    console.log(Tree)
   
    return(
        <div>
            {Tree.map(comment=>{
                return(
                    <Comment key={comment.id} comment={comment} setRerender={setRerender} book_id={book_id}/>
                )
            })}
        </div>
    )



}

export default ListComments
       