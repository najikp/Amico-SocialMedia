import React from 'react';
import { useState } from 'react';
import PostList from '../../components/PostList/PostList';
import UsersList from '../../components/UsersList/UsersList';
import './Admin.css'

const Admin = () => {
    const [post,setPost]=useState(false)
  return (
    <div className="Admin">
        <div className="navbar">
            <h4>Amico - Admin Panel</h4>
            <button className='button log'>Logout</button>
        </div>
        <div className='main'>

        {/* Left-side */}

        <div className="leftSide">
                <li onClick={()=>setPost(false)}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="User" />
                    <span>
                        User Management
                    </span>
                </li>
                <li onClick={()=>setPost(true)}>
                    <img src="https://png.pngtree.com/png-vector/20190214/ourmid/pngtree-vector-gallery-icon-png-image_515223.jpg" alt="Post" />
                    <span>
                        Post Management
                    </span>
                </li>
            </div>

        <div className="rightSide">
            {post?<PostList/>:<UsersList/>}
            
        </div>
        </div>
    </div>
  )
}

export default Admin