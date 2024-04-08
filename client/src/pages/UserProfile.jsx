import { useEffect, useState, useRef } from "react";
import axios from "axios";

import { Box, CircularProgress } from "@mui/material";
import { ProfileImageUploader } from "../components";



const UserProfile = ({
  token,
  decodedToken,
  setShowImageMenu,
  showImageMenu
}) => {
  const [editInput, setEdit] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [specializationName, setSpecializationName] = useState("");
  const [addressName, setAddressName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const specializationInputRef = useRef();
  const addressInputRef = useRef();

  const category_ = decodedToken.category;
  const userId = decodedToken.sub;
  let patientProfile;

  if (decodedToken.category === "patient") patientProfile = true;
  else patientProfile = false;

  const apiURL = import.meta.env.VITE_API_BASE_URL;
  const reqURL = `${apiURL}/api/v1/${category_}s/${userId}`;

  // fetch user data
  useEffect(() => {
    if (reqURL && !editInput) {
      axios
        .get(reqURL)
        .then((res) => {
          const data = res.data.data[0];
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setSpecializationName(data.specialization);
          setAddressName(data.address);
          setEmailAddress(data.email);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [editInput]);

  // handle profile update
  const handleSubmitEdit = () => {
    setEdit(false);
    let profileData;
    if (category_ === "patient") {
      profileData = {
        first_name: firstName,
        last_name: lastName,
        address: addressName,
        email: emailAddress,
      };
    } else {
      profileData = {
        first_name: firstName,
        last_name: lastName,
        specialization: specializationName,
        email: emailAddress,
      };
    }
  };

  if (
    !firstName &&
    !lastName &&
    !specializationName &&
    !addressName &&
    !emailAddress
  ) {
    return (
      <div className="h-screen flex justify-center">
        <Box sx={{ display: "flex" }} className="p-10">
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <div className="h-full md:h-screen">
      <div className="border-b-2 block md:flex">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
          <div className="flex justify-between">
            <span className="text-xl font-semibold block">
              <span>{category_}'s</span> profile
            </span>
            <div
              onClick={() => setEdit(!editInput)}
              className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
            >
              {editInput ? "Cancel" : "Edit"}
            </div>
          </div>

          <span className="text-gray-600">
            Edit your profile with new updates
          </span>
          <div className="w-full p-8 mx-2 flex justify-center">
            <ProfileImageUploader
              token={token}
              userId={userId}
              setShowImageMenu={ setShowImageMenu}
              showImageMenu={showImageMenu}
            />
          </div>
        </div>
        <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
          <div className="rounded  shadow p-6">
            <div className="pb-6">
              <label
                htmlFor="first_name"
                className="font-semibold text-gray-700 block pb-1"
              >
                First Name
              </label>
              <div className="flex">
                <input
                  {...(!editInput ? { disabled: true } : {})}
                  ref={firstNameInputRef}
                  id="first_name"
                  className="border-1 rounded-r px-4 py-2 w-full"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="last_name"
                className="font-semibold text-gray-700 block pb-1"
              >
                Last Name
              </label>
              <div className="flex">
                <input
                  {...(!editInput ? { disabled: true } : {})}
                  ref={lastNameInputRef}
                  id="last_name"
                  className="border-1  rounded-r px-4 py-2 w-full"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            {!patientProfile && (
              <div className="pb-6">
                <label
                  htmlFor="specialization"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Specialization
                </label>
                <div className="flex">
                  <input
                    {...(!editInput ? { disabled: true } : {})}
                    ref={specializationInputRef}
                    id="specialization"
                    className="border-1  rounded-r px-4 py-2 w-full"
                    type="text"
                    value={specializationName}
                    onChange={(e) => setSpecializationName(e.target.value)}
                  />
                </div>
              </div>
            )}
            {patientProfile && (
              <div>
                <div className="pb-6">
                  <label
                    htmlFor="address"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    Address
                  </label>
                  <div className="flex">
                    <input
                      {...(!editInput ? { disabled: true } : {})}
                      ref={addressInputRef}
                      id="address"
                      className="border-1  rounded-r px-4 py-2 w-full"
                      type="text"
                      value={addressName}
                      onChange={(e) => setAddressName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="pb-4">
              <label
                htmlFor="email"
                className="font-semibold text-gray-700 block pb-1"
              >
                Email
              </label>
              <input
                disabled
                id="email"
                className="border-1  rounded-r px-4 py-2 w-full"
                type="email"
                value={emailAddress}
              />
              <span className="text-gray-600 pt-4 block opacity-70">
                Clicking on submit means updating your profile details
              </span>
            </div>
            <button
              disabled
              onClick={handleSubmitEdit}
              className="-mt-2 w-[50%] flex items-center justify-center text-md font-bold text-white bg-blue-500 rounded-full px-5 py-2 hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
