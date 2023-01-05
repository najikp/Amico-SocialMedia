import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'

const PostSide = ({params}) => {
  return (
    <div className="PostSide">
        <PostShare/>
        <Posts params={params}/>
    </div>
  )
}

export default PostSide