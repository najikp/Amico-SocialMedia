import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profilePicture"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

   const handleSubmit=(e)=>{
    e.preventDefault();
    let UserData=formData;
    if(profileImage){
      const data=new FormData();
      const fileName=Date.now() + profileImage.name;
      data.append('name',fileName);
      data.append('file',profileImage);
      UserData.profilePicture=fileName;
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    if(coverImage){
      const data=new FormData();
      const fileName=Date.now() + coverImage.name;
      data.append('name',fileName);
      data.append('file',coverImage);
      UserData.coverPicture=fileName;
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(updateUser(param.id,UserData));
    setModalOpened(false)
   }
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your Info</h3>
        <div>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            className="infoInput"
            onChange={handleChange}
            value={formData.firstname}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            className="infoInput"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>

        <div>
          <input
            type="text"
            name="worksAt"
            placeholder="Works At"
            className="infoInput"
            onChange={handleChange}
            value={formData.worksAt}
          />
        </div>

        <div>
          <input
            type="text"
            name="livesIn"
            placeholder="Lives In"
            className="infoInput"
            onChange={handleChange}
            value={formData.livesIn}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="infoInput"
            onChange={handleChange}
            value={formData.country}
          />
        </div>

        <div>
          <input
            type="text"
            name="relationship"
            placeholder="Relationship Status"
            className="infoInput"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>

        <div>
          Profile Image
          <input
            type="file"
            onChange={handleImageChange}
            name="profilePicture"
            id=""
          />
          Cover Image
          <input
            type="file"
            onChange={handleImageChange}
            name="coverPicture"
            id=""
          />
        </div>

        <button className="button infoButton" onClick={handleSubmit}>Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
