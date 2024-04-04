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
import { KJUR } from "jsrsasign";

const MedicDashboard = ({ token }) => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);

  const apiURL = import.meta.env.VITE_API_BASE_URL;
  
  const URL = `${apiURL}/api/v1/patients`;

  // Decode JWT token
  let decodedToken;
  if (token) {
    decodedToken = KJUR.jws.JWS.parse(token);
  }
  //   console.log(token && token);

  useEffect(() => {
    axios
      .get(`${URL}/${id}`)
      .then((response) => {
        setPatient(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
        setError(error);
      });
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!patient) {
    return <div>
      <Box sx={{ display: 'flex' }} className="p-10">
        <CircularProgress/>
      </Box>
      {/* <p>Loading...</p> */}
      </div>;
  }
  return (
    <div>
      User Dashboard for a{" "}
      <span className="font-bold">'{decodedToken?.payloadObj.category}'</span>
      {/* <div>Patients id: {id}</div> */}
    <div className="m-8 border-solid rounded-md border-2 border-indigo-600">
      <div className="p-6 flex">
      <div className="pt-4">
          <img
            src={avatar}
            alt="patient-image"
            className="w-12 h-12 rounded-full justifty-center bg-gray-300"
            />
      </div>
      <h2>{patient.first_name}</h2>
      </div>
      <div className="pl-4 grid md:grid-cols-3 gap-8">
      <div>
        <p className="p-6 text-center">Basic Information</p>
      <div className="p-8 rounded-md border-solid border-2 bg-[#FFFFFF] space-y-4 shadow-md md:col-span-1">
        <div><p>Name: {patient.first_name} {patient.last_name}</p></div>
        <div><p>Email: {patient.email}</p></div>
        <div><p>Phone: {patient.phone}</p></div>
        <div><p>Address: {patient.address}</p></div>
        <div><p>DOB: {patient.dob}</p></div>
        <div><p>Gender: {patient.gender}</p></div>
      </div>
      </div>
      <div>
        <p className="p-6 text-center">Medical Record</p>
      <div className="p-8 rounded-md border-solid border-2 bg-[#FFFFFF] space-y-4 shadow-md md:col-span-1">
        <p>Allegies: {patient.Allergies}</p>
        {/* Add more details here */}
      </div>
      <div className="flex justify-end bg-pink-300">
      <div>
          <IconButton>
            <EditIcon fontSize="small"/>
          </IconButton>
        </div>
        <div>
          <IconButton size="small">
            <DeleteIcon fontSize="small"/>
          </IconButton>
        </div>
        <div>
        <Link to={`/patients/${id}/create-record`}>
          <IconButton>
              <AddIcon fontSize="mmedium" />
          </IconButton>
        </Link>
        </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MedicDashboard;
