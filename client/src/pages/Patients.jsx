import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import avatar from "../assets/images/avatar.png";

import { Box, CircularProgress } from "@mui/material";

const Patients = ({ setActivePage, data, setData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const apiURL = import.meta.env.VITE_API_BASE_URL;

  const URL = `${apiURL}/api/v1/patients`;

  useEffect(() => {
      axios
        .get(URL)
        .then((response) => {
          if (response.data) {
            const data = response.data.data;
            setData(data);
            // console.log(data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

  // redirect after 3 seconds if user data is not available
  useEffect(() => {
    setIsLoading(true);
    if (!data.length > 0) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        navigate("/error");
      }, 3000);
      return () => clearTimeout(timer);
    } else setIsLoading(false);
  }, [data, navigate]);

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
    <div className="h-screen">
      <div className="w-full text-center">
        <input
          className="border border-slate-300 shadow-sm rounded mt-5
            text-start px-2 py-1 w-1/2 md:py-2 md:w-1/3 lg:w-1/4"
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
            <div key={patient.id} onClick={() => setActivePage("")}>
              <Link
                to={`/patients/${patient.id}`}
                className="bg-white my-2 mx-1 rounded-md flex items-center p-5
                justify-between border md:min-h-44 md:mx-2 lg:px-10 lg:mx-40"
              >
                <div>
                  <img
                    src={patient.profile_pic ? patient.profile_pic : avatar}
                    alt="patient-image"
                    className="w-24 h-24 rounded-lg bg-gray-300 md:w-32 md:h-32"
                  />
                </div>
                <div
                  className="min-w-44 ml-2 flex flex-col justify-between items-start
                  text-sm text-gray-500 border rounded-md shadow-md px-5 py-2 md:min-w-80
                  md:min-h-32 md:py-3 md:text-[1.2rem] lg:min-w-96"
                >
                  <p className="flex flex-col mb-2 md:mb-1">
                    <span className="text-gray-600 text-[0.8rem] leading-3 md:text-[1rem] md:leading-5">
                      Name
                    </span>{" "}
                    <span>
                      {patient.first_name} {patient.last_name}
                    </span>
                  </p>
                  <p className="flex flex-col mb-2">
                    <span className="text-gray-600 text-[0.8rem] leading-3 md:text-[1rem] md:leading-5">
                      Contact email
                    </span>
                    <span>{patient.email}</span>
                  </p>
                </div>
                <div>
                  <p
                    className="md:flex md:pt-11 md:text-slate-400"
                  >
                    <span>Phone: </span>{patient.phone}
                  </p>
                </div>
              </Link>
            </div>
          ))}
    </div>
  );
};

export default Patients;
