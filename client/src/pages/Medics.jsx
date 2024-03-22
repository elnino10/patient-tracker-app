import React from "react";
import doctorFemale from "../assets/images/doctor_female.jpg";
import doctorMale from "../assets/images/doctor_male.jpg";
import femaleDoctor from "../assets/images/female-doctor.jpg";
import bgImage from "../assets/images/bg.jpg";

const Medics = () => {
  return (
    <>
      <div>
        <div
          className="bg-cover bg-center w-full h-64 flex flex-col items-center
          justify-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <h3 className="font-bold text-4xl text-white">Our Doctors</h3>
          <p className="text-lg text-blue-900">
            Your Health matters to us, that's why we are here to serve you
            better.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap px-10 my-5 md:px-60">
        <div
          className="bg-blue-100 w-56 mt-5 mx-auto pb-2
                border border-blue-100 rounded-lg flex flex-col items-center
                justify-center"
        >
          <div className="">
            <img src={doctorFemale} className="object-cover h-80 w-72" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-bold pt-2">Chizzy Okpara</p>
            <span className="font-medium text-md text-blue-900">
              Orthodontist
            </span>
          </div>
        </div>
        <div
          className="bg-blue-100 w-56 mt-5 mx-auto pb-2
                border border-blue-100 rounded-lg flex flex-col items-center
                justify-center"
        >
          <div className="">
            <img src={doctorMale} className="object-cover h-80 w-72" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-bold pt-2">Chima Ogbodo</p>
            <span className="font-medium text-md text-blue-900">
              Ophthalmologist
            </span>
          </div>
        </div>
        <div
          className="bg-blue-100 w-56 mt-5 mx-auto pb-2
                border border-blue-100 rounded-lg flex flex-col items-center
                justify-center"
        >
          <div className="">
            <img src={femaleDoctor} className="object-cover h-80 w-72" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-bold pt-2">Amanda Alili</p>
            <span className="font-medium text-md text-blue-900">
              Neurologist
            </span>
          </div>
        </div>
        <div
          className="bg-blue-100 w-56 mt-5 mx-auto pb-2
                border border-blue-100 rounded-lg flex flex-col items-center
                justify-center"
        >
          <div className="">
            <img src={doctorMale} className="object-cover h-80 w-72" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-bold pt-2">Chima Ogbodo</p>
            <span className="font-medium text-md text-blue-900">
              Ophthalmologist
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Medics;
