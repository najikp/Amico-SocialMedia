import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./ProfileCard.css";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../../api/UserRequest";
import { MessageOutlined } from "@ant-design/icons";
import { createChat } from "../../api/ChatRequests";
import { toast } from "react-hot-toast";

const ProfileCard = ({ location }) => {
  const [userData,setUserData]=useState({});
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const params=useParams();
  const id=params.id;

  const chatData={
    senderId:user._id,
    receiverId:id
  }


  //getting the userDetails
  useEffect(()=>{
    const fetchUser=async()=>{
      const data = await getUser(params.id);
      setUserData(data.data)
    }
    fetchUser()
  },[id])
  const following=userData?.followers?.includes(user._id)
  
  const handleMessage=async(data)=>{
    const response=await createChat(data)
    console.log(response.data,'is the response')
    toast.success(response.data)
  }
  
  return (
    <>
    {user._id===params.id || params.id==undefined ? (
      <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + "defaultCover.png"
          }
          alt=""
        />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt=""
        />
      </div>
      <div className="ProfileName">
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span>
          {user.worksAt ? "Working at " + user.worksAt : "Write about You.."}
        </span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user?.followers?.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user?.following?.length}</span>
            <span>Following</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post?.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${user._id}`}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
    ):(
      <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            userData.coverPicture
              ? serverPublic + userData.coverPicture
              : serverPublic + "defaultCover.png"
          }
          alt=""
        />
        <img
          src={
            userData.profilePicture
              ? serverPublic + userData.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt=""
        />
      </div>
      <div className="ProfileName">
        <span>
          {userData.firstname} {userData.lastname}
        </span>
        <span>
          {userData.worksAt ? "Working at " + userData.worksAt : "Write about You.."}
        </span>
      </div>

      {following&&<div className="messageButton">
        <Link style={{textDecoration:'none'}} onClick={()=>handleMessage(chatData)} to='/chat'>
        <button  className="button msg-btn fc-button UnfollowButton"><MessageOutlined /> Message</button>
        </Link>
      </div>}

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{userData?.followers?.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{userData?.following?.length}</span>
            <span>Following</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post?.userId === userData._id).length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
    </div>
    )}
    
    </>
  );
};

export default ProfileCard;
