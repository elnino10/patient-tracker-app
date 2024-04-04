import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { KJUR } from "jsrsasign";

import {
  HomePage,
  AboutPage,
  Medics,
  ServicesPage,
  Patients,
  UserProfile,
  PatientPage,
  UserDashboard,
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
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [decodedToken, setDecodedToken] = useState(null);
  const navigate = useNavigate();

  const clickAwayHandler = () => {
    setMenuVisible(false);
  };

  useEffect(() => {
    const updateAxiosHeaders = () => {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("access_token", token);
      } else {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("access_token");
      }
    };

    updateAxiosHeaders();

    return () => {
      delete axios.defaults.headers.common["Authorization"];
    };
  }, []);

  useEffect(() => {
    if (!token) {
      setToken(null);
      navigate("/");
    }
  }, [token]);

  if (localStorage.getItem("access_token") && !decodedToken) {
    const decoded = KJUR.jws.JWS.parse(token);
    setDecodedToken(decoded?.payloadObj);
  }

  return (
    <div onClick={clickAwayHandler}>
      <Header
        setMenuVisible={setMenuVisible}
        menuVisible={menuVisible}
        token={token}
        setToken={setToken}
      />
      <Routes>
        <Route path="/" element={<HomePage token={token} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/register-patient" element={<RegisterPatient />} />
        <Route path="/register-medic" element={<RegisterMedic />} />
        <Route path="/recover-password" element={<PasswordRecoveryEmail />} />
        <Route path="/reset-password" element={<PasswordResetForm />} />
        <Route path="/our-doctors" element={<Medics />} />
        <Route path="/patients" element={<Patients />} />
        <Route
          path="/user-profile/:id"
          element={<UserProfile token={token} />}
        />
        <Route
          path="/user-dashboard"
          element={<UserDashboard decodedToken={decodedToken} />}
        />
        {/* <Route path="/patients/:id/user-dashboard" element={<UserDashboard />} /> */}
        <Route path="/patients/:id/create-record" element={<CreateReport />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
