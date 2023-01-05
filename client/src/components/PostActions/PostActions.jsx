import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { deletePost } from "../../api/PostRequest";
import DeleteWarning from "../DeleteWarning/DeleteWarning";
import "./PostActions.css";

const PostActions = ({ data, editEvent, setRefresh,setAction,setReport }) => {
  const[opened,setOpened]=useState(false)
  const { user } = useSelector((state) => state.authReducer.authData);
  const handleDelete = async () => {
    try {
      setRefresh(false);
      const test = await deletePost(data._id);
      toast.success(test.data)
      setRefresh(true);
      console.log(test);
    } catch (error) {
      toast.error('Something went Wrong!')
      console.log(error);
    }
  };

  const reporting=()=>{
    setReport(true);
    setAction(false)
  }
  return data.userId === user._id ? (
    <div className="PostActions">
      <li onClick={editEvent} className="list">
        <div className="action">
          <img
            className="logo"
            src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png"
            alt=""
          />
          <span> Edit</span>
        </div>
      </li>
      <li className="list">
        <div className="action" onClick={()=>setOpened((prev)=>!prev)}>
          <img
            className="logo"
            src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png"
            alt=""
          />
          <span> Delete</span>
          <DeleteWarning setAction={setAction} handleDelete={handleDelete} opened={opened} setOpened={setOpened}/>
        </div>
      </li>
    </div>
  ) : (
    <div className="PostActions">
      {/* <li className="list">
        <div className="action">
          <img
            className="logo"
            src="https://w7.pngwing.com/pngs/860/512/png-transparent-instagram-social-media-save-instagram-instagram-save-social-media-logo-icon-thumbnail.png"
            alt=""
          />
          <span>Save</span>
        </div>
      </li> */}
      <li className="list">
        <div className="action" onClick={reporting}>
          <img
            className="logo"
            src="https://icons.veryicon.com/png/o/miscellaneous/mime-icon/round-warning.png"
            alt=""
          />
          <span> Report</span>
        </div>
      </li>
    </div>
  );
};

export default PostActions;
