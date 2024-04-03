import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
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

const CreateReportForm = () => {
  const { id } = useParams();
  const [submit, setSubmit] = useState(false);

  const apiURL = import.meta.env.VITE_API_BASE_URL;
  
  const reqURL = `${apiURL}/api/v1/patients/${id}/medical_record`;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmit(true);
    try {
      const data = new FormData(event.currentTarget);
      axios.post(reqURL, {
        allergies: data.get("allergies"),
        medication: data.get("medication"),
        diagnosis: data.get("diagnosis"),
        history: data.get("history"),
        medical_info: data.get("medical_info"),
        patient_id: id,
      }, {headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }});
      setSubmit(false);
      event.target.reset();
    } catch (error) {
      console.error("Error occured:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Enter Patients Record
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="allergies"
              label="Allergies"
              name="allergies"
            />
            <TextField
              margin="normal"
              fullWidth
              name="medication"
              label="Current medication"
              type="medication"
              id="medication"
            />
            <TextField
              margin="normal"
              fullWidth
              name="diagnosis"
              label="Diagnosis"
              type="diagnosis"
              id="diagnosis"
            />
            <TextField
              margin="normal"
              fullWidth
              name="history"
              label="Medical history"
              type="history"
              id="history"
            />
            <TextField
              margin="normal"
              fullWidth
              name="medical_info"
              label="Other medical info"
              type="medical_info"
              id="medical_info"
            />
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              {submit ? "Please wait..." : "Submit"}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default CreateReportForm;
