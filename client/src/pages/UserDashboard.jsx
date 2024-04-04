import { KJUR } from "jsrsasign";
import { Link } from "react-router-dom";

function UserDashboard({ token }) {
  let decodedToken;
  let user_id;
  if (token) {
    decodedToken = KJUR.jws.JWS.parse(token);
    user_id = decodedToken?.payloadObj.sub;
  }
  return (
    <div className="h-full">
      <h1>UserDashboard for '{decodedToken?.payloadObj.category}'</h1>
      <div>
        <Link to={`/user-profile/${user_id}`}>Edit profile</Link>
      </div>
    </div>
  );
}

export default UserDashboard;
