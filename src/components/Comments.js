import React, { useEffect, useState } from 'react'
import { Button, Rating, TextField, Typography } from '@mui/material'
import { useField } from '../hooks/fields'
import { useDispatch, useSelector } from 'react-redux'
import { initializeComments, addBookReply } from '../reducers/commentsReducer'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { setNotification } from '../reducers/notificationReducer'
// TODO: Test the componet with more than one user
function createTree(list) {
  // console.log(list, "The list +++++++++++++++++++++++++++++++++++++++++")
  var map = {},
    node,
    roots = []
    

  for (let i = 0; i < list.length; i += 1) {
    // console.log(list[i].children, i, list[i],"+++++++++++++++++++++++++++++++++++++++++")
    map[list[i].id] = i // initialize the map
    list[i].children = [] // initialize the children
  }

  for (let i = 0; i < list.length; i += 1) {
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

const Comment = ({ comment, setRerender, book_id }) => {
  const [show, setShow] = useState(false)
  const [replyTo, setReplyId] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const reply = useField('text')

  const nestedComments = (comment.children || []).map((comment) => {
    return (
      <Comment
        key={comment.id}
        comment={comment}
        type='child'
        book_id={book_id}
      />
    )
  })

  const handleReply = (comment_id) => {
    setShow(!show)
    setReplyId(comment_id)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!user) {
      dispatch(setNotification('Please login first', 'error'))

      return navigate('/login')
    }

    const TheReply = { comment: reply.value, parentId: replyTo }
    dispatch(addBookReply(book_id, TheReply))
    setShow(false)
    reply.onSubmit()
  }

  return (
    <Box borderTop={3} borderLeft={1} sx={{ p: 1, ml: 1, mt: 1 }}>
      <Box sx={{ m: '0 0 2px 0' }}>
        <Typography variant='h6' fontWeight='bold'>
          {comment.commenter}
          {!comment.parentId ? (
            <Rating name='size-small' value={comment.review} size='small' />
          ) : (
            ''
          )}
        </Typography>
      </Box>
      <Typography
        sx={{ color: '#333', fontSize: '10pt', wordWrap: 'break-word' }}
      >
        {comment.comment}
      </Typography>
      <Button
        onClick={() => handleReply(comment.id)}
        sx={{ color: 'black', fontWeight: 'bold' }}
      >
        Reply
      </Button>
      <form onSubmit={handleSubmit}>
        {show && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              {...reply}
              // className='form-control'
              multiline
              placeholder='Reply...'
              required
            />

            <Button type='submit'>Submit</Button>
          </Box>
        )}
      </form>
      {nestedComments}
    </Box>
  )
}

const commentTree = (comments) => {
  return createTree(comments)
}

const ListComments = ({ book_id }) => {
  const dispatch = useDispatch()

  const reducerComments = useSelector((state) => state.comments)
  // console.log( useSelector((state) => state),"*/*********************************************************************")
  useEffect(() => {
    dispatch(initializeComments(book_id))
  }, [book_id, dispatch])

  if (!reducerComments || !Array.isArray(reducerComments.comments)) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  // console.log(JSON.parse(JSON.stringify(reducerComments.comments)), reducerComments.comments,"-----------------------")

  const Tree = commentTree(JSON.parse(JSON.stringify(reducerComments.comments)))
  return (
    <Box>
      {Tree.map((comment) => {
        return <Comment key={comment.id} comment={comment} book_id={book_id} />
      })}
    </Box>
  )
}

export default ListComments
