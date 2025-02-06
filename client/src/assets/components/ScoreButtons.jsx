import React, { useState, useEffect } from "react";

function ScoreButtons(props){

  const [curButton, setCurButton] = useState(-1);

  const Buttons = [0,1,2,3,4]

  useEffect(()=>{
    setCurButton(props.selectedRing)
  },[props.selectedRing])

  const handleClick = (event)=>{
    props.setSelectedRing(event.value);
  }

  return(
    <div className="score-buttons-container">
      <div className="button-header-container">
        <h1>Center</h1>
        <h1>{`--------------------------->`}</h1>
        <h1>Outer Ring</h1>
      </div>
      <div className="button-container">
        {Buttons.map((_,index)=>{
          return(
            <button 
            key = {index}
            value={index}
            className={`score-button ${curButton == index ? "selected-button" : ""}`}
            onClick={(event)=>{handleClick(event.target)}}
            >
              {index}
            </button>
          )
        })}
      </div>
      <button 
      className="submit-button"
      onClick={props.submitScore}
      >Submit</button>

    </div>
  )
}

export default ScoreButtons;