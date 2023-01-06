import React from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useSelector } from "react-redux";
import { useState } from "react";
import { likePost, reportPost, updatePost } from "../../api/PostRequest";
import PostActions from "../PostActions/PostActions";
import CommentInput from "../Comment/CommentInput";
import CommentView from "../Comment/CommentView";
import { useEffect } from "react";
import { getComment } from "../../api/CommentRequest";
import { useRef } from "react";
import { UilTimes } from "@iconscout/react-unicons";
import toast, { Toaster } from "react-hot-toast";

const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

const Post = ({ data, setRefresh }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [commentCount, setCommentCount] = useState([]);
  const [action, setAction] = useState(false);
  const [comment, setComment] = useState(false);
  const [edit, setEdit] = useState(false);
  const [report, setReport] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const desc = useRef();

  const editEvent = () => {
    setAction((prev) => !prev);
    setEdit((prev) => !prev);
  };

  useEffect(() => {
    try {
      const fetchComment = async () => {
        const commentData = await getComment(data._id);
        setCommentCount(commentData.data);
      };
      fetchComment();
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleComment = () => {
    setComment((prev) => !prev);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const body = desc.current.value;
    const response=await updatePost(data._id, body);
    setRefresh(true);
    setEdit(false);
    setAction(false);
    toast.success(response.data); 
  };

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleReport = async (e) => {
    e.preventDefault();

    try {
      const postId = data._id;
      const reportData = {
        userId: user._id,
        reason: selectedValue,
      };

      const response = await reportPost(postId, reportData);
      setReport(false)
      setAction(false)
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="Post">
      <Toaster />
      <div className="postHeader">
        <div className="namePart">
          <img
            src={
              data.profilePicture
                ? serverPublic + data.profilePicture
                : serverPublic + "defaultProfile.jpg"
            }
            alt=""
          />
          <span>
            <b>{data.firstname} {data.lastname}</b>
          </span>
        </div>
        <div className="optionSide">
          {report ? (
            <UilTimes onClick={() => setReport((pre) => !pre)} />
          ) : (
            <div onClick={() => setAction((prev) => !prev)}>
              <span>
                <b>...</b>
              </span>
            </div>
          )}
          {action && (
            <PostActions
              setReport={setReport}
              setAction={setAction}
              setRefresh={setRefresh}
              data={data}
              editEvent={editEvent}
              key={data._id}
            />
          )}
        </div>
      </div>
      {report && (
        <div className="Report">
          <form action="" className="reportForm" onSubmit={handleReport}>
            <h3>Why are you reporting this post?</h3>
            <li>
              <input
                type="radio"
                name="report"
                checked={selectedValue === "Spam"}
                value="Spam"
                onChange={handleChange}
              />
              <label htmlFor="">Spam</label>
            </li>
            <li>
              <input
                type="radio"
                name="report"
                value="Nudity or sexual activity"
                onChange={handleChange}
                checked={selectedValue === "Nudity or sexual activity"}
              />
              <label htmlFor="">Nudity or sexual activity</label>
            </li>

            <li>
              <input
                type="radio"
                name="report"
                value="Hate speech or symbols"
                onChange={handleChange}
                checked={selectedValue === "Hate speech or symbols"}
              />
              <label htmlFor="">Hate speech or symbols</label>
            </li>

            <li>
              <input
                type="radio"
                name="report"
                value="Violence or dangerous organizations"
                onChange={handleChange}
                checked={
                  selectedValue === "Violence or dangerous organizations"
                }
              />
              <label htmlFor="">Violence or dangerous organizations</label>
            </li>

            <li>
              <input
                type="radio"
                name="report"
                value="Bullying or harassment"
                onChange={handleChange}
                checked={selectedValue === "Bullying or harassment"}
              />
              <label htmlFor="">Bullying or harassment</label>
            </li>

            <li>
              <input
                type="radio"
                name="report"
                value="Selling illegal or regulated goods"
                onChange={handleChange}
                checked={selectedValue === "Selling illegal or regulated goods"}
              />
              <label htmlFor="">Selling illegal or regulated goods</label>
            </li>

            <li>
              <input
                type="radio"
                name="report"
                value="Intellectual property violations"
                onChange={handleChange}
                checked={selectedValue === "Intellectual property violations"}
              />
              <label htmlFor="">Intellectual property violations</label>
            </li>
            <li>
              <input
                type="radio"
                name="report"
                value="Suicide or self-injury"
                onChange={handleChange}
                checked={selectedValue === "Suicide or self-injury"}
              />
              <label htmlFor="">Suicide or self-injury</label>
            </li>
            <li>
              <input
                type="radio"
                name="report"
                value="Eating disorders"
                onChange={handleChange}
                checked={selectedValue === "Eating disorders"}
              />
              <label htmlFor="">Eating disorders</label>
            </li>
            <li>
              <input
                type="radio"
                name="report"
                value="Scams or fraud"
                onChange={handleChange}
                checked={selectedValue === "Scams or fraud"}
              />
              <label htmlFor="">Scams or fraud</label>
            </li>
            <li>
              <input
                type="radio"
                name="report"
                value="False information"
                onChange={handleChange}
                checked={selectedValue === "False information"}
              />
              <label htmlFor="">False information</label>
            </li>

            {selectedValue===''?<button disabled className="button reportButton">Report</button>:<button className="button reportButton">Report</button>}
          </form>
        </div>
      )}
      {!report && (
        <>
          <span>{data.desc}</span>
          <img
            src={
              data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""
            }
            alt=""
          />
        </>
      )}

      {data.video && !report && (
        <video controls>
          <source src={process.env.REACT_APP_PUBLIC_VIDEO + data.video} />
        </video>
      )}

      {edit ? (
        <div className="edit">
          <UilTimes
            style={{ cursor: "pointer" }}
            onClick={() => setEdit((prev) => !prev)}
          />
          <input
            autoFocus
            ref={desc}
            required
            defaultValue={data.desc}
            type="text"
          />
          <div className="postOptions">
            <button className="button ps-button" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      ) : (
        <div className="postReact">
          <img
            src={liked ? Heart : NotLike}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={handleLike}
          />
          <img
            src={Comment}
            onClick={() => handleComment(data._id)}
            style={{ cursor: "pointer" }}
            alt=""
          />
          <img src={Share} alt="" />
        </div>
      )}
      <div className="likeAndComments">
        <span style={{ color: "var(--gray)", fontSize: "12px" }}>
          {likes} likes
        </span>

        <span style={{ color: "var(--gray)", fontSize: "12px" }}>
          {commentCount?.length} comments
        </span>
      </div>
      {comment ? (
        <>
          <h4 style={{ margin: "0px" }}>Comments</h4>
          <CommentView post={data} key={data._id} />
        </>
      ) : null}
    </div>
  );
};

export default Post;
