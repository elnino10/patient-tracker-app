import axios from "axios";
import { useState } from "react";

const DUMMY_DATA = {
    symptoms: "blahblah",
    potentialCauses: ["first cause", "second cause", "third cause"],
    followUpQuestions: ["question one", "question two", "question three"],
  }


const SymptomsChecker = () => {
  // const [userInput, setUserInput] = useState("")
  // const [responseData, setResponseData] = useState({})

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
    <div>
      <p>
        SymptomsChecker: <span onClick={symptomsCheckHandler}>click</span>
      </p>
      <div>
        <p>Potential Causes: {DUMMY_DATA["potentialCauses"]}</p>
      </div>
      ;
      <div>
        <p>Follow up questions: {DUMMY_DATA["followUpQuestions"]}</p>
      </div>
    </div>
  );
};

export default SymptomsChecker;
