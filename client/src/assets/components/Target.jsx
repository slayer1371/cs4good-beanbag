import React, { useEffect, useState } from "react";

function Target(props){
  const rings = [4,3,2,1,0]

  const [highlightedRing, setHighlightedRing] = useState(-1);
  const handleClick = (ring) => {
    props.setSelectedRing(ring.id);
  };

  useEffect(()=>{
    setHighlightedRing(props.selectedRing)

  },[props.selectedRing]);

  return (
    <div className="target-container">
      <div className="target">
        {rings.map((item, index) => (
          <div
            key={item}
            id = {item}
            className={`ring ring-${item} ${highlightedRing == item ? "selected-ring" : ""}`}
            onClick={(event) => handleClick(event.target)}
          />
        ))}
      </div>
    </div>
  );
};

export default Target;
