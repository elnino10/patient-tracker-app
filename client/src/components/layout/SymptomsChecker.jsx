import axios from "axios";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";


const DUMMY_DATA = {
    symptoms: "blahblah",
    potentialCauses: ["first cause", "second cause", "third cause"],
    followUpQuestions: ["question one", "question two", "question three"],
  }


const SymptomsChecker = () => {
  // const [userInput, setUserInput] = useState("")
  // const [responseData, setResponseData] = useState({})

  const handleInputChange = (e) => {
    console.log(e.target.value);
  }
  // const options = {
  //   method: "POST",
  //   url: import.meta.env.VITE_SYMPTOMS_CHECKER_URL,
  //   params: {
  //     symptoms: "symptoms",
  //   },
  //   headers: {
  //     "content-type": "application/json",
  //     "X-RapidAPI-Key": import.meta.env.VITE_SYMPTOMS_API_KEY,
  //     "X-RapidAPI-Host": import.meta.env.VITE_SYMPTOMS_API_HOST,
  //   },
  //   data: {
  //     symptoms:
  //       userInput,
  //   },
  // };
  const symptomsCheckHandler = async () => {
    try {
      if (!options.data) {
        console.error("No input data found!");
        return;
      }
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pt-1 flex flex-col flex-center">
      <p className="text-center font-bold text-black pb-1">Input your symptom</p>
      <div className="w-full">
        <TextField
          fullWidth
          variant="outlined"
          // value={inputText}
          onChange={handleInputChange}
          placeholder="Type your symptoms"
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={symptomsCheckHandler}
                onMouseEnter={symptomsCheckHandler}
              >
                <SendIcon fontSize="small" color="primary" />
              </IconButton>
            ),
          }}
        />
      </div>
      <div className="pt-3">
        <p className="font-bold text-black">Potential Causes:</p>
        <ul>
          {DUMMY_DATA.potentialCauses.map((data, index) => (
            <li key={index} className="pl-6">
              {data}
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-3">
        <p className="font-bold text-black">Follow up questions:</p>
        <ul>
          {DUMMY_DATA.followUpQuestions.map((data, index) => (
            <li key={index} className=" pl-6">
              {data}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SymptomsChecker;
