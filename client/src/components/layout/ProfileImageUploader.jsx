import { useRef } from "react";

import avatar from "../../assets/images/avatar.png";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function ProfileImageUploader({ setProfileImage }) {
  const imageInputRef = useRef(null);

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleImageSelect = () => {
    imageInputRef.current.click();
  };

  return (
    <div>
      <div className="flex relative">
        <img
          src={avatar}
          alt="user-image"
          className="w-20 h-20 rounded-full bg-gray-300"
        />

        <div className="absolute bg-white w-5 h-5 items-center flex justify-center border rounded-md translate-x-16 translate-y-16">
          <IconButton onClick={handleImageSelect}>
            <EditIcon fontSize="small" />
          </IconButton>
          <input
            ref={imageInputRef}
            className="hidden"
            type="file"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileImageUploader;
