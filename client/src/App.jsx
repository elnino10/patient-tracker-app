import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Medics from "./pages/Medics";
import ServicesPage from "./pages/ServicesPage";
import Login from "./components/layoutForms/LoginForm";
import RegisterPatient from "./components/layoutForms/RegisterPatientForm";
import RegisterMedic from "./components/layoutForms/RegisterMedicForm";
import CreateReport from "./components/layoutForms/CreateReportForm";
import Header from "./components/layout/Header";
import PasswordRecoveryEmail from "./components/layoutForms/PasswordRecoveryEmail";
import PasswordResetForm from "./components/layoutForms/PasswordResetForm";
import Footer from "./components/layout/Footer";
import Patients from "./pages/Patients";

const App = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const clickAwayHandler = () => {
    setMenuVisible(false);
  };

  return (
    <div onClick={clickAwayHandler}>
      <Header setMenuVisible={setMenuVisible} menuVisible={menuVisible} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/register-patient" element={<RegisterPatient />} />
        <Route path="/register-medic" element={<RegisterMedic />} />
        <Route path="/create-report" element={<CreateReport />} />
        <Route path="/recover-password" element={<PasswordRecoveryEmail />} />
        <Route path="/reset-password" element={<PasswordResetForm />} />
        <Route path="/our-doctors" element={<Medics />} />
        <Route path="/all-patients" element={<Patients />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
