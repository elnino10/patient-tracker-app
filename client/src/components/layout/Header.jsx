import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuOpen } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";

const Header = (props) => {
  const [activePage, setActivePage] = useState("home");

  const apiURL = import.meta.env.VITE_API_BASE_URL;

  const reqURL = `${apiURL}/auth/v1/signout`;

  const toggleMenuHandler = (e) => {
    e.stopPropagation();
    props.setMenuVisible(!props.menuVisible);
  };

  const handleSignout = () => {
    localStorage.removeItem("access_token");
    props.setToken(null);
    axios.post(reqURL);
  };

  return (
    <header className="bg-blue-700 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto items-center flex justify-between p-2.5">
        <div onClick={() => setActivePage("home")}>
          <Link to="/">
            <span className="flex md:hidden text-slate-200">
              <HomeIcon />
            </span>
            <span className="hidden text-white md:flex">Home</span>
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
                  activePage === "our-doctors" &&
                  "text-blue-700 md:text-blue-200"
                }`}
                onClick={() => setActivePage("our-doctors")}
              >
                Our Doctor
              </Link>
            </li>
            <li className="list-none py-2 border-b border-blue-900 border-opacity-25 mr-4 md:text-white">
              <Link
                to="/about"
                className={`w-full flex text-base md:hover:text-blue-200 cursor-pointer
                ${activePage === "about" && "text-blue-700 md:text-blue-200"}`}
                onClick={() => setActivePage("about")}
              >
                About
              </Link>
            </li>
            <li className="list-none py-2 border-b border-blue-900 border-opacity-25 mr-4 md:text-white">
              <Link
                to="/services"
                className={`w-full flex text-base md:hover:text-blue-200 cursor-pointer
                ${
                  activePage === "services" && "text-blue-700 md:text-blue-200"
                }`}
                onClick={() => setActivePage("services")}
              >
                Services
              </Link>
            </li>
            {!props.token ? (
              <li className="list-none py-2 mr-4 md:text-white">
                <Link
                  to="/login"
                  className={`w-full flex text-base md:hover:text-blue-200 cursor-pointer
                ${activePage === "login" && "text-blue-700 md:text-blue-200"}`}
                  onClick={() => setActivePage("login")}
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
