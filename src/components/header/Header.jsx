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
    <header className="bg-blue-700 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto items-center flex justify-between p-2.5">
        <div>
          <Link to="/">
            <span className="flex md:hidden">
              <HomeIcon />
            </span>
            <span className="hidden md:flex">Home</span>
          </Link>
        </div>
        <div onClick={toggleMenuHandler} className="md:hidden">
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
                to="/about"
                className="w-full flex text-base md:hover:text-blue-200 cursor-pointer"
              >
                About
              </Link>
            </li>
            <li className="list-none py-2 border-b border-blue-900 border-opacity-25 mr-4 md:text-white">
              <Link
                to="/services"
                className="w-full flex text-base md:hover:text-blue-200 cursor-pointer"
              >
                Services
              </Link>
            </li>
            <li className="list-none py-2 border-b border-blue-900 border-opacity-25 mr-4 md:text-white">
              <Link
                to="/login"
                className="w-full flex text-base md:hover:text-blue-200 cursor-pointer"
              >
                Login
              </Link>
            </li>
            <li className="list-none py-2 mr-4 md:text-white">
              <Link
                to="/createReport"
                className="w-full flex text-base md:hover:text-blue-200 cursor-pointer"
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
