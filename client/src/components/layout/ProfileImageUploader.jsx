import { useRef, useState, useEffect } from "react";
import axios from "axios";

import avatar from "../../assets/images/avatar.png";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ProfileImageUploader = ({ token, userId, image }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  const [showImageMenu, setShowImageMenu] = useState(false);
  // const [image, setImage] = useState(null);
  const imageInputRef = useRef(null);

  const apiURL = import.meta.env.VITE_API_BASE_URL;
  const imageUploadURL = `${apiURL}/api/v1/profile-pic-upload`;
  const imageUpdateURL = `${apiURL}/api/v1/profile-pic/${userId}`;

  let imageFile;

  // get profile image from storage
  useEffect(() => {
    setFileUploaded(false);
    if (fileUploaded) {
      axios
        .get(`${apiURL}/api/v1/profile-pic/${userId}`)
        .then((res) => {
          if (res.data) {
            setProfileImage(res.data.data[0].profile_pic);
            // console.log(res.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [fileUploaded]);

  // handle profile image upload
  const handleImageUpload = (e) => {
    imageFile = e.target.files[0];
    setShowImageMenu(false);
    // check if image is selected and there isn't an existing image
    if (imageFile && !image) {
      const formData = new FormData();
      formData.append("file", imageFile);
      axios
        .post(imageUploadURL, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          setFileUploaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (imageFile && image !== null) {
      // image is selected and there is an existing image
      const formData = new FormData();
      formData.append("file", imageFile);
      axios
        .put(imageUpdateURL, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          setFileUploaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleImageSelect = () => {
    // imageInputRef.current.click();
    setShowImageMenu(!showImageMenu);
  };

  // select image
  const selectImageHandler = () => {
    setShowImageMenu(false);
    imageInputRef.current.click();
  };

  // remove image
  const removeImageHandler = () => {
    setShowImageMenu(false);
    // make http request to remove image
  };

  return (
    <div className="flex relative">
      <img
        src={profileImage || image ? profileImage || image : avatar}
        alt="user-image"
        className="w-20 h-20 rounded-full bg-gray-300"
      />

      <div
        className="absolute bg-white w-5 h-5 items-center justify-center
          flex border rounded-md translate-x-16 translate-y-16"
      >
        <IconButton onClick={handleImageSelect}>
          <EditIcon fontSize="small" />
        </IconButton>
      </div>
      <div className={`${!showImageMenu ? "hidden" : ""} border border-slate-200 rounded-md shadow-lg items-center flex justify-center absolute z-10 h-20 translate-x-20`}>
        <ul className="text-slate-500 text-sm flex flex-col items-center px-2">
          <li className="border-b pb-2" onClick={selectImageHandler}>
            select
          </li>
          <li className="pt-1" onClick={removeImageHandler}>
            remove
          </li>
          <input
            ref={imageInputRef}
            className="hidden"
            type="file"
            onChange={handleImageUpload}
          />
        </ul>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
