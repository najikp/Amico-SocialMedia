import React from 'react'
import { useSelector } from 'react-redux'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'

const PostSide = ({params}) => {
  const {user}=useSelector((state)=>state.authReducer.authData)
  return (
    <div className="PostSide">
        {(params===user._id||params===undefined)&&<PostShare/>}
        <Posts params={params}/>
    </div>
  )
}

export default PostSide