import React from "react";

function Target(){
  const handleClick = (ring) => {
    alert(`You clicked on ring ${ring}`);
  };

  return (
    <div className="target-container">
      <div className="target">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`ring ring-${index + 1}`}
            onClick={() => handleClick(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Target;
