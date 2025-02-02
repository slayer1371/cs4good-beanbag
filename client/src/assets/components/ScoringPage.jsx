import React, { useState, useEffect } from "react";
import Target from "./Target";
function ScoringPage(){
  const [teamList, setTeamList] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedRing, setSelectedRing] = useState(-1);
  const [score, setScore] = useState(0);

  useEffect(()=>{
    //fetch data with mongo here
  },[]);

  const handleRingClick = (ringId)=>{
    setSelectedRing(ringId);
  }

  return(
    <div>
      <Target selectedRing = {selectedRing} setSelectedRing = {setSelectedRing}/>
    </div>

  );

}
export default ScoringPage;