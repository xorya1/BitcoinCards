import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
const Install = ({ ownerCards }) => {
  const navigate = useNavigate();

  /******************************************************************************************************/
  useEffect(() => {
    if (ownerCards) {
      navigate("/Account");
    }
  }, [ownerCards]);

  /******************************************************************************************************/
  return (
    <div className="install">
      <h3>Follow the link to install 👇🏼</h3>
      <a href="https://metamask.io/download.html">Meta Mask</a>
    </div>
  );
};

export default Install;
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
