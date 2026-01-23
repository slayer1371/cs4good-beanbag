import React, { useState, useEffect } from "react";

const TeamDropdown = (props) => {
  const [currentTeam, setCurrentTeam] = useState();

  const handleChange = (event) => {
    props.setSelectedTeam(event.target.value);
  };

  useEffect(() => {
    setCurrentTeam(props.selectedTeam);
  }, [props.selectedTeam]);

  // Determine if the selected team is green or blue 
  const teamName = (currentTeam || "").toLowerCase();
  const isGreen = teamName.includes("green");
  const isBlue = teamName.includes("blue");
  
  const dropdownClass = `team-dropdown ${
    isGreen ? "team-green" : isBlue ? "team-blue" : ""
  }`;

  return (
    <div className="team-dropdown-container">
      <select
        className={dropdownClass}
        onChange={handleChange}
        value={currentTeam || ""}
      >
        <option value="" disabled>Select a team...</option>
        {props.teamList.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeamDropdown;
