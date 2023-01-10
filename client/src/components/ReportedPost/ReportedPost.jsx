import {  DeleteTwoTone } from "@ant-design/icons";
import React from "react";
import "./ReportedPost.css";


const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;


const ReportedPost = ({ setIsVisible, post,handleRemove }) => {
  function handleClose(e) {
    if (e.target.id === "reportPostModalContainer") {
      setIsVisible(false);
    }
  }
  return (
    <div
      id="reportPostModalContainer"
      onClick={handleClose}
      className="ReportedPostModalContianer"
    >
      <div className="ReportedPostModal">
        <div className="postAndReports">
          <div className="post">
            <div className="namepart">
                <span><b>{post.userId.firstname} {post.userId.lastname}</b></span>
                <DeleteTwoTone onClick={()=>handleRemove(post._id)} />
            </div>
            <img
              src={
                post.image
                  ? process.env.REACT_APP_PUBLIC_FOLDER + post.image
                  : ""
              }
              alt=""
            />
          </div>
          <div className="downSide">
              <div className="reports">
                {post.report.map((value) => {
                    return <li>{value.reason}</li>;
                })}
              </div>
                <span style={{fontSize:'14px'}}>{post.report.length} Reports</span>
          </div>
        </div>
        <span onClick={() => setIsVisible(false)} className="closeButton">
          x
        </span>
      </div>
    </div>
  );
};

export default ReportedPost;
