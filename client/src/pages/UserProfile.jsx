import { useEffect, useState } from "react";
import { KJUR } from "jsrsasign";
import axios from "axios";

import avatar from "../assets/images/avatar.png";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UserProfile = ({ token }) => {
  const [patientProfile, setPatientProfile] = useState(false);
  const [category_, setCategory_] = useState("");
  const [userId, setUserId] = useState("");
  const [editInput, setEdit] = useState(false);
  // const [userData, setUserData] = useState({});

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [specializationName, setSpecializationName] = useState("");
  const [addressName, setAddressName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const apiURL = import.meta.env.VITE_API_BASE_URL;
  let reqURL;
  if (category_ && userId) {
    reqURL = `${apiURL}/api/v1/${category_}s/${userId}`;
  }

  useEffect(() => {
    if (reqURL) {
      axios
        .get(reqURL)
        .then((res) => {
          setFirstName(res.data[0].first_name);
          setLastName(res.data[0].last_name);
          setSpecializationName(res.data[0].specialization);
          setAddressName(res.data[0].address);
          setEmailAddress(res.data[0].email);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [reqURL]);

  let decodedToken;
  useEffect(() => {
    // Decode JWT token
    if (token) {
      decodedToken = KJUR.jws.JWS.parse(token);
      setUserId(decodedToken?.payloadObj.sub);
      if (decodedToken.payloadObj.category === "patient") {
        setPatientProfile(true);
        setCategory_("patient");
      } else {
        setPatientProfile(false);
        setCategory_("medic");
      }
    }
  }, []);

  const handleSubmitEdit = () => {
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
    console.log(profileData);
  };

  return (
    <div className="h-full">
      <div className="border-b-2 block md:flex">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
          <div className="flex justify-between">
            <span className="text-xl font-semibold block">
              <span>{category_}</span> profile
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
            <div className="flex relative">
              <img
                src={avatar}
                alt="user-image"
                className="w-20 h-20 rounded-full bg-gray-300"
              />
              <div className="absolute bg-white w-5 h-5 items-center flex justify-center border rounded-md translate-x-16 translate-y-16">
                <IconButton>
                  <EditIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
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
            <div
              onClick={handleSubmitEdit}
              className="-mt-2 w-[50%] flex items-center justify-center text-md font-bold text-white bg-blue-500 rounded-full px-5 py-2 hover:bg-blue-700"
            >
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
