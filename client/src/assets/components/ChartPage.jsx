import React, { useState, useEffect} from "react";
import NavBar from "./NavBar";

function ChartPage(){
  const [data, setData] = useState({});

  useEffect(()=>{
    //fetch data using mongo here 

  },[])

  return(
    <div>
      <NavBar/>

    </div>
  
  );
}
export default ChartPage;