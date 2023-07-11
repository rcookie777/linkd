// import SignInBox from "../../components/ChatBox";
import React, { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../App";
import ProfileCard from "../components/GitHubCard";
import { useNavigate } from "react-router-dom";


const Main = () => {

  const [data, setData] = useState();


  const navigate = useNavigate();

  return (
    <>
      <div className="mx-auto max-w-270">
        <ProfileCard />
      </div>
    </>
  );
};

export default Main;
