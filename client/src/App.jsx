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
  PatientDetailsPage,
  UserDashboard,
  MedicalRecordPage,
  MedicsDetailsPage,
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
  // const [isAuth, setIsAuth] = useState(false);
  // const [decodedToken, setDecodedToken] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [category_, setCategory_] = useState("");
  const [userId, setUserId] = useState("");
  const [authUserData, setAuthUserData] = useState(null);
  const [activePage, setActivePage] = useState("");
  const [showImageMenu, setShowImageMenu] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const apiURL = import.meta.env.VITE_API_BASE_URL;
  let reqURL;
  if (category_ && userId) {
    reqURL = `${apiURL}/api/v1/${category_}s/${userId}`;
  }

  // set token on user sign in
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
  }, [token]);

  // get and decode access token when page loads
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      let decoded = KJUR.jws.JWS.parse(token);
      setCategory_(decoded?.payloadObj.category);
      setUserId(decoded?.payloadObj.sub);
    }
  }, [token]);

  // make request to get user data
  useEffect(() => {
    if ((category_ && userId) || fileUploaded) {
      axios
        .get(reqURL)
        .then((res) => {
          if (res.data.data.length > 0) setAuthUserData(res.data.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [category_, userId, fileUploaded]);

  // if token is null, reset authUserData and decodedToken
  useEffect(() => {
    if (token === null) {
      setAuthUserData(null);
      setMedicalRecord(null);
      setCategory_("");
      setUserId("");
      setActivePage("");
      navigate("/login");
    }
  }, [token]);

  const clickAwayHandler = () => {
    setMenuVisible(false);
    setShowImageMenu(false);
  };

  return (
    <div onClick={clickAwayHandler} className="bg-slate-100">
      <Header
        setMenuVisible={setMenuVisible}
        menuVisible={menuVisible}
        token={token}
        setToken={setToken}
        activePage={activePage}
        setActivePage={setActivePage}
        setMedicalRecord={setMedicalRecord}
      />
      <Routes>
        <Route path="/" element={<HomePage token={token} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} setActivePage={setActivePage} />}
        />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/register-patient" element={<RegisterPatient />} />
        <Route path="/register-medic" element={<RegisterMedic />} />
        <Route path="/recover-password" element={<PasswordRecoveryEmail />} />
        <Route path="/reset-password" element={<PasswordResetForm />} />
        <Route path="/our-doctors" element={<Medics />} />
        <Route path="/our-doctors/:id" element={<MedicsDetailsPage />} />
        <Route
          path="/patients"
          element={
            <Patients
              setActivePage={setActivePage}
              data={data}
              setData={setData}
            />
          }
        />
        <Route
          path="/patients/:id"
          element={<PatientDetailsPage category_={category_} />}
        />
        <Route
          path="/user-profile/:id"
          element={
            <UserProfile
              token={token}
              authUserData={authUserData}
              setShowImageMenu={setShowImageMenu}
              showImageMenu={showImageMenu}
              category_={category_}
              userId={userId}
              setFileUploaded={setFileUploaded}
            />
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <UserDashboard
              setActivePage={setActivePage}
              authUserData={authUserData}
              category_={category_}
              userId={userId}
              setMedicalRecord={setMedicalRecord}
              medicalRecord={medicalRecord}
            />
          }
        />
        <Route path="/patients/:id/create-record" element={<CreateReport />} />
        <Route
          path="/patients/:id/medical-record"
          element={<MedicalRecordPage category_={category_} />}
        />
        <Route
          path="/error"
          element={
            <div className="h-screen flex justify-center mt-20 font-bold text-large">
              <h1>Oops! Something went wrong</h1>
            </div>
          }
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
