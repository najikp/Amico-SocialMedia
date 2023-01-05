import React from "react";
import { useParams } from "react-router-dom";
import PostSide from "../../../components/PostSide/PostSide";
import ProfileCard from "../../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../../components/RightSide/RightSide";
import "./Profile.css";

const Profile = () => {
  const params=useParams();
  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="Profile-center">
        <ProfileCard user={params.id} location='profilePage'/>
        <PostSide params={params.id} />
      </div>
      <RightSide/>
    </div>
  );
};

export default Profile;
