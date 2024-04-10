import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import avatar from "../assets/images/avatar.png";

import { Box, CircularProgress } from "@mui/material";

const Patients = ({ setActivePage }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const apiURL = import.meta.env.VITE_API_BASE_URL;

  const URL = `${apiURL}/api/v1/patients`;

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        if (response.data.data.length > 0) {
          const data = response.data.data;
          setData(data);
          // console.log(data);
        }
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
          className="border border-slate-300 rounded mt-5 text-start p-2 w-1/3 md:w-1/4 lg:w-1/5 shadow-sm"
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
              key={patient.id}
              className="my-2 mx-1 rounded-md flex items-start justify-between p-5 border"
            >
              <div>
                <div className="flex relative">
                  <img
                    src={patient.profile_pic ? patient.profile_pic : avatar}
                    alt="patient-image"
                    className="w-16 h-16 rounded-full bg-gray-300"
                  />
                </div>
                <h3 className="text-gray-600">
                  {patient.first_name} {patient.last_name}
                </h3>
              </div>
              <div>
                <p className="text-gray-600 pt-11">Email: {patient.email}</p>
              </div>
              <Link
                onClick={() => setActivePage("")}
                to={`/patients/${patient.id}`}
                className="pt-11 text-sm underline text-blue-400"
              >
                view patient's details
              </Link>
            </div>
          ))}
    </div>
  );
};

export default Patients;
