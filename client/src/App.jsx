import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import {
  HomePage,
  AboutPage,
  Medics,
  ServicesPage,
  Patients,
  UserDashboard,
  PatientPage,
} from "./pages";
import {
  Login,
  RegisterPatient,
  RegisterMedic,
  CreateReport,
  Header,
  PasswordRecoveryEmail,
  PasswordResetForm,
  Footer,
} from "./components";


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
        <Route path="/recover-password" element={<PasswordRecoveryEmail />} />
        <Route path="/reset-password" element={<PasswordResetForm />} />
        <Route path="/our-doctors" element={<Medics />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/patients/:id" element={<PatientPage />} />
        <Route path="/patients/:id/create-record" element={<CreateReport />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
