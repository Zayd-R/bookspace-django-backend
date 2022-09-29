import React, { useEffect, useState } from 'react';

const comments = [
    {
      id: 1,
      parentId: null,
      text: 'Love this article!',
      author: 'john',
      children: null,
    },
    {
      id: 3,
      parentId: 1,
      text: 'Agreed! this article is great',
      author: 'kevin',
      children: null,
    },
    {
      id: 2,
      parentId: 1,
      text: 'What r u talking about this article is terrible...',
      author: 'james',
      children: null,
    },
    {
      id: 5,
      parentId: null,
      text: 'Sweet article! Nice job always high quality.',
      author: 'steve',
      children: null,
    },
    {
      id: 4,
      parentId: 2,
      text: 'come on, its a good article and u know it',
      author: 'sarah',
      children: null,
    },
    {
      id: 6,
      parentId: 5,
      text: 'agreed, solid content here for sure!',
      author: 'jeff',
      text: 'agreed, solid content here for sure!',
      children: null,

    },
]
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

const commentTree = createTree(comments)

function Comment({ comment }) {
  const nestedComments = (comment.children || []).map((comment) => {
    return <Comment key={comment.id} comment={comment} type="child" />
  })

  return (
    <div style={{ marginLeft: '25px', marginTop: '16px' }}>
      <div
        style={{ color: '#555', margin: '0 0 2px 0', fontSize: '9pt' }}
      >
        {comment.author}
      </div>
      <div style={{ color: '#333', fontSize: '10pt' }}>{comment.text}</div>
      {nestedComments}
    </div>
  )
}

const ListComments = ()=>{
    return(
        <div>
            {commentTree.map(comment=>{
                return(
                    <Comment key={comment.id} comment={comment} />
                )
            })}
        </div>
    )



}

export default ListComments
       