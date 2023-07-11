import React, { useContext, useEffect } from "react";
import { AuthContext } from "../App";
import ProfileCard from "../components/GitHubCard";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
  const { user_data } = useContext(AuthContext);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the user's own profile if the userId is not provided or empty
    if (!userId) {
      navigate("/" + user_data?.login);
    }
  }, [navigate, user_data, userId]);

  return (
    <>
      <div className="mx-auto max-w-270">
        <h1>{user_data?.login}</h1>
        <ProfileCard/>
      </div>
    </>
  );
};

export default UserProfile;
