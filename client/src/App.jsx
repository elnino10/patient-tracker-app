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
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [decodedToken, setDecodedToken] = useState(null);
  const [category_, setCategory_] = useState("");
  const [userId, setUserId] = useState("");
  const [authUserData, setAuthUserData] = useState({});
  const [activePage, setActivePage] = useState("");
  const [showImageMenu, setShowImageMenu] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const apiURL = import.meta.env.VITE_API_BASE_URL;
  let reqURL;
  if (category_ && userId) {
    reqURL = `${apiURL}/api/v1/${category_}s/${userId}`;
  }

  // get authenticated user's data
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

    if (reqURL) {
      axios
        .get(reqURL)
        .then((res) => {
          setAuthUserData(res.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    updateAxiosHeaders();

    return () => {
      delete axios.defaults.headers.common["Authorization"];
    };
  }, [token]);

  // get current user's data
  useEffect(() => {
    axios
      .get(reqURL)
      .then((res) => {
        if (res.data.data.length > 0) {
          setUserData(res.data.data[0]);
          // console.log(res.data.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // if token is null, reset authUserData and decodedToken
  useEffect(() => {
    if (!token) {
      setAuthUserData({});
      setDecodedToken(null);
      navigate("/");
      setActivePage("home");
    } else {
    }
  }, [token]);

  if (localStorage.getItem("access_token") && !decodedToken) {
    const decoded = KJUR.jws.JWS.parse(token);
    setDecodedToken(decoded?.payloadObj);
    setCategory_(decoded?.payloadObj.category);
    setUserId(decoded?.payloadObj.sub);
  }

  const clickAwayHandler = () => {
    setMenuVisible(false);
    setShowImageMenu(false);
  };

  return (
    <div onClick={clickAwayHandler}>
      <Header
        setMenuVisible={setMenuVisible}
        menuVisible={menuVisible}
        token={token}
        setToken={setToken}
        decodedToken={decodedToken}
        setAuthUserData={setAuthUserData}
        activePage={activePage}
        setActivePage={setActivePage}
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
        <Route path="/patients" element={<Patients setActivePage={setActivePage} />} />
        <Route path="/patients/:id" element={<PatientDetailsPage />} />
        <Route
          path="/user-profile/:id"
          element={
            <UserProfile
              decodedToken={decodedToken}
              authUserData={authUserData}
              token={token}
              setShowImageMenu={setShowImageMenu}
              showImageMenu={showImageMenu}
            />
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <UserDashboard decodedToken={decodedToken} userData={userData} setActivePage={setActivePage} />
          }
        />
        <Route path="/patients/:id/create-record" element={<CreateReport />} />
        <Route
          path="/patients/:id/medical-record"
          element={<MedicalRecordPage category_={category_} />}
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
