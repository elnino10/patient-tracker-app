import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import avatar from "../assets/images/avatar.png";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
// import { KJUR } from "jsrsasign";

const UserDashboard = ({ decodedToken }) => {
  const [userData, setUserData] = useState({});
  const [medicalRecord, setMedicalRecord] = useState({});

  const category_ = decodedToken?.category;
  const userId = decodedToken?.sub;

  let reqURL;
  const apiURL = import.meta.env.VITE_API_BASE_URL;
  if (category_ && userId) {
    reqURL = `${apiURL}/api/v1/${category_}s/${userId}`;
  }

  // get user information from database
  useEffect(() => {
    if (reqURL) {
      axios
        .get(reqURL)
        .then((res) => {
          setUserData(res.data.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  // if user is a patient, display medical record information
  useEffect(() => {
    if (category_ && category_ === "patient") {
      let medicalRecordURL;
      if (userId) {
        medicalRecordURL = `${apiURL}/api/v1/patients/${userId}/medical-record`;
      }
      axios
        .get(medicalRecordURL)
        .then((res) => {
          setMedicalRecord(res.data.data[0]);
          // console.log(res.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  if (!userData && !medicalRecord) {
    return (
      <div>
        <Box sx={{ display: "flex" }} className="p-10">
          <CircularProgress />
        </Box>
        {/* <p>Loading...</p> */}
      </div>
    );
  }
  return (
    <div className="h-full">
      <div className="h-full m-8 border-solid rounded-md border-2 border-indigo-600">
        <div className="p-6 flex pt-2">
          <div className="pt-4">
            <img
              src={avatar}
              alt="patient-image"
              className="w-12 h-12 rounded-full justifty-center bg-gray-300"
            />
          </div>
          <div>
            <h2 className="pl-2 pt-10">{userData?.first_name}</h2>
          </div>
        </div>
        <div className="pl-6 pr-4">
          <div>
            <p className="p-6 font-extrabold text-center text-blue-600">
              Basic Information
            </p>
            <div className="p-8 rounded-md border-solid border-2 bg-[#FFFFFF] space-y-4 shadow-md md:col-span-1">
              <div>
                <p>
                  <span className="font-bold">Name: </span>
                  {userData?.first_name} {userData?.last_name}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-bold">Email: </span>
                  {userData?.email}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-bold">Phone: </span>
                  {userData?.phone}
                </p>
              </div>
              {category_ === "medic" && (
                <div>
                  <p>
                    <span className="font-bold">Specialization: </span>
                    {userData?.specialization}
                  </p>
                </div>
              )}
              {category_ === "patient" && (
                <div>
                  <p>
                    <span className="font-bold">Address: </span>
                    {userData?.address}
                  </p>
                </div>
              )}
              {category_ === "patient" && (
                <div>
                  <p>
                    <span className="font-bold">Age: </span>
                    {userData?.age_years} years, {userData?.age_months} months
                  </p>
                </div>
              )}
              {category_ === "patient" && (
                <div>
                  <p>
                    <span className="font-bold">Gender: </span>
                    {userData?.gender}
                  </p>
                </div>
              )}
            </div>
          </div>
          {category_ === "patient" && (
            <div>
              <p className="p-6 text-center font-extrabold text-blue-600">
                Medical Record
              </p>
              <div className="p-8 rounded-md border-solid border-2 bg-[#FFFFFF] space-y-4 shadow-md md:col-span-1">
                <p>
                  <span className="font-bold">Allergies</span>:{" "}
                  {medicalRecord?.allergies}
                </p>
              </div>
              <div className="p-8 rounded-md border-solid border-2 bg-[#FFFFFF] space-y-4 shadow-md md:col-span-1">
                <p>
                  <span className="font-bold">Diagnosis</span>:{" "}
                  {medicalRecord?.diagnosis}
                </p>
              </div>
              <div className="p-8 rounded-md border-solid border-2 bg-[#FFFFFF] space-y-4 shadow-md md:col-span-1">
                <p>
                  <span className="font-bold">Medical History</span>:{" "}
                  {medicalRecord?.history}
                </p>
              </div>
              <div className="p-8 rounded-md border-solid border-2 bg-[#FFFFFF] space-y-4 shadow-md md:col-span-1">
                <p>
                  <span className="font-bold">Current Medication</span>:{" "}
                  {medicalRecord?.medication}
                </p>
              </div>
              <div className="p-8 rounded-md border-solid border-2 bg-[#FFFFFF] space-y-4 shadow-md md:col-span-1">
                <p>
                  <span className="font-bold">Other Medical Information</span>:{" "}
                  {medicalRecord?.medical_info}
                </p>
              </div>
              <div className="flex justify-end pt-2">
                <div>
                  <IconButton>
                    <EditIcon fontSize="small" color="primary" />
                  </IconButton>
                </div>
                <div>
                  <IconButton size="small">
                    <DeleteIcon fontSize="small" color="primary" />
                  </IconButton>
                </div>
                <div>
                  <Link to="#">
                    <IconButton>
                      <AddIcon fontSize="medium" color="primary" />
                    </IconButton>
                  </Link>
                </div>
                <div>
                  <Link
                    to={`/user-profile/${userData?.id}`}
                    className="pt-4 font-bold text-blue-600"
                  >
                    Edit my profile
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
