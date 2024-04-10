import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png"

import MenuIcon from "@mui/icons-material/Menu";
import { MenuOpen } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";

const Header = (props) => {
  const navigate = useNavigate();

  let userId;
  if (props.token) {
    userId = props?.decodedToken.sub;
  }

  const apiURL = import.meta.env.VITE_API_BASE_URL;

  const reqURL = `${apiURL}/auth/v1/signout`;

  const toggleMenuHandler = (e) => {
    e.stopPropagation();
    props.setMenuVisible(!props.menuVisible);
  };

  const handleSignout = () => {
    axios.post(reqURL);
    localStorage.removeItem("access_token");
    props.setToken(null);
  };

  return (
    <header className="bg-blue-700 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto items-center flex justify-between p-2.5">
        <div onClick={() => props.setActivePage("home")}>
          <Link to="/">
            <span className="flex md:hidden text-slate-200">
              <HomeIcon />
            </span>
            <span className="hidden text-white md:flex"><img src={logo} alt="logo" className="w-12 rounded-full" /></span>
          </Link>
        </div>
        <div onClick={toggleMenuHandler} className="md:hidden text-slate-200">
          {props.menuVisible ? <MenuOpen /> : <MenuIcon />}
        </div>
        <nav
          className={`${
            !props.menuVisible && "hidden"
          } absolute z-20 bg-blue-100 flex flex-col top-full right-0 p-2
          md:static md:w-auto md:bg-inherit md:p-0 md:flex`}
        >
          <ul nav-bar="nav" className="md:flex md:flex-row">
            <li className="list-none py-2 border-b border-blue-900 border-opacity-25 mr-4 md:text-white">
              <Link
                to="/our-doctors"
                className={`w-full flex text-base md:hover:text-blue-200 cursor-pointer
                ${
                  props.activePage === "our-doctors" &&
                  "text-blue-700 md:text-blue-200"
                }`}
                onClick={() => props.setActivePage("our-doctors")}
              >
                Doctors
              </Link>
            </li>
            <li className="list-none py-2 border-b border-blue-900 border-opacity-25 mr-4 md:text-white">
              <Link
                to="/about"
                className={`w-full flex text-base md:hover:text-blue-200 cursor-pointer
                ${
                  props.activePage === "about" &&
                  "text-blue-700 md:text-blue-200"
                }`}
                onClick={() => props.setActivePage("about")}
              >
                About
              </Link>
            </li>
            <li className="list-none py-2 border-b border-blue-900 border-opacity-25 mr-4 md:text-white">
              <Link
                to="/patients"
                className={`w-full flex text-base md:hover:text-blue-200 cursor-pointer
                ${
                  props.activePage === "services" &&
                  "text-blue-700 md:text-blue-200"
                }`}
                onClick={() => props.setActivePage("services")}
              >
                Patients
              </Link>
            </li>
            {props.token && (
              <li className="list-none py-2 border-b border-blue-900 border-opacity-25 mr-4 md:text-white">
                <Link
                  to={`/user-profile/${userId}`}
                  className={`w-full flex text-base md:hover:text-blue-200 cursor-pointer
                ${
                  props.activePage === "my_profile" &&
                  "text-blue-700 md:text-blue-200"
                }`}
                onClick={() => props.setActivePage("my_profile")}
              >
                Profile
              </Link>
            </li>)}
            {!props.token ? (
              <li className="list-none py-2 mr-4 md:text-white">
                <Link
                  to="/login"
                  className={`w-full flex text-base md:hover:text-blue-200 cursor-pointer
                ${
                  props.activePage === "login" &&
                  "text-blue-700 md:text-blue-200"
                }`}
                  onClick={() => props.setActivePage("login")}
                >
                  Login
                </Link>
              </li>
            ) : (
              <li
                className="list-none py-2 mr-4 
                md:text-white w-full flex text-base md:hover:text-blue-200 cursor-pointer"
                onClick={handleSignout}
              >
                Sign out
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
