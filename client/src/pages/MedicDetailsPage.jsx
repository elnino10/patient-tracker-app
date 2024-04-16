import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import avatar from "../assets/images/avatar.png";

import { Box, CircularProgress } from "@mui/material";

function MedicDetailsPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const apiURL = import.meta.env.VITE_API_BASE_URL;
  const reqURL = `${apiURL}/api/v1/medics/${id}`;

  // get medics data
  useEffect(() => {
    axios
      .get(reqURL)
      .then((res) => {
        setData(res.data.data[0] || "");
        // console.log(res.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (!data.email) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 10000);
      return () => clearTimeout(timer);
    } else setIsLoading(false);
  }, [data]);

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
    <div className="mx-5 my-5 md:my-0 md:mt-5 h-full md:h-screen">
      <div className="border-b-2 block md:flex">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md relative">
          <div className="flex justify-between">
            <span className="text-xl uppercase italic font-semibold block">
              <span>
                {data?.first_name}'{data?.first_name?.endsWith("s") ? "" : "s"}
              </span>{" "}
              Page
            </span>
          </div>
          <div className="w-full p-8 mx-2 flex justify-center">
            <img src={data?.profile_pic ? data.profile_pic : avatar} alt="profile-pic" />
          </div>
        </div>
        <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
          <div className="rounded  shadow p-6">
            <div className="pb-6">
              <label
                htmlFor="first_name"
                className="font-semibold text-gray-700 block pb-1"
              >
                First Name
              </label>
              <div className="flex">
                <p className="border-1 rounded-r bg-slate-100 px-4 py-2 w-full">
                  {data?.first_name}
                </p>
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="last_name"
                className="font-semibold text-gray-700 block pb-1"
              >
                Last Name
              </label>
              <div className="flex">
                <p className="border-1 rounded-r bg-slate-100 px-4 py-2 w-full">
                  {data?.last_name}
                </p>
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="phoneNumber"
                className="font-semibold text-gray-700 block pb-1"
              >
                Phone number
              </label>
              <div className="flex">
                <p className="border-1 rounded-r bg-slate-100 px-4 py-2 w-full">
                  {data?.phone_number}
                </p>
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="specialization"
                className="font-semibold text-gray-700 block pb-1"
              >
                Specialization
              </label>
              <div className="flex">
                <p className="border-1 rounded-r bg-slate-100 px-4 py-2 w-full">
                  {data?.specialization}
                </p>
              </div>
            </div>
            <div className="pb-4">
              <label
                htmlFor="email"
                className="font-semibold text-gray-700 block pb-1"
              >
                Email
              </label>
              <div>
                <p className="border-1 rounded-r bg-slate-100 px-4 py-2 w-full">
                  {data?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicDetailsPage;
