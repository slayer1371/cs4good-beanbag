import React, { useState, useEffect} from "react";
import NavBar from "./NavBar";
import Target from "./Target";
import '../styles/index.css'

function TeamPage() {
  // State for the team name and its editing mode
  const [teamName, setTeamName] = useState("Team A");
  const [isEditing, setIsEditing] = useState(false);

  // State for the score counts for each option (0-5)
  const [scoreCounts, setScoreCounts] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });


  // State for tracking the currently selected ring (for Target component)
  const [selectedRing, setSelectedRing] = useState(-1);

  // Increments the count for a specific score, could add post to mongo
  const handleScoreIncrement = (num) => {
    setScoreCounts((prev) => ({
      ...prev,
      [num]: prev[num] + 1,
    }));
  };

  // Updates the selected ring
  const handleRingClick = (ringId) => {
    setSelectedRing(ringId);
  };

  // Toggle editing mode when the edit option is clicked
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Update the team name while editing
  const handleNameChange = (e) => {
    setTeamName(e.target.value);
  };

  // End editing when the input stops
  const handleNameBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="container">
      <NavBar />

      <div className="header">
        <h1 className="teamName">
          {teamName}
          <span className="editContainer" onClick={handleEditClick}>
            <span className="pencilIcon">✏️</span>
            <span className="editText"> edit name</span>
          </span>
        </h1>
        {isEditing && (
          <input
            type="text"
            value={teamName}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            autoFocus
            className="editInput"
          />
        )}
      </div>

      <div className="targetContainer">
        <Target
          selectedRing={selectedRing}
          setSelectedRing={setSelectedRing}
          onRingClick={handleRingClick}
        />
      </div>

      {/* Grid of Score Options */}
      <div className="gridContainer">
        {[0, 1, 2, 3, 4].map((num) => (
          <div key={num} className="scoreItem">
            <div className="number">{num}</div>
            <div className="countText">{scoreCounts[num]}</div>
            <button className="plusButton" onClick={() => handleScoreIncrement(num)}>
              <span className="plusSign">+</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamPage;