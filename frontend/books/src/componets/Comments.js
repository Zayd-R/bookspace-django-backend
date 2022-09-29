import React, { useEffect, useState } from 'react';
import commentService from '../services/comments'
import { Rating } from '@mui/material';
import Button from 'react-bootstrap/Button';



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


function Comment({ comment }) {
    

  const nestedComments = (comment.children || []).map((comment) => {
    return <Comment key={comment.id} comment={comment} type="child" />
  })

  return (
    <div style={{ marginLeft: '25px', marginTop: '16px' }}>
      <div
        style={{ color: '#555', margin: '0 0 2px 0', fontSize: '9pt' }}
      >
        <h4>{comment.commenter} <Rating name="size-small"  value={comment.review} size="small" /></h4> 
        <span><Button  onClick={()=>console.log(comment.id)}>Reply</Button></span>

      </div>
     <div style={{ color: '#333', fontSize: '10pt' }}>{comment.comment}</div>
      {nestedComments}
    </div>
  )
}
const commentTree = (comments)=>{
    console.log(comments)
   return  createTree(comments)
} 


const ListComments = ()=>{
    const [comments, setComments] = useState([])

    useEffect(()=>{
        commentService.getComments("utDtDwAAQBAJ")
        .then(response=>{
            setComments(response)
           
        })
    },[])
    const Tree = commentTree(comments)
    console.log(Tree)
    if(!Tree){
        return <h1>loading...</h1>
    }
    return(
        <div>
            {Tree.map(comment=>{
                return(
                    <Comment key={comment.id} comment={comment} />
                )
            })}
        </div>
    )



}

export default ListComments
       