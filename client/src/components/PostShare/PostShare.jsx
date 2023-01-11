import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PostShare.css";
import ProfileImage from "../../img/profileImg.jpg";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { uploadImage, uploadPost } from "../../actions/uploadAction";
import axios from "axios";
import { uploadVideo } from "../../api/UploadRequest";
import { toast, Toaster } from "react-hot-toast";
const token = localStorage.getItem("token");

const PostShare = () => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const [video, setVideo] = useState(null);
  const videoRef = useRef();
  const dispatch = useDispatch();

  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  console.log(image)
  const onVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let myVideo = event.target.files[0];
      setVideo(myVideo);
    }
  };

  const reset = () => {
    imageRef.current.value=null
    videoRef.current.value=null
    setImage(null);
    setVideo(null);
    desc.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (image) {
      if (
        !(
          image.type === "image/png" ||
          image.type === "image/webp" ||
          image.type === "image/jpg" ||
          image.type === "image/jpeg"
        )
      ) {
        return toast("only support .png, .jpg, and .webp files", {
          icon: "⚠",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      console.log(newPost);

      try {
        dispatch(uploadImage(data));
        dispatch(uploadPost(newPost));
        reset();
      } catch (error) {
        console.log(error);
      }
    } else if (video) {
      if (!(video.type === "video/mp4" || video.type === "video/mkv")) {
        return toast("only support .mp4 and .mkv files", {
          icon: "⚠",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
      const data = new FormData();
      const fileName = Date.now() + video.name.replaceAll(" ", "");
      data.append("name", fileName);
      data.append("file", video);
      try {
        await uploadVideo(data)
        newPost.video = fileName;
        dispatch(uploadPost(newPost));
        reset();
      } catch (error) {
        console.log(error);
      }
    } else {
      if(desc.current.value<=' '*100000){
        toast.error('There is no content')
      }else{
        dispatch(uploadPost(newPost));
        reset();
      }
    }
  };

  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt=""
      />
      <div>
        <input
          ref={desc}
          required
          type="text"
          placeholder="What's happening..."
        />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div
            className="option"
            style={{ color: "var(--video)" }}
            onClick={() => videoRef.current.click()}
          >
            <UilPlayCircle />
            Video
          </div>
          {/* <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div> */}
          {/* <div className="option" style={{ color: "var(--schedule)" }}>
            <UilSchedule />
            Schedule
          </div> */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="button ps-button"
          >
            {loading ? "Uploading..." : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="image"
              ref={imageRef}
              onChange={onImageChange}
            />
            <input
              type="file"
              name="video"
              accept="video/*"
              ref={videoRef}
              onChange={onVideoChange}
            />
          </div>
        </div>
        {(image || video) && (
          <div className="previewImage">
            <UilTimes
              onClick={() => {
                reset()
              }}
            />
            {image && <img src={URL.createObjectURL(image)} alt="" />}
            {video && (
              <video controls>
                <source src={URL.createObjectURL(video)} />
              </video>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
