import React, { useState, useEffect } from "react";
import Target from "./Target";
import NavBar from "./NavBar";
import TeamDropdown from "./TeamDropdown";
import ScoreButtons from "./ScoreButtons";
import axios from "axios";

function ScoringPage(){
  const [teamList, setTeamList] = useState(["Team 1", "Team 2"]);
  const [selectedTeam, setSelectedTeam] = useState("invalid");
  const [selectedRing, setSelectedRing] = useState(-1);
  const [score, setScore] = useState(0);

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

  const submitScore = async ()=>{
    if(selectedTeam != "invalid"){
      if(selectedRing != -1){
        const data = {
          name: selectedTeam,
          score: selectedRing
        };
        axios.post(
          "http://localhost:8080/submit_score",
          data
        );
        console.log("Submit");
        setSelectedRing(-1);
      } 
    }
  }

  return(
    <div>
      <NavBar/>
      <TeamDropdown teamList = {teamList} selectedTeam = {selectedTeam} setSelectedTeam = {setSelectedTeam}/>
      <Target selectedRing = {selectedRing} setSelectedRing = {setSelectedRing}/>
      <ScoreButtons selectedRing = {selectedRing} setSelectedRing = {setSelectedRing} submitScore = {submitScore}/>
      
      
      
    </div>

  );

}
export default ScoringPage;