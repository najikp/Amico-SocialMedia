import React, { useEffect } from "react";
import { useState } from "react";
import { deleteComment, getComment } from "../../api/CommentRequest";
import { CommentData } from "../../Data/CommentData";
import { UilTrash } from "@iconscout/react-unicons";
import CommentInput from "./CommentInput";
import "./CommentView.css";
import moment from "moment";
import { useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

const CommentView = ({ post }) => {
  const [comments, setComments] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const [refresh,setRefresh]=useState(false)

  useEffect(() => {
    const getComments = async () => {
      try {
        const comment = await getComment(post._id);
        console.log(comment, "these are the comments");
        setComments(comment.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [post,refresh]);

  const deleteComments=async(commentId)=>{
    await deleteComment(commentId)
    setRefresh((pre)=>!pre)
    toast.success('comment deleted')

    
  }
  return (
    <>
    <Toaster/>
      <div className="CommentView">
        {comments?.map((value, index) => {
          return (
            <li className="commentList" key={index}>
              <div className="nameSection">
                <img
                  src={
                    value.author.profilePicture
                      ? serverPublic + value.author.profilePicture
                      : serverPublic + "defaultProfile.jpg"
                  }
                  alt=""
                />
                <b>{value.author.firstname} {value.author.lastname}:</b>
                {value.comment}
                {user._id === value.author._id && (
                  <UilTrash onClick={()=>deleteComments(value._id)} style={{ marginLeft: "auto", cursor: "pointer",width:'15px' }} />
                )}
              </div>
              <div>
                <span style={{ marginLeft: "auto", fontSize: "9px" }}>
                  {moment(value.createdAt).fromNow()}
                </span>
              </div>
            </li>
          );
        })}
      </div>
      <CommentInput post={post} setComments={setComments} />
    </>
  );
};

export default CommentView;
