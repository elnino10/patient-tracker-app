import { KJUR } from "jsrsasign";

const MedicDashboard = ({ token }) => {
  // Decode JWT token
  let decodedToken;
  if (token) {
    decodedToken = KJUR.jws.JWS.parse(token);
  }
  //   console.log(token && token);
  return (
    <div className="h-screen">
      User Dashboard for a{" "}
      <span className="font-bold">'{decodedToken?.payloadObj.category}'</span>
    </div>
  );
};

export default MedicDashboard;
