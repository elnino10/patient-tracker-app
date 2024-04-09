import { useRef, useState, useEffect } from "react";
import axios from "axios";

import avatar from "../../assets/images/avatar.png";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ProfileImageUploader = ({
  token,
  userId,
  showImageMenu,
  setShowImageMenu,
}) => {
  const [profileImage, setProfileImage] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // const [image, setImage] = useState(null);
  const imageInputRef = useRef(null);

  const apiURL = import.meta.env.VITE_API_BASE_URL;
  const imageStorageURL = `${apiURL}/api/v1/profile-pic/${userId}`;

  let imageFile;

  // get profile image when page loads
  useEffect(() => {
    setSubmitting(true);
    axios
      .get(imageStorageURL)
      .then((res) => {
        if (res.data) {
          setProfileImage(res.data.data[0].profile_pic);
          setSubmitting(false);
          // console.log(res.data);
        }
      })
      .catch((error) => {
        setProfileImage(null);
        setSubmitting(false);
        // console.error(error);
      });
  }, []);

  // get new profile image after upload
  useEffect(() => {
    setFileUploaded(false);
    if (fileUploaded) {
      axios
        .get(imageStorageURL)
        .then((res) => {
          if (res.data) {
            setProfileImage(res.data.data[0].profile_pic);
            setSubmitting(false);
            // console.log(res.data);
          }
        })
        .catch((error) => {
          console.error(error);
          setProfileImage(null);
        });
    }
  }, [fileUploaded, profileImage]);

  // handle profile image upload
  const handleImageUpload = (e) => {
    imageFile = e.target.files[0];
    setShowImageMenu(false);
    setSubmitting(true);
    // check if image is selected and there isn't an existing image
    if (imageFile && !profileImage) {
      const formData = new FormData();
      formData.append("file", imageFile);
      axios
        .post(imageStorageURL, formData, {
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
    } else if (imageFile && profileImage !== null) {
      // image is selected and there is an existing image
      const formData = new FormData();
      formData.append("file", imageFile);
      axios
        .put(imageStorageURL, formData, {
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

  const handleSelectOptions = (e) => {
    e.stopPropagation();
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
    setSubmitting(true);
    // make http request to remove image
    axios
      .delete(imageStorageURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFileUploaded(true);
        setSubmitting(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="relative">
      <img
        src={profileImage ? profileImage : avatar}
        alt="user-image"
        className="w-40 h-40 rounded-full bg-gray-300  md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64"
      />

      <div
        className="absolute bg-white w-5 h-5 items-center justify-center
          flex border rounded-md translate-x-[8.5rem] translate-y-[-1rem] "
      >
        <IconButton onClick={handleSelectOptions}>
          <EditIcon fontSize="small" />
        </IconButton>
      </div>
      {submitting && (
        <div className="bg-blue-100 flex justify-center mt-3 text-blue-600">
          <p>Please wait...</p>
        </div>
      )}
      <div
        className={`${
          !showImageMenu ? "hidden" : ""
        } border border-slate-200 bg-slate-200
        rounded-md shadow-lg items-center flex justify-center absolute z-10 h-20
        translate-y-[-5rem] translate-x-[10.5rem]
        `}
      >
        <ul className="text-slate-500 text-sm flex flex-col items-center px-2">
          <li
            className="border-b border-slate-400 pb-2"
            onClick={selectImageHandler}
          >
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
