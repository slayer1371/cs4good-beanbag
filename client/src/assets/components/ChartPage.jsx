import React, { useState, useEffect} from "react";
import NavBar from "./NavBar";

function ChartPage(){
  const [data, setData] = useState({});
  useEffect(() => {
    // Example: Fetch teams from backend
    //fetchTeams();
    // Example: Fetch current scores from backend
    //fetchScores();
  }, []);

  return(
    <div>
      <NavBar/>

    </div>
  
  );
}
export default ChartPage;