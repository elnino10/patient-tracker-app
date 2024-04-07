import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
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
    <div className="h-screen">
      <div className="grid md:grid-cols-3 gap-8">
        {/* <div>Patients id: {id}</div> */}
        <div className="flex">
          <div className="pt-4">
            <img
              src={avatar}
              alt="patient-image"
              className="w-12 h-12 rounded-full justifty-center bg-gray-300"
            />
          </div>
          <h2>{patient?.first_name}</h2>
        </div>
        <div className="rounded-md border-solid bg-[#FFFFFF] space-y-4 shadow-md md:col-span-1 md:pt-20">
          <div>
            <p>
              Name: {patient?.first_name} {patient?.last_name}
            </p>
          </div>
          <div>
            <p>Email: {patient?.email}</p>
          </div>
          <div>
            <p>Phone: {patient?.phone}</p>
          </div>
          <div>
            <p>Address: {patient?.address}</p>
          </div>
          <div>
            <p>Gender: {patient?.gender}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDetailsPage;
