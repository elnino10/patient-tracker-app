import { Link } from "react-router-dom";
import React from 'react';
import sideImg from "../assets/images/doc.png";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const HomePage = () => {
  return (
    <div className="bg-[#F9F7F0]">
      <div className="text-black py-20 px-6 md:flex items-center justify-between">
        <div className="md:w-1/2 md:pr-10 mb-6 md:mb-0">
            <h1 className="text-[#3256a8] text-4xl font-bold mb-4">Your Medical Records, Securely Managed</h1>
            <p className="text-sm">In the event of emergencies, quick access to
                                your medical information can be crucial. Our app
                                offers secure cloud storage, allowing you to retrieve
                                your health records anytime, anywhere, ensuring seamless
                                communication with healthcare providers for timely and 
                                informed medical interventions</p>
          <div className="flex justify-center my-10">
        <Link to="/register-patient" className="bg-blue-600 text-white py-3 px-6 rounded-full mr-4 hover:bg-blue-700">Patient SignUp</Link>
        <Link to="/register-medic" className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700">Medic SignUp</Link>
      </div>
        </div>
        
        <div className="md:w-1/2">
          <img src={sideImg} alt="Medical Illustration" className="w-full h-auto" />
        </div>
      </div>
      {/* Feature Section */}
      <div className="px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <p className="text-lg">Explore the features of our app:</p>
        </div>
        <div className="flex flex-wrap justify-center">
          {/* AI Response Button */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
            <button className="bg-blue-600 text-white py-8 px-6 rounded-lg w-full mb-4 hover:bg-blue-700">Get AI Response for Symptoms</button>
          </div>
          {/* BMI Checker Button */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
            <button className="bg-blue-600 text-white py-8 px-6 rounded-lg w-full mb-4 hover:bg-blue-700">Check Your BMI</button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-200 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg">Learn more about our team and mission.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

