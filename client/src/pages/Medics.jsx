import { useEffect, useState } from "react";
import axios from "axios";

import { Box, CircularProgress } from "@mui/material";
import avatar from "../assets/images/avatar.png";
import bgImage from "../assets/images/bg.jpg";

const Medics = () => {
  const [data, setData] = useState([]);

  const apiURL = import.meta.env.VITE_API_BASE_URL;
  const reqURL = `${apiURL}/api/v1/medics`;

  // get all medics
  useEffect(() => {
    axios
      .get(reqURL)
      .then((res) => {
        if (res.data.data.length > 0) {
          setData(res.data.data);
          // console.log(res.data.data);
        }
      })
      .catch((error) => {
        error.response && console.log(error.response.data.message);
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
    <div className="h-full">
      <div>
        <div
          className="bg-cover bg-center w-full h-64 flex flex-col items-center
          justify-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <h3 className="font-bold text-4xl text-white">Our Doctors</h3>
          <p className="text-lg text-blue-900 px-5 text-center md:px-52">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            maiores in, iure atque fuga at porro rem odit error tempora, cumque
            blanditiis laudantium, officiis placeat fugiat perspiciatis dolorem
            provident ex!
          </p>
        </div>
      </div>
      <div className="flex flex-wrap px-10 my-5 md:px-60">
        {data &&
          data.map((medic) => (
            <div
              key={medic.id}
              className="bg-blue-100 w-56 mt-5 mx-auto pb-2
                border border-blue-100 rounded-lg flex flex-col items-center
                justify-center"
            >
              <div className="">
                <img
                  src={medic.profile_pic ? medic.profile_pic : avatar}
                  className="object-cover h-80 w-72"
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default Medics;
