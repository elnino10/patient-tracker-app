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
        category_ === "medic" ? "h-screen" : "h-full md:h-screen lg:h-full"
      } m-2 mt-4 border-solid rounded-md md:px-5`}
    >
      <div className="p-6 flex justify-between pt-2 md:pt-5 md:px-20 md:p-0 md:mt-20 md:max-h-[20rem]">
        <div className="flex flex-col justify-center items-center md:mb-10">
          <div className="pt-2">
            <img
              src={
                authUserData && authUserData.profile_pic !== null
                  ? authUserData?.profile_pic
                  : avatar
              }
              alt="patient-image"
              className="w-32 h-32 rounded-lg bg-gray-300 md:w-60 md:h-60 lg:w-46 lg:h-46 xl:w-64 xl:h-64"
            />
          </div>
          <h2
            className={`${
              !category_ === "medic"
                ? "hidden"
                : "mt-3 text-md text-sm text-gray-500 md:mb-10"
            }`}
          >
            {authUserData?.specialization}
          </h2>
        </div>
        <div className="pt-6 ml-16">
          <Link
            onClick={() => setActivePage("")}
            to={`/user-profile/${authUserData?.id}`}
            className="text-white bg-gray-700 shadow-xl rounded-lg px-2 py-1 
              text-sm hover:bg-gray-800 md:text-[1rem] md:px-4 md:py-2"
          >
            view profile
          </Link>
        </div>
      </div>
      <div
        className={`${
          category_ === "medic" ? "mx-5" : ""
        } md:flex md:justify-between md:border-t md:border-slate-300 md:pt-5 lg:px-36 lg:pb-10`}
      >
        <div
          className={`${
            category_ === "medic"
              ? "md:max-w-[25rem] md:mx-auto"
              : " mt-5 mb-10 flex flex-col items-center md:mt-0"
          } border-t border-slate-300 pt-5 md:border-t-0`}
        >
          <p className="font-extrabold text-center text-slate-600">
            Basic Information
          </p>
          <div
            className={`${
              category_ === "medic" ? "" : "min-h-80"
            } text-slate-700 p-4 min-w-80 mt-3 rounded-md border-solid border-2 bg-[#FFFFFF] shadow-md md:col-span-1 lg:min-w-[25rem]`}
          >
            <p className="flex flex-col mb-2">
              <span className="font-bold">Name </span>
              <span>
                {authUserData?.first_name} {authUserData?.last_name}
              </span>
            </p>
            <p className="flex flex-col mb-2">
              <span className="font-bold">Email </span>
              <span>{authUserData?.email}</span>
            </p>
            <p className="flex flex-col mb-2">
              <span className="font-bold">Phone </span>
              {authUserData?.phone_number ? (
                <span>{authUserData?.phone_number}</span>
              ) : (
                <span>N/A</span>
              )}
            </p>
            {category_ === "patient" && (
              <div>
                <p className="flex flex-col mb-2">
                  <span className="font-bold">Address </span>
                  <span>{authUserData?.address}</span>
                </p>

                <p className="flex flex-col mb-2">
                  <span className="font-bold">Age </span>
                  <span>
                    {authUserData?.age_years} years, {authUserData?.age_months}{" "}
                    months
                  </span>
                </p>
                <p className="flex flex-col mb-2">
                  <span className="font-bold">Gender </span>
                  <span>{authUserData?.gender}</span>
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
          <div className="">
            <p className="mt-6 mb-2 text-center font-extrabold text-slate-600">
              Medical Record
            </p>
            <div className="mb-10">
              <div className="p-4 rounded-md border-solid border-2 bg-[#FFFFFF]">
                <p className="flex flex-col">
                  <span className="font-bold">Allergies</span>{" "}
                  <span>{medicalRecord?.allergies}</span>
                </p>
              </div>
              <div className="p-4 rounded-md border-solid border-2 bg-[#FFFFFF]">
                <p className="flex flex-col">
                  <span className="font-bold">Diagnosis</span>{" "}
                  <span>{medicalRecord?.diagnosis}</span>
                </p>
              </div>
              <div className="p-4 rounded-md border-solid border-2 bg-[#FFFFFF]">
                <p className="flex flex-col">
                  <span className="font-bold">Medical History</span>{" "}
                  <span>{medicalRecord?.history}</span>
                </p>
              </div>
              <div className="p-4 rounded-md border-solid border-2 bg-[#FFFFFF]">
                <p className="flex flex-col">
                  <span className="font-bold">Current Medication</span>{" "}
                  <span>{medicalRecord?.medication}</span>
                </p>
              </div>
              <div className="p-4 rounded-md border-solid border-2 bg-[#FFFFFF]">
                <p className="flex flex-col">
                  <span className="font-bold">Other Medical Information</span>{" "}
                  <span>{medicalRecord?.medical_info}</span>
                </p>
              </div>
            </div>
          </div>
        )}
        <div
          className={`${
            category_ === "medic" ||
            (category_ === "patient" && authUserData?.med_record_id !== null)
              ? "hidden"
              : "flex text-center justify-center text-lg text-red-500 mt-5 mb-10 md:my-auto md:font-bold"
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
