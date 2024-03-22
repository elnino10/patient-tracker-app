import React, { useEffect, useState } from "react";
import axios from "axios";
import avatar from "../assets/images/avatar.png";

const URL = "http://localhost:5000/api/v1/patients";
const Patients = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {data.map((patient) => (
        <div
          key={patient.email}
          className="my-2 mx-1 rounded-md flex items-end justify-between p-5 border"
        >
          <div>
            <img
              src={avatar}
              alt="patient-image"
              className="w-12 h-12 rounded-full bg-gray-300"
            />
            <h3 className="text-gray-600">{patient.name}</h3>
          </div>
          <div>
            <p className="text-gray-600">email: {patient.email}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Patients;
