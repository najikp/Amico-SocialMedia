import React from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTimelinePosts } from "../../actions/postAction";
import { useState } from "react";

const Posts = ({ params }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts, loading } = useSelector((state) => state.postReducer);
  const [postData, setPostData] = useState([]);
  const [refresh,setRefresh]=useState(false)


  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [dispatch, user._id,refresh===true]);
  return (
    <div className="Posts">
      {loading
        ? "Fetching Posts"
        : posts?.map((post) => {
            return (
              <>
                {params ? (
                  params === post.userId ? (
                    <Post data={post} key={post.userId} />
                  ) : null
                ) : (
                  <Post data={post} setRefresh={setRefresh} key={post._id} />
                )}
              </>
            );
          })}
    </div>
  );
};

export default Posts;
