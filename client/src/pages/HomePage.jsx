import { useState } from "react";
import { Link } from "react-router-dom";
import sideImg from "../assets/images/doc.png";
import securityIcon from "../assets/images/icon1.png";
import { BMICalculator, SymptomsChecker } from "../components";

const HomePage = ({ token }) => {
  const [showBMI, setShowBMI] = useState(false);
  const [showSymptomChecker, setSymptomChecker] = useState(false);

  const handleShowBMI = () => {
    setShowBMI(!showBMI);
    setSymptomChecker(false);
  };

  const handleSymptomChecker = () => {
    setShowBMI(false);
    setSymptomChecker(!showSymptomChecker);
  };

  const handleClose = () => {
    setShowBMI(false);
    setSymptomChecker(false);
  };

  return (
    <div className="bg-[#F9F7F0]">
      <div className="text-black py-20 px-6 md:flex items-center justify-between">
        <div className="md:w-1/2 md:pr-10 mb-6 md:mb-0">
          <h1 className="text-[#3256a8] text-4xl font-bold mb-4">
            Your Medical Records, Securely Managed
          </h1>
          <p className="text-sm text-center">
            In the event of emergencies, quick access to your medical
            information can be crucial. Our app offers secure cloud storage,
            allowing you to retrieve your health records anytime, anywhere,
            ensuring seamless communication with healthcare providers for timely
            and informed medical interventions
          </p>
          <div className="flex justify-center my-10">
            {/* If user is logged in, don't show sign up buttons */}
            {!token && (
              <div>
                <Link
                  to="/register-patient"
                  className="bg-blue-600 text-white py-3 px-6 rounded-full mr-4 hover:bg-blue-700"
                >
                  Patient SignUp
                </Link>
                <Link
                  to="/register-medic"
                  className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700"
                >
                  Medic SignUp
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="md:w-1/2">
          <img
            src={sideImg}
            alt="Medical Illustration"
            className="w-full h-auto"
          />
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
            <button
              onClick={handleSymptomChecker}
              className="bg-blue-600 text-white py-8 px-6 rounded-lg w-full mb-4 hover:bg-blue-700"
            >
              Get AI Response for Symptoms
            </button>
          </div>
          {/* BMI Checker Button */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
            <button
              onClick={handleShowBMI}
              className="bg-blue-600 text-white py-8 px-6 rounded-lg w-full mb-4 hover:bg-blue-700"
            >
              Check Your BMI
            </button>
          </div>
        </div>
      </div>

      {/* ////////////////////////////////////////////////////////////////////////////// */}

      {/* BMI and Symptoms check Section */}
      <div className="mb-5">
        {showBMI && (
          <div className="flex justify-between bg-slate-200 md:justify-center">
            <div className="container mx-auto py-20 flex px-8 pt-5 justify-center">
              <BMICalculator />
            </div>
            <div>
              <span
                onClick={handleClose}
                className="border border-slate-400 shadow-xl rounded-full pb-1 mt-3 mr-3 h-6 w-6 flex justify-center items-center"
              >
                x
              </span>
            </div>
          </div>
        )}
        {showSymptomChecker && (
          <div className="flex justify-between bg-slate-200 md:justify-center">
            <div className="container mx-auto py-20 flex px-8 pt-5 md:justify-center">
              <SymptomsChecker />
            </div>
            <span
              onClick={handleClose}
              className="border border-slate-300 rounded-full pb-1 px-1 mt-2 mr-2 h-5 flex items-center"
            >
              x
            </span>
          </div>
        )}
      </div>

      {/* ////////////////////////////////////////////////////////////////////////////// */}

      <div className="bg-[#d5dbda] text-[#696969] container mx-auto py-20 flex px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="rounded-md border-solid bg-[#FFFFFF] shadow-md col-span-1 md:col-span-1">
            <div className="p-8">
              <div className="text-3xl font-bold mb-4 flex items-center">
                <img src={securityIcon} alt="secuirtyIcon" className="h-7 mr-2" />
                <strong>Secure</strong>
              </div>
              <p className="text-[#696969]">
                Store sensitive and confidential patient records in a secure
                cloud-based electronic medical records system that is compliant
                with data privacy standards for encryption, data integrity, and
                availability.
              </p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="rounded-md border-solid bg-[#FFFFFF] col-span-1 shadow-md md:col-span-1">
            <div className="p-8">
              <div className="text-3xl font-bold mb-4">
                <strong>Feature 2</strong>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="rounded-md border-solid bg-[#FFFFFF] shadow-md col-span-1 md:col-span-1">
            <div className="p-8">
              <div className="text-3xl font-bold mb-4">
                <strong>Feature 3</strong>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
