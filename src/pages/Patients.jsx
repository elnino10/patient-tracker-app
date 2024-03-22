import React from "react";
import avatar from "../assets/images/avatar.png";

const Patients = () => {
  return (
    <div>
      <div className="my-2 mx-1 rounded-md flex items-end justify-between p-5 border">
        <div>
          <img
            src={avatar}
            alt="patient-image"
            class="w-12 h-12 rounded-full bg-gray-300"
          />
          <h3 className="text-gray-600">Patient name</h3>
        </div>
        <div>
          <p className="text-gray-600">email: foobar@foo.com</p>
        </div>
      </div>
      <div className="my-2 mx-1 rounded-md flex items-end justify-between p-5 border">
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
      </div>
    </div>
  );
};

export default Patients;
