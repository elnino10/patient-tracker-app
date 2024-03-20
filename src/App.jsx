import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import Login from "./components/layoutForms/LoginForm";
import RegisterPatient from "./components/layoutForms/RegisterPatientForm";
import RegisterMedic from "./components/layoutForms/RegisterMedicForm";
import CreateReport from "./components/layoutForms/CreateReportForm";
import Header from "./components/header/Header";
import PasswordRecoveryEmail from "./components/layoutForms/PasswordRecoveryEmail";
import PasswordResetForm from "./components/layoutForms/PasswordResetForm";

import Date from "./components/layoutForms/Date";

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
        <Route path="/registerPatient" element={<RegisterPatient />} />
        <Route path="/registerMedic" element={<RegisterMedic />} />
        <Route path="/createReport" element={<CreateReport />} />
        <Route path="/recoverPassword" element={<PasswordRecoveryEmail />} />
        <Route path="/resetPassword" element={<PasswordResetForm />} />
        <Route path="/date" element={<Date />} />
      </Routes>
    </div>
  );
};

export default App;
