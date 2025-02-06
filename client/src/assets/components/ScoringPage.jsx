import React, { useState, useEffect } from "react";
import Target from "./Target";
import NavBar from "./NavBar";
import TeamDropdown from "./TeamDropdown";
import ScoreButtons from "./ScoreButtons";

function ScoringPage(){
  const [teamList, setTeamList] = useState(["Team 1", "Team 2"]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedRing, setSelectedRing] = useState(-1);
  const [score, setScore] = useState(0);

  useEffect(()=>{
    //fetch data with mongo here
  },[]);

  const submitScore = ()=>{
    //push score to mongo based on team name and selecting ring
    // setScore((prevValue)=>{prevValue+selectedRing});
    console.log("Submit");
    setSelectedRing(-1);
    
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