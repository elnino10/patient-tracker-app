import React, { useState } from "react";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("m");
  const [bmiResult, setBMIResult] = useState(null);
  const [resetResult, setResetResult] = useState(false);
  const [inch, setInch] = useState("");

  const calculateBMI = (weight, height, w_unit, h_unit) => {
    let weightKg = 0;
    let heightMeters = 0;

    if (w_unit === "lbs") weightKg = +weight * 0.453592;
    else weightKg = weight;

    if (h_unit === "ft") {
      const totalInches = +height * 12 + inch;
      heightMeters = totalInches * 0.0254;
    } else heightMeters = height;

    const bmi = weightKg / heightMeters ** 2;
    return bmi;
  };

  const handleWeightChange = (e) => {
    if (e.target.value === "") setWeight("");
    else setWeight(parseFloat(e.target.value));
    setResetResult(true);
  };

  const handleHeightChange = (e) => {
    if (e.target.value === "") setHeight("");
    else setHeight(parseFloat(e.target.value));
    setResetResult(true);
  };

  const calculateBMIHandler = () => {
    const bmiRes = calculateBMI(weight, height, weightUnit, heightUnit);
    if (bmiRes) setBMIResult(bmiRes);
    setResetResult(false);
  };

  return (
    <div className="pt-1 flex flex-col items-center">
      <p className="font-bold xl:text-2xl">
        Input your weight and height in units of choice
      </p>
      <div className="pt-3 flex flex-col justify-center items-center mt-3">
        <div className="xl:text-2xl">
          <label>Weight:</label>
          <input
            type="number"
            value={weight}
            placeholder="0"
            onChange={handleWeightChange}
            className="border border-black rounded-md p-2 ml-2 w-28 md:w-48"
          />
          <select
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value)}
            className="border border-black rounded-md p-2 ml-2"
          >
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
        </div>
        <div>
          <div className="pt-6 xl:text-2xl">
            <label>Height:</label>
            <input
              type="number"
              value={height}
              placeholder="0"
              onChange={handleHeightChange}
              className="border border-black rounded-md p-2 ml-2 w-28 md:w-48"
            />
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
              className="border border-black rounded-md p-2 ml-2"
            >
              <option value="m">m</option>
              <option value="ft">ft</option>
            </select>
          </div>
          {heightUnit === "ft" && (
            <div className="pt-6">
              <label>Inches:</label>
              <input
                type="number"
                value={inch}
                placeholder="0"
                onChange={(e) => {
                  if (e.target.value === "") setInch("");
                  else setInch(parseFloat(e.target.value));
                }}
                className="border border-black rounded-md p-2 ml-2 w-12"
              />
            </div>
          )}
        </div>
      </div>
      <div className="pt-8 pl-4 flex justify-center">
        <button
          disabled={!weight || !height}
          onClick={calculateBMIHandler}
          className={`${
            !weight || !height ? "bg-blue-300" : "bg-blue-600"
          } ml-2  text-white py-2 px-4 rounded-md pt-2 hover:bg-blue-700 xl:text-2xl`}
        >
          Calculate BMI
        </button>
      </div>
      <div
        className={`${
          bmiResult && !resetResult ? "flex" : "invisible"
        } justify-center`}
      >
        {/* {bmiResult && ( */}
        <div className="mt-5 w-[90%] flex flex-col items-center justify-center text-center md:w-[70%] ">
          <h3 className="font-bold text-lg border border-slate-400 rounded-sm p-2 shadow-xl mb-5 ml-5">
            Your BMI is: {bmiResult?.toFixed(1)}
          </h3>
          {bmiResult < 18.5 && (
            <p>
              Your BMI suggests that you are underweight. It's important to
              maintain a healthy weight for your overall well-being. Consider
              consulting with a healthcare professional for personalized advice
              on gaining weight safely.
            </p>
          )}
          {bmiResult >= 18.5 && bmiResult <= 24.9 && (
            <p>
              Congratulations! Your BMI falls within the normal range. Keep up
              the good work with your healthy lifestyle habits to maintain your
              weight and overall well-being.
            </p>
          )}
          {bmiResult >= 25 && (
            <p>
              Your BMI indicates that you are overweight. It's important to take
              steps to manage your weight for your health. Consider making
              healthy lifestyle changes such as increasing physical activity and
              adopting a balanced diet. Consulting with a healthcare
              professional can provide personalized guidance.
            </p>
          )}
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default BMICalculator;
