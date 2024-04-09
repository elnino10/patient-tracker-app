import axios from "axios";

const SymptomsChecker = () => {
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
          "I have a red rash on my forearm that appeared suddenly last night. It does not itch or hurt.",
      },
    };
  const symptomsCheckHandler = async () => {
    try {
      if (!options.params) {
        console.error("Params object is undefined");
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
      SymptomsChecker: <span onClick={symptomsCheckHandler}>click</span>
    </div>
  );
};

export default SymptomsChecker;
