import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "../styles/index.css";

function TeamPage() {
  const [teamName, setTeamName] = useState("");
  const [message, setMessage] = useState(""); // Feedback message
  const [teamList, setTeamList] = useState([]); // List of registered teams

  // Fetch existing teams on load
  useEffect(() => {
    fetch("http://localhost:3000/get_teams")
      .then((response) => response.json())
      .then((data) => setTeamList(data))
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  const handleRegisterTeam = () => {
    if (!teamName.trim()) {
      setMessage("Team name cannot be empty.");
      return;
    }

    fetch("http://localhost:3000/register_team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: teamName }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage(`${data.error}`);
        } else {
          setMessage(`${data.message}`);
          setTeamList([...teamList, teamName]); // Update team list
        }
      })
      .catch((error) => {
        console.error("Error registering team:", error);
        setMessage("Failed to register team.");
      });

    setTeamName(""); // Clear input
  };

  return (
    <div className="container">
      <NavBar />
      <div className="registerContainer">
        <h1>Register a Team</h1>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter team name"
        />
        <button onClick={handleRegisterTeam}>Register</button>
        <p className="message">{message}</p>
      </div>

      <div className="teamList">
        <h2>Registered Teams</h2>
        <ul>
          {teamList.map((team, index) => (
            <li key={index}>{team}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeamPage;
