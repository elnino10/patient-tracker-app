import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const URL = "http://localhost:5000/api/v1/patients";

function PatientPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${URL}/${id}`)
      .then((response) => {
        setPatient(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
        setError(error);
      });
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Patients id: {id}</div>
      <h2>{patient.first_name} {patient.last_name}</h2>
      <p>Email: {patient.email}</p>
      <Link to={`/patients/${id}/create-record`} className="btn btn-primary">Create record</Link>
      {/* Add more details here */}
    </div>
  );
}

export default PatientPage;
