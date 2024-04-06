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
      bmi = weight / (height * height);

    }
    if (bmi < 18.5) {
      console.log("You are underweight. You need to feed more");
    }
    setBMIResult(bmi);
  };

  return (
    <div className="pt-2">
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
      </div>

      <div className="pt-8 pl-4 justify-end">
        <button
          onClick={calculateBMI}
          className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-md pt-2 hover:bg-blue-700"
        >
          Calculate BMI
        </button>
      </div>
      <div>
        {bmiResult && (
          <div className="pt-8">
            <h3>Your BMI is: {Math.round(bmiResult)}</h3>
            {bmiResult < 18.5 && (
              <p>
                Your BMI suggests that you are underweight. It's important to
                maintain a healthy weight for your overall well-being. Consider
                consulting with a healthcare professional for personalized
                advice on gaining weight safely.
              </p>
            )}
            {bmiResult >= 18.5 && bmiResult <= 24.9 && (
              <p>
                Congratulations! Your BMI falls within the normal range. Keep up
                the good work with your healthy lifestyle habits to maintain
                your weight and overall well-being.
              </p>
            )}
            {bmiResult >= 25 && (
              <p>
                Your BMI indicates that you are overweight. It's important to
                take steps to manage your weight for your health. Consider
                making healthy lifestyle changes such as increasing physical
                activity and adopting a balanced diet. Consulting with a
                healthcare professional can provide personalized guidance.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;