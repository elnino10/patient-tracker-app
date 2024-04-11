import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import avatar from "../assets/images/avatar.png";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const UserDashboard = ({ decodedToken, userData, setActivePage }) => {
  const [medicalRecord, setMedicalRecord] = useState({});

  const category_ = decodedToken?.category;
  const userId = decodedToken?.sub;

  const apiURL = import.meta.env.VITE_API_BASE_URL;

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

  if (!userData?.id && !medicalRecord?.id) {
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
      <div className="m-8 border-solid rounded-md block md:flex">
        <div className="p-6 flex justify-between pt-2">
          <div className="flex flex-col justify-center items-center">
            <div className="pt-2">
              <img
                src={userData.profile_pic ? userData.profile_pic : avatar}
                alt="patient-image"
                className="w-32 h-32 rounded-full bg-gray-300 md:w-44 md:h-38 lg:w-46 lg:h-46 xl:w-64 xl:h-64"
              />
            </div>
            <h2 className="text-md text-sm text-gray-500 md:pt-40">
              {userData?.specialization}
            </h2>
          </div>
          <div className="pt-6 ml-11 l:ml-40">
            <Link
              onClick={() => setActivePage("")}
              to={`/user-profile/${userData?.id}`}
              className="text-white bg-gray-700 shadow-xl rounded-lg px-2 py-1 text-sm hover:bg-gray-800 md:items-end"
            >
              view profile
            </Link>
          </div>
        </div>
        <div className="pl-6 pr-4 block md:flex md:justify-between xl:flex xl:justify-between">
          <div className="pt-8">
            <p className="p-6 font-extrabold text-center text-slate-600">
              Basic Information
            </p>
            <div className="p-6 rounded-md border-solid border-2 bg-[#FFFFFF] mr-10 shadow-md md:col-span-1">
              <p className="mb-1">
                <span className="font-bold">Name: </span>
                {userData?.first_name} {userData?.last_name}
              </p>
              <p className="mb-1">
                <span className="font-bold">Email: </span>
                {userData?.email}
              </p>
              <p className="mb-1">
                <span className="font-bold">Phone: </span>
                {userData?.phone}
              </p>
              {category_ === "medic" && (
                <p className="mb-1">
                  <span className="font-bold">Specialization: </span>
                  {userData?.specialization}
                </p>
              )}
              {category_ === "patient" && (
                <p className="mb-1">
                  <span className="font-bold">Address: </span>
                  {userData?.address}
                </p>
              )}
              {category_ === "patient" && (
                <p className="mb-1">
                  <span className="font-bold">Age: </span>
                  {userData?.age_years} years, {userData?.age_months} months
                </p>
              )}
              {category_ === "patient" && (
                <p className="mb-1">
                  <span className="font-bold">Gender: </span>
                  {userData?.gender}
                </p>
              )}
            </div>
          </div>
          <div className="pt-4">
            <p className="mt-8 text-center font-extrabold text-slate-600">
              Medical Record
            </p>
            {category_ === "patient" && userData.med_record_id !== null ? (
              <div className="pt-6">
                <div className="p-4 rounded-md border-solid border-2 bg-[#FFFFFF]">
                  <p>
                    <span className="font-bold">Allergies</span>:{" "}
                    {medicalRecord?.allergies}
                  </p>
                </div>
                <div className="p-4 rounded-md border-solid border-2 bg-[#FFFFFF]">
                  <p>
                    <span className="font-bold">Diagnosis</span>:{" "}
                    {medicalRecord?.diagnosis}
                  </p>
                </div>
                <div className="p-4 rounded-md border-solid border-2 bg-[#FFFFFF]">
                  <p>
                    <span className="font-bold">Medical History</span>:{" "}
                    {medicalRecord?.history}
                  </p>
                </div>
                <div className="p-4 rounded-md border-solid border-2 bg-[#FFFFFF]">
                  <p>
                    <span className="font-bold">Current Medication</span>:{" "}
                    {medicalRecord?.medication}
                  </p>
                </div>
                <div className="p-4 rounded-md border-solid border-2 bg-[#FFFFFF]">
                  <p>
                    <span className="font-bold">Other Medical Information</span>
                    : {medicalRecord?.medical_info}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex text-center justify-center text-lg text-red-500">
                <p>Patient has no medical record yet!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
