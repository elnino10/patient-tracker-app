import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";
import { ProfileImageUploader } from "../components";



const UserProfile = ({
  token,
  decodedToken,
  setShowImageMenu,
  showImageMenu
}) => {
  const [editInput, setEdit] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

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
          setSpecialization(data.specialization);
          setAddress(data.address);
          setEmail(data.email);
        })
        .catch((error) => {
          error.response && console.error(error.response.data.message);
        });
    }
  }, [editInput]);

  // handle profile update
  const handleSubmitEdit = () => {
    setEdit(false);
    setSubmitting(true);
    let profileData;
    if (category_ === "patient") {
      profileData = {
        first_name: firstName,
        last_name: lastName,
        address: address,
      };
    } else {
      profileData = {
        first_name: firstName,
        last_name: lastName,
        specialization: specialization,
      };
    }
    if (profileData) {
      axios
        .patch(reqURL, profileData)
        .then((res) => {
          if (res.data.data.length > 0) {
            setSubmitting(false);
            // console.log(res.data);
          }
        })
        .catch((error) => {
          setSubmitting(false);
          error.response && console.log(error.response.data.message);
        });
    }
  };

  if (!firstName && !lastName && !specialization && !address && !email) {
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
            <span className="text-xl uppercase italic font-semibold block">
              <span>{category_}'s</span> profile
            </span>
            <div
              onClick={() => setEdit(!editInput)}
              className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
            >
              {editInput ? "Cancel" : "Edit"}
            </div>
          </div>

          <span className="text-gray-600">Update your profile</span>
          <div className="w-full p-8 mx-2 flex justify-center">
            <ProfileImageUploader
              token={token}
              userId={userId}
              setShowImageMenu={setShowImageMenu}
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
                    id="specialization"
                    className="border-1  rounded-r px-4 py-2 w-full"
                    type="text"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
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
                      id="address"
                      className="border-1  rounded-r px-4 py-2 w-full"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
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
                value={email}
              />
              <span className="text-gray-600 pt-4 block opacity-70">
                Clicking on submit means updating your profile details
              </span>
            </div>
            <div className="flex">
              <button
                onClick={handleSubmitEdit}
                className="-mt-2 mr-20 w-32 text-md font-bold text-white bg-blue-500 rounded-full px-5 py-2 hover:bg-blue-700"
              >
                {submitting ? "Updating..." : "Submit"}
              </button>
              <Link
                to="/user-dashboard"
                className="-mt-2 w-40 text-md font-bold text-white bg-blue-500 rounded-full px-5 py-2 hover:bg-blue-700"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
