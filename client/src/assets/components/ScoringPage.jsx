import React, { useState, useEffect } from "react";
import Target from "./Target";
import NavBar from "./NavBar";
import TeamDropdown from "./TeamDropdown";
import ScoreButtons from "./ScoreButtons";
import axios from "axios";

function ScoringPage() {
  const [submitting, setSubmitting] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("invalid");
  const [selectedRing, setSelectedRing] = useState(-1);

  useEffect(() => {
    // Fetch teams from the backend
    const getTeams = async () => {
      try {
        const response = await axios.get("https://cs4good-beanbag-codt.onrender.com/get_teams");
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
    if (selectedTeam != "invalid") {
      if (selectedRing != -1) {
        setSubmitting(true);
        try{
          const data = {
            name: selectedTeam,
            score: selectedRing,
          };
          axios.post("https://cs4good-beanbag-codt.onrender.com/submit_score", data);
          console.log("Submit");
        }finally{
          setSelectedRing(-1);
          setSubmitting(false);
        }
      }
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
        submitting = {submitting}
      />
    </div>
  );
}
export default ScoringPage;
