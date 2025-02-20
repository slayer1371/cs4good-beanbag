import React, {useState, useEffect} from "react";

const TeamDropdown = (props) => {

  const [currentTeam , setCurrentTeam] = useState();

  const handleChange = (event)=>{
    props.setSelectedTeam(event.value);
  }

  useEffect(()=>{
    setCurrentTeam(props.selectedTeam);
  },[props.selectedTeam])

 

  return (
    <div className="team-dropdown-container">
      <select 
      className="team-dropdown" 
      onChange={(event) =>handleChange(event.target)}
      value={currentTeam} 
      >
        <option value="invalid">Choose A Team</option>
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
