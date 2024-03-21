import { Link } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import { MenuOpen } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";

const Header = (props) => {
  const toggleMenuHandler = (e) => {
    e.stopPropagation();
    props.setMenuVisible(!props.menuVisible);
  };

  return (
    <header className="bg-primary sticky top-0 z-20">
      <div className="max-w-7xl mx-auto items-center flex justify-between p-2.5">
        <div>
          <Link to="/">
            <span className="flex md:hidden text-slate-200">
              <HomeIcon />
            </span>
            <span className="hidden md:flex">Home</span>
          </Link>
        </div>
        <div onClick={toggleMenuHandler} className="md:hidden text-slate-200">
          {props.menuVisible ? <MenuOpen /> : <MenuIcon />}
        </div>
        <nav
          className={`${
            !props.menuVisible && "hidden"
          } absolute z-20 bg-slate-100 flex flex-col top-full right-0 p-2
          md:static md:w-auto md:bg-inherit md:p-0 md:flex`}
        >
          <ul nav-bar="nav" className="md:flex md:flex-row">
            <li className="list-none mr-7 text-white">
              <Link
                to="/our-doctors"
                className="w-full flex text-base hover:text-blue-200 cursor-pointer"
              >
                Our Doctors
              </Link>
            </li>
            <li className="list-none mr-7 text-white">
              <Link
                to="/about"
                className="w-full flex text-base hover:text-blue-200 cursor-pointer"
              >
                About
              </Link>
            </li>
            <li className="list-none mr-7 text-white">
              <Link
                to="/services"
                className="w-full flex text-base hover:text-blue-200 cursor-pointer"
              >
                Services
              </Link>
            </li>
            <li className="list-none mr-7 text-white">
              <Link
                to="/login"
                className="w-full flex text-base hover:text-blue-200 cursor-pointer"
              >
                Login
              </Link>
            </li>
            <li className="list-none text-white">
              <Link
                to="/createReport"
                className="w-full flex text-base hover:text-blue-200 cursor-pointer"
              >
                Create Report
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
