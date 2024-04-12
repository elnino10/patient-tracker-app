import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Box, CircularProgress } from "@mui/material";
import { ProfileImageUploader } from "../components";

const UserProfile = ({
  token,
  authUserData,
  setFileUploaded,
  setShowImageMenu,
  showImageMenu,
  category_,
  userId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editInput, setEdit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  let patientProfile;

  if (category_ === "patient") patientProfile = true;
  else patientProfile = false;

  const apiURL = import.meta.env.VITE_API_BASE_URL;
  let reqURL;
  if (category_ && userId) reqURL = `${apiURL}/api/v1/${category_}s/${userId}`;

  // fetch user data
  useEffect(() => {
    if (reqURL && !editInput) {
      axios
        .get(reqURL)
        .then((res) => {
          const data = res.data.data[0];
          setFirstName(data.first_name || "");
          setLastName(data.last_name || "");
          setSpecialization(data.specialization || "");
          setAddress(data.address || "");
          setPhoneNumber(data.phone_number || "");
          setEmail(data.email);
        })
        .catch((error) => {
          error.response && setErrorMessage(error.response.data.message);
          error.response && console.error(error.response.data.message);
        });
    }
  }, [reqURL, editInput]);

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
        phone_number: phoneNumber,
      };
    } else {
      profileData = {
        first_name: firstName,
        last_name: lastName,
        specialization: specialization,
        phone_number: phoneNumber,
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
          error.response && setErrorMessage(error.response.data.message);
          error.response && console.log(error.response.data.message);
        });
    }
  };

  // remove error message
  const handleErrorMessage = () => {
    setSubmitting(false);
    setErrorMessage("");
  };

  // redirect after 3 seconds if user data is not fetched
  useEffect(() => {
    setIsLoading(true);
    if (!email) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        !firstName && navigate("/error");
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    } else setIsLoading(false);
  }, [email, navigate]);

  if (isLoading) {
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
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md relative">
          <div className="flex justify-between">
            <span className="text-xl uppercase italic font-semibold block">
              <span>{category_}'s</span> profile
            </span>
            <div
              onClick={() => setEdit(!editInput)}
              className="-mt-2 text-md font-bold text-white bg-gray-700
              rounded-full px-5 py-2 hover:bg-gray-800 cursor-pointer"
            >
              {editInput ? "Cancel" : "Edit"}
            </div>
          </div>
          <span className="text-gray-600">Update your profile</span>
          <div className="w-full p-8 mx-2 flex justify-center">
            <ProfileImageUploader
              token={token}
              authUserData={authUserData}
              setFileUploaded={setFileUploaded}
              userId={userId}
              setShowImageMenu={setShowImageMenu}
              showImageMenu={showImageMenu}
            />
          </div>
          <div
            className={`${
              errorMessage !== "" ? "flex" : "invisible"
            } text-center justify-between items-center bg-red-100 w-52 px-2 translate-x-[-2rem] translate-y-[13rem] absolute`}
          >
            <p className="text-red-500 text-sm py-0">{errorMessage}</p>
            <span onClick={handleErrorMessage} className="">
              x
            </span>
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
            <div className="pb-6">
              <label
                htmlFor="phoneNumber"
                className="font-semibold text-gray-700 block pb-1"
              >
                Phone number
              </label>
              <div className="flex">
                <input
                  {...(!editInput ? { disabled: true } : {})}
                  id="phone_number"
                  className="border-1  rounded-r px-4 py-2 w-full"
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
                className="mr-20 font-bold text-md text-white bg-blue-500 rounded-xl px-3 py-2 hover:bg-blue-700 shadow-xl"
              >
                {submitting ? "Updating..." : "Submit"}
              </button>
              <Link
                to="/user-dashboard"
                className="mr-20 text-md text-white bg-slate-700 rounded-xl px-3 py-2 hover:bg-slate-900 shadow-2xl"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
