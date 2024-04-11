import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import avatar from "../assets/images/avatar.png";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const UserDashboard = ({
  setActivePage,
  authUserData,
  category_,
  userId,
  medicalRecord,
  setMedicalRecord,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const apiURL = import.meta.env.VITE_API_BASE_URL;
  let medicalRecordURL;
  if (userId !== "" && category_ === "patient")
    medicalRecordURL = `${apiURL}/api/v1/patients/${userId}/medical-record`;

  // if user is a patient, display medical record information
  useEffect(() => {
    if (category_ === "patient") {
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
  }, [category_]);

  // redirect after 3 seconds if user data is not available
  useEffect(() => {
    setIsLoading(true);
    if (!authUserData) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        if (!authUserData) {
          setActivePage("");
          navigate("/error");
        }
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    } else setIsLoading(false);
  }, [authUserData, navigate]);

  // show loading spinner while fetching user data
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
    <div
      className={`${
        category_ === "medic" ? "h-screen" : "h-full"
      } md:h-screen m-8 border-solid rounded-md block md:flex md:flex-col`}
    >
      <div className="p-6 flex justify-between pt-2 md:p-2">
        <div className="flex flex-col justify-center items-center md:px-10 ">
          <div className="pt-2">
            <img
              src={
                authUserData && authUserData.profile_pic !== null
                  ? authUserData?.profile_pic
                  : avatar
              }
              alt="patient-image"
              className="w-32 h-32 rounded-full bg-gray-300 md:w-44 md:h-44 lg:w-46 lg:h-46 xl:w-64 xl:h-64"
            />
          </div>
          <h2
            className={`${
              !category_ === "medic"
                ? "hidden"
                : "text-md text-sm text-gray-500 md:pt-40"
            }`}
          >
            {authUserData?.specialization}
          </h2>
        </div>
        <div className="pt-6 ml-16">
          <Link
            onClick={() => setActivePage("")}
            to={`/user-profile/${authUserData?.id}`}
            className="text-white bg-gray-700 shadow-xl rounded-lg px-2 py-1 text-sm hover:bg-gray-800 md:text-md md:px-4 md:py-2"
          >
            view profile
          </Link>
        </div>
      </div>
      <div className="pl-6 pr-4 block md:flex md:items-center lg:flex lg:justify-between">
        <div className="pt-8 md:pt-0">
          <p className="p-6 font-extrabold text-center text-slate-600 md:p-2">
            Basic Information
          </p>
          <div className="p-6 rounded-md border-solid border-2 bg-[#FFFFFF] mr-10 shadow-md md:col-span-1">
            <p className="mb-1">
              <span className="font-bold">Name: </span>
              {authUserData?.first_name} {authUserData?.last_name}
            </p>
            <p className="mb-1">
              <span className="font-bold">Email: </span>
              {authUserData?.email}
            </p>
            <p className="mb-1">
              <span className="font-bold">Phone: </span>
              {authUserData?.phone}
            </p>
            {category_ === "patient" && (
              <div>
                <p className="mb-1">
                  <span className="font-bold">Address: </span>
                  {authUserData?.address}
                </p>

                <p className="mb-1">
                  <span className="font-bold">Age: </span>
                  {authUserData?.age_years} years, {authUserData?.age_months}{" "}
                  months
                </p>
                <p className="mb-1">
                  <span className="font-bold">Gender: </span>
                  {authUserData?.gender}
                </p>
              </div>
            )}
            {category_ === "medic" && (
              <p className="mb-1">
                <span className="font-bold">Specialization: </span>
                {authUserData?.specialization}
              </p>
            )}
          </div>
        </div>
        {category_ === "patient" && authUserData?.med_record_id !== null && (
          <div className="mt-3">
            <p className="mt-8 p-6 text-center font-extrabold text-slate-600">
              Medical Record
            </p>
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
                <span className="font-bold">Other Medical Information</span>:{" "}
                {medicalRecord?.medical_info}
              </p>
            </div>
          </div>
        )}
        <div
          className={`${
            category_ === "medic" ||
            (category_ === "patient" && authUserData?.med_record_id !== null)
              ? "hidden"
              : "flex text-center justify-center text-lg text-red-500"
          }`}
        >
          <p>
            Hi {authUserData?.first_name}!, you do not have a medical record
            yet!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
