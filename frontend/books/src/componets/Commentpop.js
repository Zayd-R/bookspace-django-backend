import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Rating } from '@mui/material';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useField } from '../hooks/fields'
import commentService from '../services/comments'
const CommentPop = ({review_value, setReviewParent,starred, updateShelf,saveBookToMyShelve ,book_id, username})=> {
  const [show, setShow] = useState(false);
  const [review, setReview]= useState(review_value)
  const [comments, setComments] = useState([])
  const [userComment, setUserComment] = useState({})

  console.log(userComment)
 useEffect(()=>{
  commentService.getComments(book_id)
  .then(response=>{
    setUserComment(response.find(line=> line.commenter === username))
    setComments(response)
  })
 },[])   
console.log(userComment.length)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const comment = useField("text")
  
console.log(comment,"comment")
console.log( review,starred,"comment pop")
useEffect(()=>{
    setReview(review_value)
},[review_value])

  const handleSubmit = (event)=>{
    event.preventDefault()
    const commentToAdd = {comment: comment.value !== '' ?comment.value : userComment.comment}
  
    commentService.addComment(book_id, commentToAdd)
    .then(response=>{
      setShow(false)
      if(starred){
        updateShelf('read', Number(review))
      }else{
        saveBookToMyShelve('read', Number(review))
      }
    })

  }
if(!userComment){

  return (
      <>
      <Button variant="primary" onClick={handleShow}>
      Write a review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>

        <Modal.Body>
        <h3>Add a Review</h3>
        <Rating value={review_value}   size="small" onChange={({target})=>setReviewParent((Number(target.value)))}/>
        <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
          {...comment}
        />
      </FloatingLabel>
      
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit' >
            Save Changes
          </Button>
    
        </Modal.Footer>
 </Form>
      </Modal>
    </>
  )
  } else{
    return(
      <div>
        <hr/>
       <h3>Your review</h3>
       <p>{userComment.comment}</p>
       <Button variant="primary" onClick={handleShow}>
      Edit review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>

        <Modal.Body>
        <h3>Add a Review</h3>

        <Rating value={review_value}   size="small" onChange={({target})=>setReviewParent((Number(target.value)))}/>
        <FloatingLabel controlId="floatingTextarea3" label="CommentsEdit">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
          value={userComment.comment} onChange={(e) => {setUserComment( {...userComment, comment: e.target.value})}}
        />
      </FloatingLabel>
      
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit' >
            Save Changes
          </Button>
    
        </Modal.Footer>
 </Form>
      </Modal>
      </div>
    )
  }

}

export default CommentPop