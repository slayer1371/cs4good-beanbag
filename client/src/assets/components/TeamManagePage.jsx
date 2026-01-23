import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import DeleteOverlay from "./DeleteOverlay";
import "../styles/index.css";
import axios from "axios";

function TeamManagePage() {
  const [isConfirming, setIsConfirming] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [message, setMessage] = useState(""); // Feedback message
  const [teamList, setTeamList] = useState([]); // List of registered teams

  useEffect(() => {
    
    const fetchTeamNames = async () => {
      const response = await axios.get("https://cs4good-beanbag-codt.onrender.com/get_teams");
      setTeamList(response.data);
    };
    fetchTeamNames();
  }, []);

  const handleDelete = (target) => {
    setTeamName(target.name);
    setIsConfirming(true);
  };

  const handlePopExit = () => {
    setIsConfirming(false);
  };

  const handleConfirm = async (name) => {
    let newTeamList = [];
    const data = {
      name: name,
    };
    const response = await axios.post(
      "https://cs4good-beanbag-codt.onrender.com/delete_team",
      data
    );
    setTeamList((prevValue) => prevValue.filter((team) => team !== name));
    handlePopExit();
  };

  return (
    <div>
      <NavBar />
      <div className="registerContainer">
        <h1>Delete Teams: Will ask for confirmation</h1>

        <p className="message">{message}</p>

        <div className="teamList">
          <h2>Registered Teams</h2>

          {teamList.map((team, index) => (
            <div key={index} className="delete-element">
              <button
                onClick={(event) => {
                  handleDelete(event.target);
                }}
                name={team}
                value={team}
              >
                Delete
              </button>
              <h2>{team}</h2>
            </div>
          ))}
        </div>
      </div>
      {isConfirming && (
        <DeleteOverlay
          teamName={teamName}
          handlePopExit={handlePopExit}
          handleConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

export default TeamManagePage;
