import React, { useEffect } from 'react';
import './UsersList.css'
import {Table} from 'antd'
import { getAllUser } from '../../api/UserRequest';
import { useState } from 'react';

const UsersList = () => {
    const [users,setUsers]=useState([])

    useEffect(()=>{
        const fetchUser=async()=>{
            const response= await getAllUser()
            setUsers(response.data)
        }
        fetchUser()
    },[])
    console.log(users)
    
    const data=users.map((value)=>{
       return {key:1,
        name:value.firstname,
        email:value.username,
        status:'active'}
    })

    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
      ];

  return (
   <div className="UsersList">
    <Table dataSource={data} columns={columns} />
   </div>
  )
}

export default UsersList