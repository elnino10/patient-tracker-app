import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Box, CircularProgress } from "@mui/material";
import avatar from "../assets/images/avatar.png";
import bgImage from "../assets/images/bg.jpg";

const Medics = () => {
  const [medicsData, setMedicsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const apiURL = import.meta.env.VITE_API_BASE_URL;
  const reqURL = `${apiURL}/api/v1/medics`;

  // get all medics
  useEffect(() => {
    axios
      .get(reqURL)
      .then((res) => {
        if (res.data.count > 0) {
          setMedicsData(res.data.data);
          // console.log(res.data.data);
        }
      })
      .catch((error) => {
        error.response && console.log(error.response.data.message);
      });
  }, []);

  // redirect after 3 seconds if user data is not available
  useEffect(() => {
    setIsLoading(true);
    if (medicsData.length === 0) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        navigate("/error");
      }, 10000);
      return () => clearTimeout(timer);
    } else setIsLoading(false);
  }, [medicsData, navigate]);

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
    <div className="h-full">
      <div>
        <div
          className="bg-cover bg-center w-full h-64 flex flex-col items-center
          justify-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <h3 className="font-bold text-4xl text-white">Our Doctors</h3>
          <p className="text-lg text-blue-900 px-5 text-center md:px-52">
            Our team of experienced and dedicated medical professionals.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap px-10 my-5 md:mx-[2rem] md:my-[2rem]">
        {medicsData &&
          medicsData.map((medic) => (
            <div key={medic.id}>
              <Link
                to={`/our-doctors/${medic.id}`}
                className="bg-blue-100 cursor-pointer w-48 my-5 mx-auto pb-2
                 rounded-lg flex flex-col items-center
                justify-center md:mx-2"
              >
                <div className="">
                  <img
                    src={medic.profile_pic ? medic.profile_pic : avatar}
                    className="object-cover h-60 mt-1"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg font-bold pt-2">
                    {medic.first_name} {medic.last_name}
                  </p>
                  <span className="font-medium text-md text-blue-900">
                    {medic.specialization}
                  </span>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Medics;
