import React, { useState, useEffect } from "react";
import Target from "./Target";
function ScoringPage(){
  const [teamList, setTeamList] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [score, setScore] = useState(0);

  useEffect(()=>{

  },[]);

  return(
    <div>
      <Target/>
    </div>

  );

}
export default ScoringPage;