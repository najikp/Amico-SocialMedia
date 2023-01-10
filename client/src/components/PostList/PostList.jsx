import { Table } from "antd";
import { EyeTwoTone } from "@ant-design/icons";
import "./PostList.css";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllPosts, removePost } from "../../api/AdminRequests";
import moment from "moment";
import ReportedPost from "../ReportedPost/ReportedPost";
import { toast, Toaster } from "react-hot-toast";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [post, setPost] = useState({});
  const [reset,setReset]=useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getAllPosts();
      setPosts(response.data);
    };
    fetchPosts();
  }, [reset]);
  const handleVisible = (data) => {
    setIsVisible(true);

    setPost(data);
  };

  const handleRemove=async(postId)=>{
   const res= await removePost(postId)
   setIsVisible(false)
   setReset((pre)=>!pre)
   console.log(res);
   toast.success(res.data)
  }
  const data = posts.map((value) => {
    return {
      key: value._id,
      postedby: value.userId.firstname + " " + value.userId.lastname,
      description: value.desc,
      date: moment(value.createdAt).format("DD-MM-YYYY"),
      count: value.report.length,
      view: (
        <EyeTwoTone
          onClick={() => handleVisible(value)}
          style={{ cursor: "pointer" }}
        />
      ),
    };
  });

  const columns = [
    {
      title: "PostedBy",
      dataIndex: "postedby",
      key: "postedby",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Report Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
    },
  ];
  return (
    <div className="PostList">
      <Toaster/>
      <Table dataSource={data} columns={columns} />
      {isVisible && <ReportedPost handleRemove={handleRemove} post={post} setIsVisible={setIsVisible} />}
    </div>
  );
};

export default PostList;
