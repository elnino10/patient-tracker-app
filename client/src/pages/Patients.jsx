import React, { useEffect, useState } from "react";
import avatar from "../assets/images/avatar.png";

const Patients = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/patients")
      .then((response) => response.json())
      .then((data) => setData(data));
      console.log(data);
  }, []);

  return (
    <div>
      {data.map((patient) => {
        <div key={patient.email}
            className="my-2 mx-1 rounded-md flex items-end justify-between p-5 border">
          <div>
            <img
              src={avatar}
              alt="patient-image"
              class="w-12 h-12 rounded-full bg-gray-300"
            />
            <h3 className="text-gray-600">{patient.name}</h3>
          </div>
          <div>
            <p className="text-gray-600">email: {patient.email}</p>
          </div>
        </div>
      })}
      
      {/* <div className="my-2 mx-1 rounded-md flex items-end justify-between p-5 border">
        <div>
          <img
            src={avatar}
            alt="patient-image"
            class="w-12 h-12 rounded-full bg-gray-300"
          />
          <h3 className="text-gray-600">Another patient</h3>
        </div>
        <div>
          <p className="text-gray-600">email: bar@foo.com</p>
        </div>
      </div>
      <div className="my-2 mx-1 rounded-md flex items-end justify-between p-5 border">
        <div>
          <img
            src={avatar}
            alt="patient-image"
            class="w-12 h-12 rounded-full bg-gray-300"
          />
          <h3 className="text-gray-600">Third patient</h3>
        </div>
        <div>
          <p className="text-gray-600">email: foo@bar.com</p>
        </div>
      </div> */}
    </div>
  );
};

export default Patients;
