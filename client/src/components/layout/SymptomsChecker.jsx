import axios from "axios";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";


// const responseData = {
//     symptoms: "blahblah",
//     potentialCauses: ["first cause", "second cause", "third cause"],
//     followUpQuestions: ["question one", "question two", "question three"],
//   }


const SymptomsChecker = () => {
  const [userInput, setUserInput] = useState("")
  const [responseData, setResponseData] = useState({})

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  }
  
  const options = {
    method: "POST",
    url: import.meta.env.VITE_SYMPTOMS_CHECKER_URL,
    params: {
      symptoms: "symptoms",
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": import.meta.env.VITE_SYMPTOMS_API_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_SYMPTOMS_API_HOST,
    },
    data: {
      symptoms:
        userInput,
    },
  };
  const symptomsCheckHandler = async () => {
    try {
      if (!options.data) {
        alert("You have to type something first");
        return;
      }
        const response = await axios.request(options);
        setResponseData(response.data);
        setUserInput("");
        // console.log(response.data);
    } catch (error) {
      setUserInput("");
      console.error(error);
    }
    

  };

  return (
    <div className="flex flex-col items-start w-full md:w-[80%]">
      <p className="text-center font-bold text-slate-900 pb-1 xl:text-2xl xl:pb-3">
        Describe how you feel
      </p>
      <TextField
        style={{ width: "100%" }}
        variant="outlined"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Type your symptoms"
        InputProps={{
          endAdornment: (
            <SendIcon
              fontSize="small"
              color="primary"
              cursor="pointer"
              onClick={symptomsCheckHandler}
            />
          ),
        }}
      />
      <div className="p-2 mt-4 border w-full min-h-40 rounded-md shadow-xl">
        <div className="pt-3">
          <p
            className={`${
              responseData.potentialCauses ? "flex" : "hidden"
            } font-bold text-slate-800 xl:text-2xl`}
          >
            Potential Causes:
          </p>
          <ul>
            {responseData.potentialCauses &&
              responseData.potentialCauses.map((data, index) => (
                <li key={index} className="pl-6">
                  {data}
                </li>
              ))}
          </ul>
        </div>

        <div className="pt-3">
          <p
            className={`${
              responseData.followupQuestions ? "flex" : "hidden"
            } font-bold text-slate-800 xl:text-2xl`}
          >
            Follow up questions:
          </p>
          <ul>
            {responseData.followupQuestions &&
              responseData.followupQuestions.map((data, index) => (
                <li key={index} className="pl-6">
                  {data}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SymptomsChecker;
