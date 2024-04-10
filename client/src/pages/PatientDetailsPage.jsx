import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import avatar from "../assets/images/avatar.png";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function PatientDetailsPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);

  const apiURL = import.meta.env.VITE_API_BASE_URL;

  const URL = `${apiURL}/api/v1/patients`;

  useEffect(() => {
    axios
      .get(`${URL}/${id}`)
      .then((response) => {
        setPatient(response.data.data[0]);
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
    <div className="h-screen p-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* <div>Patients id: {id}</div> */}
        <div className="flex">
          <div className="pt-4">
            <img
              src={avatar}
              alt="patient-image"
              className="w-40 rounded-lg justifty-center bg-gray-300"
            />
          </div>
          <h2 className="text-sm text-slate-400 mt-40 ml-2">
            {patient?.first_name}
          </h2>
        </div>
        <div className="p-5 rounded-md border-solid bg-[#FFFFFF] space-y-4 shadow-md md:col-span-1 md:pt-20">
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
          <Link
            to={`/patients/${patient.id}/medical-record`}
            className="pt-11 ml-[65%] text-sm underline text-blue-400"
          >
            view patient's medical record
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PatientDetailsPage;
