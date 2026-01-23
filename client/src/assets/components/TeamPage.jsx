import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "../styles/index.css";
import axios from "axios";

function TeamPage() {
  const [teamName, setTeamName] = useState("");
  const [message, setMessage] = useState(""); // Feedback message
  const [teamList, setTeamList] = useState([]); // List of registered teams

  // Fetch existing teams on load
  useEffect(() => {
    const fetchTeamNames = async () => {
      const response = await axios.get("https://cs4good-beanbag-codt.onrender.com/get_teams");
      setTeamList(response.data);
    };
    fetchTeamNames();
  }, []);

  const handleRegisterTeam = async () => {
    if (!teamName.trim()) {
      setMessage("Team name cannot be empty.");
      return;
    }
    if (teamList.includes(teamName)) {
      setMessage("Team name already registered.");
      return;
    }
    const data = {
      name: teamName,
    };
    const response = await axios.post(
      "https://cs4good-beanbag-codt.onrender.com/register_team",
      data
    );
    setTeamList((prevValue) => {
      return [...prevValue, teamName];
    });
    setTeamName(""); // Clear input
  };

  return (
    <div>
      <NavBar />
      <div className="registerContainer">
        <h1>Register a Team</h1>
        <div>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
          />
          <button onClick={handleRegisterTeam}>Register</button>
        </div>

        <p className="message">{message}</p>

        <div className="teamList">
          <h2>Registered Teams</h2>
          <ul>
            {teamList.map((team, index) => (
              <li key={index}>{team}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
