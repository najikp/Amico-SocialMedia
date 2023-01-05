import React, { useState } from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "../TrendCard/TrendCard";
import ProfileModal from "../ProfileModal/ProfileModal";
import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";
import Notification from "../Notification/Notification";
import FollowersCard from "../FollowersCard/FollowersCard";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [not,setNot]=useState(false)
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to="/home">
          <img src={Home} alt="" />
        </Link>
        {/* <UilSetting /> */}
        <img style={{cursor:'pointer'}} src={Noti} alt="" onClick={()=>setNot((prev)=>!prev)}/>
        {not?<Notification setNot={setNot}/>:null}
        <Link to="/chat">
          <img src={Comment} alt="" />
        </Link>
      </div>
      {/* <TrendCard /> */}
      <FollowersCard/>

      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
