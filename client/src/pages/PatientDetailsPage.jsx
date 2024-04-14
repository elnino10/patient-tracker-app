import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import avatar from "../assets/images/avatar.png";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function PatientDetailsPage({ category_ }) {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);

  const apiURL = import.meta.env.VITE_API_BASE_URL;
  const reqURL = `${apiURL}/api/v1/patients/${id}`;

  useEffect(() => {
    axios
      .get(reqURL)
      .then((response) => {
        if (response.data.data) {
          setPatient(response.data.data[0]);
          // console.log(response.data.data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!patient) {
    return (
      <div className="h-screen flex justify-center">
        <Box sx={{ display: "flex" }} className="p-10">
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <div className="p-8 h-screen md:mr-20">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="flex md:flex-col">
          <div className="mt-4">
            <img
              src={patient.profile_pic ? patient.profile_pic : avatar}
              alt="patient-image"
              className="w-40 rounded-lg justifty-center bg-gray-300"
            />
          </div>
          <h2 className="text-sm text-slate-400 mt-40 ml-2 md:mt-3">
            {patient?.first_name}
          </h2>
        </div>
        <div
          className="py-5 px-4 rounded-md border-solid bg-[#FFFFFF]
          space-y-4 shadow-md md:w-[30rem] md:col-span-1 md:mt-20"
        >
          <div>
            <p>
              Name: {patient?.first_name} {patient?.last_name}
            </p>
          </div>
          <div>
            <p>Email: {patient?.email}</p>
          </div>
          <div>
            <p>Address: {patient?.address}</p>
          </div>
          <div>
            <p>Gender: {patient?.gender}</p>
          </div>
          {category_ && category_ === "medic" && (
            <div>
              {patient.med_record_id !== null ? (
                <Link
                  to={`/patients/${patient.id}/medical-record`}
                  className="pt-11 ml-[65%] text-sm underline text-blue-400"
                >
                  view medical record
                </Link>
              ) : (
                <Link
                  to={`/patients/${patient.id}/create-record`}
                  className="pt-11 ml-[65%] text-sm underline text-blue-400"
                >
                  create medical record
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientDetailsPage;
