import React from 'react';
import UsersList from '../../components/UsersList/UsersList';
import './Admin.css'

const Admin = () => {
  return (
    <div className="Admin">
        <div className="navbar">
            <h4>Amico - Admin Panel</h4>
            <button className='button log'>Logout</button>
        </div>
        <div className='main'>

        {/* Left-side */}

        <div className="leftSide">
                <li>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="User" />
                    <span>
                        User Management
                    </span>
                </li>
                <li>
                    <img src="https://png.pngtree.com/png-vector/20190214/ourmid/pngtree-vector-gallery-icon-png-image_515223.jpg" alt="Post" />
                    <span>
                        Post Management
                    </span>
                </li>
            </div>

        <div className="rightSide">
            <UsersList/>
        </div>
        </div>
    </div>
  )
}

export default Admin