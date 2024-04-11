import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        PatientTrackerApp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
const defaultTheme = createTheme();

const Login = ({ setToken, setActivePage }) => {
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const apiURL = import.meta.env.VITE_API_BASE_URL;

  const loginURL = `${apiURL}/auth/v1/signin`;
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);
    try {
      const data = new FormData(event.currentTarget);

      const response = await axios.post(loginURL, {
        email: data.get("email"),
        password: data.get("password"),
      });

      const { access_token } = response.data;
      localStorage.setItem("access_token", JSON.stringify(access_token));
      setToken(access_token);
      setSubmit(false);
      
      // redirect to user dashboard
      access_token && navigate("/user-dashboard");
      setActivePage("dashboard");
      event.target.reset();
    } catch (error) {
      console.error("Error logging in: ", error.response);
      setError(true);
      setErrorMessage(error.response.data.message);
      setSubmit(false);
      event.target.reset();
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" className="h-screen">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div
            className={`text-center justify-center ${
              error ? "flex" : "invisible"
            }`}
          >
            <p className="text-red-500 text-sm py-0">{errorMessage}</p>
          </div>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setError(false);
                setErrorMessage("");
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setError(false)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {submit && !error ? "Please wait..." : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/recoverPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register-patient" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
