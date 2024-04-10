import { useState } from "react";
import avatar from "../assets/images/avatar.png";

const MedicalRecordPage = () => {
  const [editInput, setEditInput] = useState();

  const [allergies, setAllergies] = useState("");
  const [medication, setMedication] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [history, setHistory] = useState("");
  const [medical_info, setMedicalInfo] = useState("");

  return (
    <div className="h-full md:h-screen">
      <div className="border-b-2 block md:flex">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
          <div className="flex justify-between">
            <span className="text-xl font-semibold block">
              <span>Aminu's</span> medical record
            </span>
            <div
              onClick={() => setEditInput(!editInput)}
              className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
            >
              {editInput ? "Cancel" : "Update"}
            </div>
          </div>
          <div className="w-full p-8 mx-2 flex justify-center">
            <img src={avatar} alt="profile-image" />
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
                value={medical_info}
                onChange={(e) => setMedicalInfo(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordPage;
