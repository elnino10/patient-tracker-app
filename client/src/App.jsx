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
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [category_, setCategory_] = useState("");
  const [userId, setUserId] = useState("");
  const [authUserData, setAuthUserData] = useState(null);
  const [activePage, setActivePage] = useState("");
  const [showImageMenu, setShowImageMenu] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const apiURL = import.meta.env.VITE_API_BASE_URL;
  let reqURL;
  if (category_ && userId) {
    reqURL = `${apiURL}/api/v1/${category_}s/${userId}`;
  }

  // get authenticated user's data on sign in
  useEffect(() => {
    const updateAxiosHeaders = () => {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("access_token", token);
        setIsAuth(true);
      } else {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("access_token");
        setIsAuth(false);
      }
    };
    updateAxiosHeaders();

    return () => {
      delete axios.defaults.headers.common["Authorization"];
    };
  }, [token]);

  // get and decode access token when page loads
  useEffect(() => {
    if (localStorage.getItem("access_token") && !decodedToken) {
      let decoded = KJUR.jws.JWS.parse(token);
      setDecodedToken(decoded);
      setCategory_(decoded?.payloadObj.category);
      setUserId(decoded?.payloadObj.sub);
    }
  }, [token]);

  useEffect(() => {
    if ((isAuth && reqURL !== undefined) || fileUploaded) {
      // make request to get user data
      axios
        .get(reqURL)
        .then((res) => {
          if (res.data.data.length > 0) {
            setAuthUserData(res.data.data[0]);
            // console.log(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isAuth, reqURL, fileUploaded]);

  // if token is null, reset authUserData and decodedToken
  useEffect(() => {
    if (token === null) {
      setIsAuth(false);
      setAuthUserData(null);
      setDecodedToken(null);
      setMedicalRecord(null);
      setCategory_("");
      setUserId("");
      setActivePage("");
      navigate("/");
    } else {
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
        setDecodedToken={setDecodedToken}
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
        <Route path="/patients/:id" element={<PatientDetailsPage />} />
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
