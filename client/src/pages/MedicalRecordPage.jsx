import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import avatar from "../assets/images/avatar.png";
import axios from "axios";

import { Box, CircularProgress } from "@mui/material";

const MedicalRecordPage = ({ category_ }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [editInput, setEditInput] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [name, setName] = useState("");

  const [allergies, setAllergies] = useState("");
  const [medication, setMedication] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [history, setHistory] = useState("");
  const [medicalInfo, setMedicalInfo] = useState("");

  const { id } = useParams();

  const apiURL = import.meta.env.VITE_API_BASE_URL;
  const reqURL = `${apiURL}/api/v1/patients/${id}/medical-record`;
  const dataURL = `${apiURL}/api/v1/patients/${id}`;
  const imageStorageURL = `${apiURL}/api/v1/profile-pic/${id}`;

  // get patient's name
  useEffect(() => {
    axios
      .get(dataURL)
      .then((res) => {
        if (res.data.status === "success") {
          const data = res.data.data[0];
          setName(data.first_name);
        //   console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // get patients medical record
  useEffect(() => {
    axios
      .get(reqURL)
      .then((res) => {
        if (res.data.status === "success") {
          const data = res.data.data[0];
          setAllergies(data.allergies);
          setMedication(data.medication);
          setDiagnosis(data.diagnosis);
          setHistory(data.history);
          setMedicalInfo(data.medical_info);
        //   console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // get profile image when page loads
  useEffect(() => {
    axios
      .get(imageStorageURL)
      .then((res) => {
        if (res.data.data.length > 0) {
          setProfileImage(res.data.data[0].profile_pic);
          // console.log(res.data);
        } else {
          setSubmitting(false);
        }
      })
      .catch((error) => {
        setProfileImage(null);
        error.response && setErrorMessage(error.response.data.message);
        console.error(error);
      });
  }, []);

  // get new profile image after update
  useEffect(() => {
    setUpdated(false);
    // if (!profileImage) {
    //   setSubmitting(true);
    axios
      .get(reqURL)
      .then((res) => {
        if (res.data.data.length > 0) {
          const data = res.data.data[0];
          setAllergies(data.allergies);
          setDiagnosis(data.diagnosis);
          setHistory(data.history);
          setMedication(data.medication);
          setMedicalInfo(data.medical_info);
          // setSubmitting(false);
          // console.log(res.data);
        }
      })
      .catch((error) => {
        setProfileImage(null);
        setSubmitting(false);
        error.response && setErrorMessage(error.response.data.message);
        console.error(error);
      });
    // }
  }, [updated]);

  // handle medical record update
  const handleSubmitRecord = () => {
    setEditInput(false);
    setSubmitting(true);
    let recordData;
    recordData = {
      allergies: allergies,
      history: history,
      medication: medication,
      medical_info: medicalInfo,
      diagnosis: diagnosis,
    };
    if (recordData) {
      axios
        .patch(reqURL, recordData)
        .then((res) => {
          if (res.data.data.length > 0) {
            setSubmitting(false);
            setUpdated(true);
            // console.log(res.data.data[0]);
          } else setSubmitting(false);
        })
        .catch((error) => {
          setSubmitting(false);
          error.response && console.log(error.response.data.message);
        });
    }
  };

  const updateButtonHandler = () => {
    setEditInput(!editInput);
    setUpdated(!updated);
  };

  // loading spinner
  if (!allergies && !medicalInfo && !diagnosis && !medication && !history) {
    return (
      <div className="h-screen flex justify-center">
        <Box sx={{ display: "flex" }} className="p-10">
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <div className="h-full md:h-screen xl:h-screen lg:h-screen">
      <div className="border-b-2 block md:flex">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
          <div className="flex justify-between">
            <span className="text-xl font-semibold block">
              <span>{name && name}'s</span> medical record
            </span>
            {category_ === "medic" && (
              <div
                onClick={updateButtonHandler}
                className="-mt-2 text-md font-bold cursor-pointer text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
              >
                {editInput ? "Cancel" : "Update"}
              </div>
            )}
          </div>
          <div className="w-full p-8 mx-2 flex justify-center">
            <img
              src={profileImage ? profileImage : avatar}
              alt="profile-image"
              className="w-[15rem]"
            />
          </div>
        </div>
        <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
          <div className="rounded  shadow p-6">
            <div className="pb-6">
              <label
                htmlFor="first_name"
                className="font-semibold text-gray-700 block pb-1"
              >
                Allergies
              </label>
              <div className="flex">
                <textarea
                  {...(!editInput && { disabled: true })}
                  id="allergies"
                  className="border-1 rounded-r px-4 py-2 w-full bg-slate-100"
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                />
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="last_name"
                className="font-semibold text-gray-700 block pb-1"
              >
                Medication
              </label>
              <div className="flex">
                <textarea
                  {...(!editInput && { disabled: true })}
                  id="medication"
                  className="border-1  rounded-r px-4 py-2 w-full bg-slate-100"
                  type="text"
                  value={medication}
                  onChange={(e) => setMedication(e.target.value)}
                />
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="specialization"
                className="font-semibold text-gray-700 block pb-1"
              >
                Diagnosis
              </label>
              <div className="flex">
                <textarea
                  {...(!editInput && { disabled: true })}
                  id="diagnosis"
                  className="border-1  rounded-r px-4 py-2 w-full bg-slate-100"
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="pb-6">
                <label
                  htmlFor="address"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Medical History
                </label>
                <div className="flex">
                  <textarea
                    {...(!editInput && { disabled: true })}
                    id="history"
                    className="border-1  rounded-r px-4 py-2 w-full bg-slate-100"
                    type="text"
                    value={history}
                    onChange={(e) => setHistory(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="pb-4">
              <label
                htmlFor="email"
                className="font-semibold text-gray-700 block pb-1"
              >
                Other Medical Information
              </label>
              <textarea
                {...(!editInput ? { disabled: true } : {})}
                id="medical_info"
                className="border-1 rounded-r px-4 py-2 w-full bg-slate-100"
                type="text"
                value={medicalInfo}
                onChange={(e) => setMedicalInfo(e.target.value)}
              />
            </div>
            {category_ === "medic" && (
              <button
                onClick={handleSubmitRecord}
                className="-mt-2 w-[50%] flex items-center justify-center text-md font-bold text-white bg-blue-500 rounded-full px-5 py-2 hover:bg-blue-700"
              >
                {submitting ? "Updating..." : "Submit"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordPage;
