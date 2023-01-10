import { Table } from 'antd';
import { EyeTwoTone } from '@ant-design/icons'
import './PostList.css'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllPosts } from '../../api/AdminRequests';

const PostList = () => {
  const [posts,setPosts]=useState([]);

  useEffect(()=>{
    const fetchPosts=async()=>{
      const response= await getAllPosts()
      setPosts(response.data)
    }
    fetchPosts()
  },[])

  const data=posts.map((value)=>{
    return{
      key:value._id,
      postedby:value.userId.firstname+' '+value.userId.lastname,
      description:value.desc,
      date:value.createdAt,
      count:value.report.length,
      view:<EyeTwoTone />

    }
  })

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
      count:1,
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
      count:4,
    },
  ];
  
  const columns = [
    {
      title: 'PostedBy',
      dataIndex: 'postedby',
      key: 'postedby',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title:'Report Count',
      dataIndex:'count',
      key:'count'
    },
    {
      title:'View',
      dataIndex:'view',
      key:'view'
    }
  ];
  return (
    <div className='PostList'>
    <Table dataSource={data} columns={columns} />;
    </div>

  )
}

export default PostList