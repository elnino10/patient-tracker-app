import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import avatar from "../assets/images/avatar.png";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, CircularProgress } from "@mui/material";

const Patients = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const apiURL = import.meta.env.VITE_API_BASE_URL;
  
  const URL = `${apiURL}/api/v1/patients`;

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setData(response.data.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!data.length > 0) {
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
      <div className="w-full text-center">
        <input
          className="border rounded mt-5 text-center p-1 w-1/3 md:w-1/4 lg:w-1/5"
          placeholder="search by name"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {data &&
        data
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.first_name.toLowerCase().includes(search.toLowerCase()) ||
                  item.last_name.toLowerCase().includes(search.toLowerCase());
          })
          .map((patient) => (
            <div
              key={patient.email}
              className="my-2 mx-1 rounded-md flex items-start justify-between p-5 border"
            >
              <div>
                <div className="flex relative">
                  <img
                    src={avatar}
                    alt="patient-image"
                    className="w-12 h-12 rounded-full bg-gray-300"
                  />
                </div>
                <h3 className="text-gray-600">
                  {patient.first_name} {patient.last_name}
                </h3>
              </div>
              <div>
                <p className="text-gray-600 pt-11">Email: {patient.email}</p>
              </div>
              <Link to={`/patients/${patient.id}`} className="pt-11 text-sm underline text-blue-400">
                view patient's details
              </Link>
            </div>
          ))}
    </div>
  );
};

export default Patients;
