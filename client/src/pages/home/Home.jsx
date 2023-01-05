import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'


const Home = () => {
  const params=useParams()
  const [fresh,setFresh]=useState(false)
  return (
    <div className="Home">
        <ProfileSide/>
        <PostSide setFresh={setFresh} params={params.id}/>
        <RightSide/>
    </div>
  )
}

export default Home