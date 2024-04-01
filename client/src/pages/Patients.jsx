import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import avatar from "../assets/images/avatar.png";

const URL = "http://localhost:5000/api/v1/patients";
const Patients = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setData(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="h-screen">
      <div className="w-full text-center">
        <input
          className="border rounded mt-5 p-1 w-1/2"
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
                <img
                  src={avatar}
                  alt="patient-image"
                  className="w-12 h-12 rounded-full bg-gray-300"
                />
                <h3 className="text-gray-600">{patient.first_name} {patient.last_name}</h3>
              </div>
              <div>
                <p className="text-gray-600">email: {patient.email}</p>
              </div>
              <Link to={`/patients/${patient.id}`}>view patient's details</Link>
            </div>
          ))}
    </div>
  );
};

export default Patients;
