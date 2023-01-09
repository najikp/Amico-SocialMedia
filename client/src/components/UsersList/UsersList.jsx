import React, { useEffect } from 'react';
import './UsersList.css'
import {Table,Button} from 'antd'
import { getAllUser } from '../../api/UserRequest';
import { useState } from 'react';
import { activateUser, blockUser } from '../../api/AdminRequests';
import {toast,Toaster} from 'react-hot-toast'

const UsersList = () => {
    const [users,setUsers]=useState([])
    const [refresh,setRefresh]=useState(false);

    useEffect(()=>{
        const fetchUser=async()=>{
            const response= await getAllUser()
            setUsers(response.data)
        }
        fetchUser()
    },[refresh])

    const handleBlock=async(data)=>{
     const response = await blockUser(data);
     toast.error(response.data)
     setRefresh((pre)=>!pre)
    }

    const handleActivate=async(data)=>{
      const response=await activateUser(data);
      toast.success(response.data)
      setRefresh((pre)=>!pre)
    }
    const data=users.map((value)=>{
       return {key:value._id,
        name:value.firstname+' '+value.lastname,
        email:value.username,
        status:value.isBlocked?<Button onClick={()=>handleActivate(value._id)}  type='primary'>Activate</Button>:<Button onClick={()=>handleBlock(value._id)} type='dashed' danger>Block</Button>}
    })

    
      
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
          title: 'Activate/Block',
          dataIndex: 'status',
          key: 'status',
        },
      ];

  return (
   <div className="UsersList">
    <Toaster/>
    <Table dataSource={data} columns={columns} />
   </div>
  )
}

export default UsersList