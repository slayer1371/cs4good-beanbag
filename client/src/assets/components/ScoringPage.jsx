import React, { useState, useEffect } from "react";
import axios from "axios";
import Target from "./Target";
import NavBar from "./NavBar";
import TeamDropdown from "./TeamDropdown";
import ScoreButtons from "./ScoreButtons";

function ScoringPage() {
  const [teamList, setTeamList] = useState(["Team 1", "Team 2"]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedRing, setSelectedRing] = useState(-1);
  const [teamScore, setTeamScore] = useState(null);

  useEffect(() => {
    // Fetch teams from the backend
    const getTeams = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get_teams");
        if (Array.isArray(response.data)) {
          setTeamList(response.data);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    getTeams();
  }, []);

  const submitScore = async () => {
    if (selectedRing === -1 || !selectedTeam) {
      console.error("Invalid score or team name");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/submit_score", {
        name: selectedTeam,
        score: selectedRing,
      });
      setSelectedRing(-1);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  const getScore = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get_scores", {
        params: { name: selectedTeam },  // Pass the selected team name as a query parameter
      });
  
      // Ensure that the response contains the correct structure
      if (response.data && response.data.scores) {
        setTeamScore(response.data);  // Store the team data in state
      } else {
        setTeamScore(null);  // Handle if no scores are returned
        console.log("No scores available for this team.");
      }
    } catch (error) {
      console.error("Error fetching score:", error);
    }
  };
  

  return (
    <div>
      <NavBar />
      <TeamDropdown
        teamList={teamList}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />
      <Target selectedRing={selectedRing} setSelectedRing={setSelectedRing} />
      <ScoreButtons
        selectedRing={selectedRing}
        setSelectedRing={setSelectedRing}
        submitScore={submitScore}
      />
      <button onClick={getScore}>Show Score</button>
      {/*Score Testing */}
      {teamScore && (
        <div>
          <h3>Scores for {selectedTeam}:</h3>
          <ul>
            {teamScore.scores && teamScore.scores.length > 0 ? (
              teamScore.scores.map((score, index) => (
                <li key={index}>Score: {score}</li>
              ))
            ) : (
              <li>No scores available for this team.</li> // Corrected the rendering
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ScoringPage;
