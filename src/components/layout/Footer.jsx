import * as React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="#c4c4c4" align="center" {...props}>
      {"Copyright © "}
      <Link color="white" to="/">
        PatientTrackerApp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Footer = () => {
  return (
    <div className="w-full h-14 sticky bottom-0 bg-slate-800 flex items-center justify-center">
      <span className="">
        <Copyright />
      </span>
    </div>
  );
};

export default Footer;
