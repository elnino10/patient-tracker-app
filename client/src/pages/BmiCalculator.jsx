import React, { useState } from "react";

const BMICalculator = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("m");
  const [bmiResult, setBMIResult] = useState(null);

  const calculateBMI = () => {
    let bmi;

    if (weightUnit === "lbs" && heightUnit === "in") {
      bmi = 703 * (weight / (height * height));
    }

    if (weightUnit === "kg" && heightUnit === "m") {
      bmi = (weight / (height * height));

    }
    setBMIResult(bmi);
  };

  return (
    <div>
      <div>
        <label>Weight:</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value))}
          className="border border-black rounded-md p-2 ml-2"
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
      <div className="pt-6">
        <label>Height:</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(parseFloat(e.target.value))}
          className="border border-black rounded-md p-2 ml-2"
        />
        <select
          value={heightUnit}
          onChange={(e) => setHeightUnit(e.target.value)}
          className="border border-black rounded-md p-2 ml-2"
        >
          <option value="m">m</option>
          <option value="in">in</option>
        </select>
      </div>

      <div className="pt-8 pl-20">
        <button
          onClick={calculateBMI}
          className="ml-2  bg-blue-600 text-white py-2 px-4 rounded-md pt-2 hover:bg-blue-700"
        >
          Calculate BMI
        </button>
      </div>
      <div>
        {bmiResult && (
          <div className="pt-8">
            <h3>Your BMI is: {Math.round(bmiResult)}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;