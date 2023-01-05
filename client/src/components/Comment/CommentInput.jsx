import React from "react";
import { useState } from "react";
import { createComment } from "../../api/CommentRequest";

import "./CommentInput.css";

const CommentInput = ({ children, post,setComments }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setLoading(true);
      const response= await createComment(post._id, content);
      console.log(response.data)
      setComments(pre=>{
        return [response.data,...pre]
      })
      setContent("")
    } catch (error) {
      console.log(error)
    }
    setLoading(false)

  };

  return (
    <form className="comment" onSubmit={handleSubmit}>
      {children}
      <input
        required
        type="text"
        placeholder="Add a Comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="postOptions">
        <button disabled={loading} className="button ps-button">Post</button>
      </div>
    </form>
  );
};

export default CommentInput;
