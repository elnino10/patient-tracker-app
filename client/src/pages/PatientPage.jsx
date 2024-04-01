import React from "react";
import { useParams } from "react-router-dom";

function PatientPage() {
  const { id } = useParams();
  return <div className="h-screen">Patient id: {id}</div>;
}

export default PatientPage;
